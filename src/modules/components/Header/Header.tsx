import style from './Header.module.css'
import logo from '../../../assets/imgs/logo.svg'
import burger from '../../../assets/imgs/header/menu-burger.svg'
import LogoutContainer from './Logout-Container'
import Avatar from '../Elements/Avatar/Avatar'
import { HeaderPropsType } from './Header-Container'
import april from "../../../assets/imgs/logo/lg_april_full_blue.jpg"


const Header = (props: HeaderPropsType) => {

    let avatar = null
    // props.user && (avatar = props.user.profile.avatar)



    return (
        <header className={style.header}>
            <div className={style.container}>
                <div className={style.menu}>
                    <img src={burger} alt="menu-burger" />
                </div>
                <div className={style.brand}>
                <img className={style.logo} src={april} alt="" />
                </div>
                <div className={style.currentUser}>
                    <div className={style.name}>
                        {props.user && <LogoutContainer />}
                    </div>
                    {props.user && <Avatar
                        size={40}
                        // img={avatar}
                        link={'profile'}
                        user={props.user}
                    />}
                </div>
            </div>
        </header>
    )
}

export default Header