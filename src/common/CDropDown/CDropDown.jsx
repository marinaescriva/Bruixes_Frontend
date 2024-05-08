import "./CDropDown.css";
export const CDropDown = ({ dropdownClass, title, items, onChangeFunction }) => {


    return (
        <select className={"CDropDownDesign"} onChange={onChangeFunction} name={title} defaultValue={""}>
            <option value="" disabled> {title} </option>
            {items.map((item, index) => (
                <option key={index} value={item.id} className={dropdownClass}>{item.id}</option>
            ))}
        </select>
    );
};