import Link from "next/link";

interface SidebarItemProps {
    children: React.ReactNode;
    className?: string;
    href: string;
}

export default function SidebarItem({
    children,
    className = "",
    href
}: SidebarItemProps) {
    return (
        <Link 
            href={href}
            className={`w-full p-3 text-left rounded-lg text-white transition-colors cursor-pointer ${className}`}
        >
            {children}
        </Link>
    )
}