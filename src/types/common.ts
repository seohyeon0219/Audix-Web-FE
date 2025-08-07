// icon
export type IconProps = {
    iconname: string;
    size?: string | number;
    color?: string;
    weight?: number;
    fill?: 0 | 1;
    className?: string;
}


// searchBar
export interface SearchBarProps {
    placeholder: string;
    iconname: string;
}


// sidebar
export interface SidebarItemProps {
    children: React.ReactNode;
    className?: string;
    href: string;
}
