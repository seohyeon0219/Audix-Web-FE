import Icon from '@/components/common/icon';
import { FormProps } from '@/types/props/form';

export default function LoginForm({
    label,
    placeholder,
    iconname,
    type = "text",
    value,
    onChange,
    className = ""
}: FormProps) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className="text-xs text-login-gray">{label}</label>
            <div className="flex items-center border border-login-gray w-72 h-12">
                <Icon 
                    iconname= {iconname} 
                    size={26} 
                    weight={200} 
                    className="pl-2 text-login-gray"
                    />
                <input 
                    type="text"
                    placeholder={placeholder}
                    className="pl-2 border-login-gray placeholder:text-login-gray placeholder:text-xs focus:outline-0 focus:ring-0 focus:border-transparent"
                >
                </input>
            </div>
        </div>
    )
}