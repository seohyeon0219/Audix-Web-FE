import { ButtonProps } from "@/types/props/button"

export default function Button({
    children,
    className = "",
    onClick,
    disabled = false
}: ButtonProps) {
    return (
        <button
            className={`w-72 h-12 btn-login-gray text-white cursor-pointer ${className}`}
            onClick={onClick}
            //
            disabled={disabled}
        //
        >
            {children}
        </button>
    )
}
