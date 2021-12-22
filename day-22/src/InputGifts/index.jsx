import "/src/InputGifts/InputGifts.css"

const InputGifts = ({
    label,
    type,
    id,
    placeholder,
    children,
    min,
    max,
    value,
}) => {


    return (
        <div className="InputGifts">
            <label htmlFor={id} >{label}</label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                min={min}
                max={max}
                autoComplete="off"
                defaultValue={value}
            />
            {children}
        </div>
    )
}

export { InputGifts }