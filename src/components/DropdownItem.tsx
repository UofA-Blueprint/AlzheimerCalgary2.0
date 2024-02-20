// As shown in TestSquareProps
export interface DropdownItemProps {
    text: string;
    isSelected: boolean;
    onSelect: () => void;
}

function DropdownItem({ text, isSelected, onSelect }:DropdownItemProps) {
    return (
        <li
            className={`py-1 pr-4 pl-2 rounded-lg h-8 hover:bg-neutrals-light-500 cursor-pointer ${isSelected ? 'font-bold' : 'font-normal'}`} onClick={onSelect}>

            <a className=" text-neutrals-dark-500 font-display">{text}</a>
        </li>
    );
}

export default DropdownItem;
