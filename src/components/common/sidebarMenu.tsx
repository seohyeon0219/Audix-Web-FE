import Link from "next/link";

interface SidebarMenuProps {
    children: React.ReactNode;
    className?: string;
    href: string;
}

export default function SidebarMenu({
    children,
    className = "",
    href
}: SidebarMenuProps) {
    return (
        <Link 
            href={href}
            className={`w-full p-3 text-left rounded-lg text-white transition-colors cursor-pointer ${className}`}
        >
            {children}
        </Link>
    )
}