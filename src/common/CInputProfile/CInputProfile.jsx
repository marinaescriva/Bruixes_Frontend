import "./CInputProfile.css"

export const CInputProfile = ({type, name, value, placeholder, disabled , onChangeFunction, onBlurFunction}) => {

    return (
        <input
        className="inputDesignProfile"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChangeFunction}
        onBlur={onBlurFunction}
    
        />
    )
}