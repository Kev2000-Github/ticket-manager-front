import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import './index.scss'

interface Props {
    className?: String,
    label?: string,
    slug?: string,
    onChange?: ChangeEventHandler<HTMLTextAreaElement>,
    withLabel?: Boolean,
    value?: string,
    required?: boolean
}

export function CustomTextArea({
    className,
    label,
    onChange,
    slug,
    withLabel = true,
    value,
    required
}: Props){
    const [isFocus, setIsFocus] = useState(false)
    const [characterCount, setCharacterCount] = useState(0)

    const onFocus = () => {
        setIsFocus(true)
    }

    const onFocusOut = () => {
        setIsFocus(false)
    }

    const onChangeHOC = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const characters = event.target.value.length
        setCharacterCount(characters)

        if(onChange != null){
            onChange(event)
        }
    }

    return (
        <div className={`wrapper ${className}Wrapper`}>
            {
                withLabel ?
                <label 
                    className={`
                        label 
                        ${className} 
                        ${isFocus ? "focused" : ""}
                        ${characterCount > 0 ? "filled" : ""}
                    `} 
                    htmlFor={slug? slug : "textfield"}
                >
                        {label? label : ""}
                </label>
                :
                ""
            }
            <textarea
                required={required? required:false}
                value={value}
                onChange={onChangeHOC}
                onFocus={onFocus} 
                onBlur={onFocusOut} 
                className={`textarea ${isFocus ? "focused" : ""}`} 
                name={slug? slug : "textarea"}
            />
        </div>
    )
}