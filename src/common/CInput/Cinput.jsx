import "./Cinput.css";
export const CInput = ({className, type, name, placeholder, value, onChangeFunction, onBlurFunction}) => {

    return (
        <input
            className={className}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChangeFunction}
            onBlur={onBlurFunction}
        />
    )
}