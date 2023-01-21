import { useEffect, useState } from 'react'
import { UploadIcon } from '../SVG/UploadIcon'
import './index.scss'

interface Props {
    className?: String,
    fileName?: String,
    id: string,
    onChange?: (img: File) => void,
    value: File|null
}

export function UploadImg({
    className,
    fileName,
    id,
    onChange,
    value
}: Props){
    const initialDescription = `Presione aqui para subir ${fileName?fileName:"el archivo"}`
    const [description, setDescription] = useState<string>(initialDescription)
    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target || !e.target.files) return
        if(onChange != null && e.target.files[0]){
            const img = e.target.files[0]
            onChange(img)
        }
    }

    useEffect(() => {
        if(!value) setDescription(initialDescription)
        else setDescription("Archivo guardado")
    },[value])

    return (
        <div className='uploadWrapper'>
            <input
                onChange={onUpload}
                accept=".jpg,.png"
                style={{ display: 'none' }}
                id={id}
                type="file"
            />
            <label className='label' htmlFor={id}>
                <div className={`${className} uploadContainer`}>
                    <UploadIcon className={"uploadIcon"}/>
                    <p>
                        {description}
                    </p>
                </div>
            </label> 
        </div>
    )
}