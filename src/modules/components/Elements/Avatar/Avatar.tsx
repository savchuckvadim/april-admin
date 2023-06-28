import { NavLink } from 'react-router-dom'
import { UserType } from '../../../types/types'
import style from './Avatar.module.scss'
import AvatarLibrary  from 'react-avatar';

type PropsType = {
    user: UserType
    size: number
    link?: string
    img?: string
    border?: string
    isActive?: boolean
}

const Avatar: React.FC<PropsType> = (props) => {

    let initials = null
    let img = <AvatarLibrary name={'Vadim Savchuk'} size="100" round={true}/>
    // let img = props.user.profile.avatar
    
    // let border = props.border && 'none' 

    if (props.user) {

        // if (props.user.profile.avatar) {
        //     img = props.user.profile.avatar
        // } else {
        //     initials = (props.user.profile.name.substring(0, 1) + props.user.profile.surname.substring(0, 1)).toUpperCase()
        // }

    } else {
        initials = 'SP'
    }



    let avatar = <div className={style.avatar}
        style={{
            backgroundImage: ` url(${img})`,
            width: props.size,
            height: props.size,
           
            // border: border,
            // borderColor: 'red'
        }}>
        {!props.img && <h1 className={style.initials}
            style={{
                fontSize: props.size / 2.8
            }}
        >
            {initials}

        </h1>}
       {props.isActive && <div className={style.isActive}></div>}
    </div>
    if (props.link && props.link !== undefined) {
        return <NavLink className={style.link} replace to={`${props.link}`}>{avatar}</NavLink>
    } else {
        return avatar
    }

}

export default Avatar