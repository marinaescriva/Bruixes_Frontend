import "./CInputProfile.css"

export const CInputProfile = ({type, name, value, placeholder, disabled , functionChange, functionBlur}) => {

    return (
        <input
        className="inputDesignProfile"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={functionChange}
        onBlur={functionBlur}
    
        />
    )
}