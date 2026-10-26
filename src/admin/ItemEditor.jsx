import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { publicImageUrl } from '../lib/supabaseConfig.js'
import { prepareImage } from './imageTools.js'
import { createItem, updateItem, uploadImage, removeImages } from './api.js'
import { Button, Panel, Notice } from './ui.jsx'
import { inputClass } from './styles.js'

const toFormValues = (fields, item) =>
    Object.fromEntries(
        fields.map((field) => {
            const value = item?.[field.name]
            if (field.type === 'tags') return [field.name, (value ?? []).join(', ')]
            return [field.name, value ?? '']
        }),
    )

const toRow = (fields, values) =>
    Object.fromEntries(
        fields.map((field) => {
            const value = values[field.name].trim()
            if (field.type === 'tags') {
                return [field.name, value.split(',').map((tag) => tag.trim()).filter(Boolean)]
            }
            return [field.name, value === '' ? null : value]
        }),
    )

/*
 * Modal for creating or editing one item.
 * item: existing row (edit) or null (create). initialImage: image prepared from the picker.
 */
function ItemEditor({ collection, item, initialImage, sortOrder, darkMode, onClose, onSaved }) {
    const [values, setValues] = useState(() => toFormValues(collection.fields, item))
    const [newImage, setNewImage] = useState(initialImage ?? null)
    const [removeExisting, setRemoveExisting] = useState(false)
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState(null)
    const fileRef = useRef(null)

    // Free the preview blob URL when it is replaced or the editor closes
    useEffect(() => {
        if (!newImage) return
        return () => URL.revokeObjectURL(newImage.previewUrl)
    }, [newImage])

    useEffect(() => {
        const handleKey = (event) => {
            if (event.key === 'Escape' && !busy) onClose()
        }

        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [busy, onClose])

    const existingThumb = item?.thumb_path && !removeExisting ? publicImageUrl(item.thumb_path) : null
    const preview = newImage?.previewUrl ?? existingThumb
    const hasImage = Boolean(newImage || existingThumb)

    const pickImage = async (file) => {
        if (!file) return
        setError(null)

        try {
            setNewImage(await prepareImage(file))
        } catch (pickError) {
            setError(pickError.message)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (collection.image === 'required' && !hasImage) {
            setError('Please choose an image.')
            return
        }

        setBusy(true)
        setError(null)

        let uploaded = null

        try {
            const row = toRow(collection.fields, values)

            if (newImage) {
                uploaded = await uploadImage(collection.table, newImage)
                Object.assign(row, uploaded)
            } else if (removeExisting) {
                Object.assign(row, { image_path: null, thumb_path: null })
            }

            if (item) {
                await updateItem(collection.table, item.id, row)

                // Old files are only deleted once the row points at the new ones
                if (uploaded || removeExisting) {
                    await removeImages(item.image_path, item.thumb_path).catch(console.error)
                }
            } else {
                await createItem(collection.table, row, sortOrder)
            }

            onSaved()
        } catch (saveError) {
            if (uploaded) {
                await removeImages(uploaded.image_path, uploaded.thumb_path).catch(console.error)
            }
            setError(saveError.message)
            setBusy(false)
        }
    }

    const labelClass = `mb-1.5 block text-[13px] font-bold ${
        darkMode
            ? 'text-slate-300'
            : 'text-slate-600'
    }`

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="editor-title"
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#030712]/70 p-4 backdrop-blur-sm sm:items-center sm:p-8"
        >
            <Panel darkMode={darkMode} className="w-full max-w-[640px] p-5 sm:p-7">
                <h2
                    id="editor-title"
                    className={`m-0 mb-5 text-[22px] font-extrabold ${
                        darkMode
                            ? 'text-slate-100'
                            : 'text-[#172554]'
                    }`}
                >
                    {item ? `Edit ${collection.singular}` : `New ${collection.singular}`}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* IMAGE */}

                    {collection.image && (
                        <div>
                            <span className={labelClass}>
                                Image{collection.image === 'optional' && ' (optional)'}
                            </span>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div
                                    className={`flex h-[140px] w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border sm:w-[200px] ${
                                        darkMode
                                            ? 'border-white/10 bg-white/5 text-slate-500'
                                            : 'border-indigo-600/10 bg-indigo-50 text-slate-400'
                                    }`}
                                >
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="h-full w-full object-contain" />
                                    ) : (
                                        <span className="text-[13px]">No image</span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        variant="secondary"
                                        darkMode={darkMode}
                                        onClick={() => fileRef.current?.click()}
                                        disabled={busy}
                                    >
                                        {hasImage ? 'Replace image' : 'Choose image'}
                                    </Button>

                                    {collection.image === 'optional' && hasImage && (
                                        <Button
                                            variant="danger"
                                            darkMode={darkMode}
                                            disabled={busy}
                                            onClick={() => {
                                                setNewImage(null)
                                                setRemoveExisting(true)
                                            }}
                                        >
                                            Remove image
                                        </Button>
                                    )}
                                </div>

                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(event) => {
                                        pickImage(event.target.files?.[0])
                                        event.target.value = ''
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* FIELDS */}

                    {collection.fields.map((field) => {
                        const id = `field-${field.name}`
                        const common = {
                            id,
                            required: field.required,
                            placeholder: field.placeholder,
                            value: values[field.name],
                            disabled: busy,
                            onChange: (event) =>
                                setValues((previous) => ({ ...previous, [field.name]: event.target.value })),
                            className: inputClass(darkMode),
                        }

                        return (
                            <div key={field.name}>
                                <label htmlFor={id} className={labelClass}>
                                    {field.label}
                                    {field.required && <span className="text-rose-500"> *</span>}
                                </label>

                                {field.type === 'textarea' ? (
                                    <textarea rows={3} {...common} />
                                ) : (
                                    <input
                                        type={field.type === 'tags' ? 'text' : field.type}
                                        {...common}
                                    />
                                )}
                            </div>
                        )
                    })}

                    {error && <Notice>{error}</Notice>}

                    <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Button variant="secondary" darkMode={darkMode} onClick={onClose} disabled={busy}>
                            Cancel
                        </Button>

                        <Button type="submit" darkMode={darkMode} disabled={busy}>
                            {busy ? 'Saving…' : 'Save'}
                        </Button>
                    </div>
                </form>
            </Panel>
        </div>,
        document.body,
    )
}

export default ItemEditor
