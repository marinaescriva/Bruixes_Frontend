import "./CDropDown.css";
export const CDropDownG = ({ dropdownClass, title, items, onChangeFunction }) => {


    return (
        <select className={"CDropDownDesign"} onChange={onChangeFunction} name={title} defaultValue={""}>
            <option value="" disabled> {title} </option>
            {items.map((item, index) => (
                <option key={index} value={item.id} className={dropdownClass}>{item.nombre}</option>
            ))}
        </select>
    );
};