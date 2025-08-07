import { IconProps } from "@/types/common"

export default function Icon ({ 
    iconname, 
    size = 18, 
    color = "#B9B9B9", 
    weight = 400, 
    fill = 0, 
    className = ''
}: IconProps) {
    return (
        <span 
            className={`material-symbols-outlined ${className}`} 
            style={{ 
                fontSize: size,
                color: color,    
                fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`
 }}
        >
            {iconname}
        </span>
    )
}
