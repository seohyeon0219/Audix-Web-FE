interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function Button({
    children,
    className = "",
    onClick
}: ButtonProps) {
    return (
        <button 
            className={`w-72 h-12 btn-login-gray text-white cursor-pointer ${className}`}
            onClick={onClick}    
        >
            {children}
        </button>
    )
}
