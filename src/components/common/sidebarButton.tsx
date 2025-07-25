interface SidebarButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function SidebarButton({
    children,
    className = "",
    onClick
}: SidebarButtonProps) {
    return (
        <button 
            className="w-full p-3 text-left rounded-lg text-white transition-colors cursor-pointer"
        >
            {children}
        </button>
    )
}