import React, {useState, useRef, useEffect} from "react";
import ellipseDarkIcon from "../../assets/icons/Ellipse-dark.svg";
import ellipseLightIcon from "../../assets/icons/Ellipse-light.svg";
import {ACTIOINS} from "../../types/Status";

interface DropdownProps {
    options: OptionType[];
    placeholder?: string;
    onChange?: (selectedOption: string) => void;
    ellipse?: boolean;
}

export type OptionType = {
    name: string;
    color?: string;
    disabled?: boolean,
};

const Dropdown: React.FC<DropdownProps> = ({
                                               options,
                                               placeholder = "Select an option",
                                               ellipse,
                                               onChange,
                                           }) => {
    const [dark, setDark] = useState<boolean>(false);
    useEffect(() => {
        const darkStorage = localStorage.getItem("dark");
        if (darkStorage === "1") {
            setDark(true);
        } else {
            setDark(false);
        }
    }, []);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <button
                className="px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                {ellipse && dark && <img src={ellipseDarkIcon} alt="ellipse icon"/>}
                {ellipse && !dark && <img src={ellipseLightIcon} alt="ellipse icon"/>}
                {!ellipse && (selectedOption || placeholder)}
            </button>

            {isOpen && (
                <ul className="absolute z-10 mt-1  w-[170px] mx-[-132px] bg-white border rounded-sm border-gray-200 shadow-lg">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="w-full p-0"
                        >
                            {option.name === ACTIOINS.DELETE ? <button
                                disabled={option.disabled}
                                className="px-4 py-2 text-sm  hover:bg-gray-100 cursor-pointer w-full flex flex-row justify-start dark:bg-black text-red-800 dark:text-red-600 hover:dark:bg-gray-800 transition "
                                onClick={() => handleOptionClick(option.name)}
                            >
                                {option.name}
                            </button> :
                                <button
                                disabled={option.disabled}
                            className="px-4 py-2 text-sm  hover:bg-gray-100 cursor-pointer w-full flex flex-row justify-start dark:bg-black text-black dark:text-white hover:dark:bg-gray-800 transition"
                            onClick={() => handleOptionClick(option.name)}
                        >
                            {option.name}
                        </button>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
