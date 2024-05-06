import "./Cinput.css";
export const CInput = ({className, type, name, placeholder, value, onChangeFunction}) => {

    return (
        <input
            className={className}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChangeFunction}
        />
    )
}