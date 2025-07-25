interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

export default function Button({
    children,
    className = ""
}: ButtonProps) {
    return (
        <button className={`w-72 h-12 btn-login-gray text-white cursor-pointer ${className}`}>
            {children}
        </button>
    )
}
