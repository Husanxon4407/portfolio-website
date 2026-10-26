import { useCallback, useEffect, useRef, useState } from 'react'
import { publicImageUrl } from '../lib/supabaseConfig.js'
import { prepareImage, imageFromClipboard } from './imageTools.js'
import { listItems, uploadImage, createItem, deleteItem, swapOrder, updateItem, updateMany } from './api.js'
import { inputClass } from './styles.js'
import ItemEditor from './ItemEditor.jsx'
import { Button, Panel, Notice } from './ui.jsx'

const UNSORTED = '__unsorted'

function CollectionManager({ collection, darkMode }) {
    const groups = collection.groups
    const [items, setItems] = useState([])
    const [status, setStatus] = useState('loading')
    const [error, setError] = useState(null)
    const [notice, setNotice] = useState(null)
    const [editor, setEditor] = useState(null)
    const [progress, setProgress] = useState(null)
    const [dragging, setDragging] = useState(false)
    const [chosenGroup, setActiveGroup] = useState(groups?.options[0].value ?? null)
    const [selected, setSelected] = useState([])
    const fileRef = useRef(null)

    const busy = progress !== null

    const groupOf = (item) => (groups ? item[groups.field] ?? UNSORTED : null)
    const unsortedCount = groups ? items.filter((item) => groupOf(item) === UNSORTED).length : 0

    // Once every photo is sorted, "Unsorted" disappears and the first section opens
    const activeGroup = chosenGroup === UNSORTED && unsortedCount === 0
        ? groups.options[0].value
        : chosenGroup
    const visibleItems = groups ? items.filter((item) => groupOf(item) === activeGroup) : items

    // New uploads go into the section that is currently open
    const groupDefaults = groups && activeGroup !== UNSORTED ? { [groups.field]: activeGroup } : {}
    const canAdd = !groups || activeGroup !== UNSORTED

    const switchGroup = (value) => {
        setActiveGroup(value)
        setSelected([])
    }

    const reload = useCallback(async () => {
        try {
            setItems(await listItems(collection.table))
            setStatus('ready')
        } catch (loadError) {
            setError(loadError.message)
            setStatus('error')
        }
    }, [collection.table])

    useEffect(() => {
        let ignore = false

        listItems(collection.table)
            .then((rows) => {
                if (ignore) return
                setItems(rows)
                setStatus('ready')

                // Start on "Unsorted" so photos without a section get noticed
                if (groups && rows.some((row) => !row[groups.field])) setActiveGroup(UNSORTED)
            })
            .catch((loadError) => {
                if (ignore) return
                setError(loadError.message)
                setStatus('error')
            })

        return () => {
            ignore = true
        }
    }, [collection.table, groups])

    // New items go to the top of the list
    const topSortOrder = (count = 1) =>
        (items.length ? Math.min(...items.map((item) => item.sort_order)) : 0) - count

    const handleFiles = async (fileList) => {
        const files = [...fileList].filter((file) => file.type.startsWith('image/'))
        if (files.length === 0 || busy || !canAdd) return

        setError(null)
        setNotice(null)

        // Single image (or a collection that needs details): open the form
        if (files.length === 1 || !collection.multiple) {
            try {
                setProgress({ done: 0, total: 1 })
                const prepared = await prepareImage(files[0])
                setEditor({ item: null, image: prepared })
            } catch (prepareError) {
                setError(prepareError.message)
            } finally {
                setProgress(null)
            }
            return
        }

        // Several photos: upload them all right away, captions can be added later
        const base = topSortOrder(files.length)
        const failed = []

        for (const [index, file] of files.entries()) {
            setProgress({ done: index, total: files.length })

            try {
                const prepared = await prepareImage(file)
                const paths = await uploadImage(collection.table, prepared)
                URL.revokeObjectURL(prepared.previewUrl)
                await createItem(collection.table, { ...paths, ...groupDefaults }, base + index)
            } catch (uploadError) {
                failed.push(`${file.name}: ${uploadError.message}`)
            }
        }

        setProgress(null)
        await reload()

        const uploadedCount = files.length - failed.length
        if (uploadedCount > 0) setNotice(`Uploaded ${uploadedCount} photo${uploadedCount === 1 ? '' : 's'}.`)
        if (failed.length > 0) setError(failed.join('\n'))
    }

    // Paste an image from the clipboard (Ctrl+V), like in a chat app
    useEffect(() => {
        if (editor || !collection.image) return

        const handlePaste = (event) => {
            const file = imageFromClipboard(event)
            if (file) handleFiles([file])
        }

        window.addEventListener('paste', handlePaste)
        return () => window.removeEventListener('paste', handlePaste)
    })

    const handleAdd = () => {
        if (collection.image === 'required') {
            fileRef.current?.click()
        } else {
            setEditor({ item: null, image: null })
        }
    }

    const handleDelete = async (item) => {
        const name = item[collection.titleField] || `this ${collection.singular}`
        if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return

        try {
            await deleteItem(collection.table, item)
            setItems((previous) => previous.filter((row) => row.id !== item.id))
        } catch (deleteError) {
            setError(deleteError.message)
        }
    }

    const handleMove = async (index, direction) => {
        const other = index + direction
        if (other < 0 || other >= visibleItems.length) return

        try {
            await swapOrder(collection.table, visibleItems[index], visibleItems[other])
            await reload()
        } catch (moveError) {
            setError(moveError.message)
        }
    }

    const moveToGroup = async (ids, value) => {
        if (ids.length === 0) return
        setError(null)

        try {
            if (ids.length === 1) {
                await updateItem(collection.table, ids[0], { [groups.field]: value })
            } else {
                await updateMany(collection.table, ids, { [groups.field]: value })
            }

            const label = groups.options.find((option) => option.value === value)?.label
            setNotice(`Moved ${ids.length} photo${ids.length === 1 ? '' : 's'} to "${label}".`)
            setSelected((previous) => previous.filter((id) => !ids.includes(id)))
            await reload()
        } catch (moveError) {
            setError(moveError.message)
        }
    }

    const toggleSelected = (id) =>
        setSelected((previous) =>
            previous.includes(id) ? previous.filter((value) => value !== id) : [...previous, id],
        )

    const handleSaved = async () => {
        setEditor(null)
        setNotice('Saved.')
        await reload()
    }

    const subtitleOf = (item) =>
        collection.subtitleFields
            .map((field) => (Array.isArray(item[field]) ? item[field].join(', ') : item[field]))
            .filter(Boolean)
            .join(' · ')

    const mutedText = darkMode ? 'text-slate-400' : 'text-slate-500'

    return (
        <div
            onDragOver={(event) => {
                if (!collection.image) return
                event.preventDefault()
                setDragging(true)
            }}
            onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false)
            }}
            onDrop={(event) => {
                if (!collection.image) return
                event.preventDefault()
                setDragging(false)
                handleFiles(event.dataTransfer.files)
            }}
        >
            {/* SECTIONS (e.g. gallery albums) */}

            {groups && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {[
                        ...groups.options,
                        ...(unsortedCount > 0 ? [{ value: UNSORTED, label: groups.unsortedLabel }] : []),
                    ].map((option) => {
                        const count = items.filter((item) => groupOf(item) === option.value).length
                        const active = option.value === activeGroup

                        return (
                            <button
                                key={option.value}
                                type="button"
                                aria-pressed={active}
                                onClick={() => switchGroup(option.value)}
                                className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-bold transition-colors ${
                                    active
                                        ? darkMode
                                            ? 'border-cyan-300 bg-cyan-400/15 text-cyan-200'
                                            : 'border-indigo-500 bg-indigo-500/10 text-indigo-700'
                                        : option.value === UNSORTED
                                            ? 'border-amber-500/40 bg-amber-500/10 text-amber-500'
                                            : darkMode
                                                ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                                                : 'border-indigo-600/10 bg-white text-slate-600 hover:bg-indigo-50'
                                }`}
                            >
                                {option.label}
                                <span className="rounded-full bg-current/15 px-2 text-[12px]">{count}</span>
                            </button>
                        )
                    })}
                </div>
            )}

            {/* ADD AREA */}

            <Panel
                darkMode={darkMode}
                className={`mb-5 flex flex-col items-center gap-3 border-dashed p-6 text-center transition-colors sm:p-8 ${
                    dragging
                        ? darkMode
                            ? '!border-cyan-300 !bg-cyan-400/10'
                            : '!border-indigo-500 !bg-indigo-50'
                        : ''
                }`}
            >
                <Button darkMode={darkMode} onClick={handleAdd} disabled={busy || !canAdd} className="h-14 px-7 text-[16px]">
                    <span aria-hidden="true" className="text-[22px] leading-none">+</span>
                    <span>
                        {`Add ${collection.singular}`}
                        {groups && canAdd && ` to "${groups.options.find((option) => option.value === activeGroup).label}"`}
                    </span>
                </Button>

                <p className={`m-0 text-[13px] ${mutedText}`}>
                    {!canAdd
                        ? 'These photos have no section yet. Tick them below and move them into a section. To upload new photos, open a section first.'
                        : collection.image === 'required'
                        ? `Pick ${collection.multiple ? 'one or more images' : 'an image'} from your device, drag ${collection.multiple ? 'them' : 'it'} here, or paste with Ctrl+V.`
                        : 'Fill in the details; an image is optional.'}
                </p>

                {progress && (
                    <p className={`m-0 text-[14px] font-semibold ${darkMode ? 'text-cyan-300' : 'text-indigo-600'}`}>
                        {progress.total > 1
                            ? `Uploading ${progress.done + 1} of ${progress.total}…`
                            : 'Preparing image…'}
                    </p>
                )}

                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple={collection.multiple}
                    hidden
                    onChange={(event) => {
                        handleFiles(event.target.files)
                        event.target.value = ''
                    }}
                />
            </Panel>

            <div className="mb-4 flex flex-col gap-3">
                {notice && <Notice tone="success">{notice}</Notice>}
                {error && <Notice><span className="whitespace-pre-line">{error}</span></Notice>}
            </div>

            {/* LIST */}

            {status === 'loading' && <p className={mutedText}>Loading…</p>}

            {status === 'ready' && visibleItems.length === 0 && (
                <p className={mutedText}>
                    {groups
                        ? 'No photos in this section yet. On the site it shows as "Coming soon".'
                        : `Nothing here yet. The ${collection.label} section stays hidden on the site until you add something.`}
                </p>
            )}

            {/* BULK MOVE */}

            {groups && visibleItems.length > 0 && (
                <Panel darkMode={darkMode} className="mb-3 flex flex-wrap items-center gap-2 p-3">
                    <label
                        className={`mr-1 flex cursor-pointer items-center gap-2 text-[14px] font-semibold ${
                            darkMode
                                ? 'text-slate-200'
                                : 'text-slate-700'
                        }`}
                    >
                        <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={selected.length === visibleItems.length}
                            onChange={(event) =>
                                setSelected(event.target.checked ? visibleItems.map((item) => item.id) : [])
                            }
                        />
                        {selected.length > 0 ? `${selected.length} selected` : 'Select all'}
                    </label>

                    {selected.length > 0 && (
                        <>
                            <span className={`text-[14px] ${mutedText}`}>Move to:</span>

                            {groups.options
                                .filter((option) => option.value !== activeGroup)
                                .map((option) => (
                                    <Button
                                        key={option.value}
                                        variant="secondary"
                                        darkMode={darkMode}
                                        className="h-9"
                                        onClick={() => moveToGroup(selected, option.value)}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                        </>
                    )}
                </Panel>
            )}

            {visibleItems.length > 0 && (
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {visibleItems.map((item, index) => (
                        <li key={item.id}>
                            <Panel darkMode={darkMode} className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-4">
                                <div className="flex min-w-0 flex-1 items-center gap-4">
                                    {groups && (
                                        <input
                                            type="checkbox"
                                            aria-label="Select photo"
                                            className="h-4 w-4 shrink-0"
                                            checked={selected.includes(item.id)}
                                            onChange={() => toggleSelected(item.id)}
                                        />
                                    )}

                                    <div
                                        className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg ${
                                            darkMode
                                                ? 'bg-white/5'
                                                : 'bg-indigo-50'
                                        }`}
                                    >
                                        {item.thumb_path && (
                                            <img
                                                src={publicImageUrl(item.thumb_path)}
                                                alt=""
                                                loading="lazy"
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <div
                                            className={`truncate text-[15px] font-bold ${
                                                darkMode
                                                    ? 'text-slate-100'
                                                    : 'text-[#172554]'
                                            }`}
                                        >
                                            {item[collection.titleField] || <em className={mutedText}>No caption</em>}
                                        </div>

                                        <div className={`truncate text-[13px] ${mutedText}`}>
                                            {subtitleOf(item)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {groups && (
                                        <select
                                            aria-label="Section"
                                            value={item[groups.field] ?? ''}
                                            onChange={(event) => moveToGroup([item.id], event.target.value)}
                                            className={`${inputClass(darkMode)} !h-11 !w-auto !py-0`}
                                        >
                                            <option value="" disabled>{groups.unsortedLabel}</option>
                                            {groups.options.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    <Button
                                        variant="secondary"
                                        darkMode={darkMode}
                                        aria-label="Move up"
                                        title="Move up"
                                        disabled={index === 0}
                                        onClick={() => handleMove(index, -1)}
                                        className="w-11 px-0"
                                    >
                                        ↑
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        darkMode={darkMode}
                                        aria-label="Move down"
                                        title="Move down"
                                        disabled={index === visibleItems.length - 1}
                                        onClick={() => handleMove(index, 1)}
                                        className="w-11 px-0"
                                    >
                                        ↓
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        darkMode={darkMode}
                                        onClick={() => setEditor({ item, image: null })}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="danger"
                                        darkMode={darkMode}
                                        onClick={() => handleDelete(item)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Panel>
                        </li>
                    ))}
                </ul>
            )}

            {editor && (
                <ItemEditor
                    collection={collection}
                    item={editor.item}
                    initialImage={editor.image}
                    defaults={groupDefaults}
                    sortOrder={topSortOrder()}
                    darkMode={darkMode}
                    onClose={() => setEditor(null)}
                    onSaved={handleSaved}
                />
            )}
        </div>
    )
}

export default CollectionManager
