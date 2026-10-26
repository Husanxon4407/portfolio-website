import { useCallback, useEffect, useRef, useState } from 'react'
import { publicImageUrl } from '../lib/supabaseConfig.js'
import { prepareImage, imageFromClipboard } from './imageTools.js'
import { listItems, uploadImage, createItem, deleteItem, swapOrder } from './api.js'
import ItemEditor from './ItemEditor.jsx'
import { Button, Panel, Notice } from './ui.jsx'

function CollectionManager({ collection, darkMode }) {
    const [items, setItems] = useState([])
    const [status, setStatus] = useState('loading')
    const [error, setError] = useState(null)
    const [notice, setNotice] = useState(null)
    const [editor, setEditor] = useState(null)
    const [progress, setProgress] = useState(null)
    const [dragging, setDragging] = useState(false)
    const fileRef = useRef(null)

    const busy = progress !== null

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
            })
            .catch((loadError) => {
                if (ignore) return
                setError(loadError.message)
                setStatus('error')
            })

        return () => {
            ignore = true
        }
    }, [collection.table])

    // New items go to the top of the list
    const topSortOrder = (count = 1) =>
        (items.length ? Math.min(...items.map((item) => item.sort_order)) : 0) - count

    const handleFiles = async (fileList) => {
        const files = [...fileList].filter((file) => file.type.startsWith('image/'))
        if (files.length === 0 || busy) return

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
                await createItem(collection.table, paths, base + index)
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
        if (other < 0 || other >= items.length) return

        try {
            await swapOrder(collection.table, items[index], items[other])
            await reload()
        } catch (moveError) {
            setError(moveError.message)
        }
    }

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
                <Button darkMode={darkMode} onClick={handleAdd} disabled={busy} className="h-14 px-7 text-[16px]">
                    <span aria-hidden="true" className="text-[22px] leading-none">+</span>
                    Add {collection.singular}
                </Button>

                <p className={`m-0 text-[13px] ${mutedText}`}>
                    {collection.image === 'required'
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

            {status === 'ready' && items.length === 0 && (
                <p className={mutedText}>
                    Nothing here yet. The {collection.label} section stays hidden on the site until you add something.
                </p>
            )}

            {items.length > 0 && (
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {items.map((item, index) => (
                        <li key={item.id}>
                            <Panel darkMode={darkMode} className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-4">
                                <div className="flex min-w-0 flex-1 items-center gap-4">
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
                                        disabled={index === items.length - 1}
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
