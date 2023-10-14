import React, { useState } from "react";

export const DropdownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div onClick={toggleDropdown}>
                {/* This is the clickable area */}
            </div>
            {isOpen && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}
