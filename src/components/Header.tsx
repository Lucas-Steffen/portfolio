import {
    HouseIcon
} from '@phosphor-icons/react'

function HeaderButton({
    icon: Icon,
    label
} : {
    icon: React.ElementType,
    label: string
}) {
    return(
        <div className=''>
            <Icon size={20} weight="duotone" />
            <h1>{label}</h1>
        </div>
    )
}

export function Header(){
    return(
        <div>
            <HeaderButton label="Home" icon={HouseIcon} />
        </div>
    )
}