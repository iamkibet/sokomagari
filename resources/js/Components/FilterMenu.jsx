import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const FilterMenu = ({ label, options }) => (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium text-gray-700 text-sm sm:text-base">
                    {label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4 border">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className=""
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
);

export default FilterMenu;
