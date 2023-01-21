import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import './index.scss'

interface Props {
    className?: String,
    label?: string,
    slug?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    type?: "email"|"text",
    autoComplete?: "off"|"on",
    withLabel?: Boolean,
    value?: string
}

export function CustomTextField({
    className,
    label,
    onChange,
    slug,
    type,
    autoComplete,
    withLabel = true,
    value
}: Props){
    const [isFocus, setIsFocus] = useState(false)
    const [characterCount, setCharacterCount] = useState(0)

    const onFocus = () => {
        setIsFocus(true)
    }

    const onFocusOut = () => {
        setIsFocus(false)
    }

    const onChangeHOC = (event: ChangeEvent<HTMLInputElement>) => {
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
            <input
                value={value}
                onChange={onChangeHOC}
                onFocus={onFocus} 
                onBlur={onFocusOut} 
                className={`textfield ${isFocus ? "focused" : ""}`} 
                name={slug? slug : "textfield"}
                type={type ? type : "text"}
                autoComplete={autoComplete ? autoComplete : "on"}
            />
            <span className={`border ${isFocus ? "focused" : ""}`}></span>
        </div>
    )
}