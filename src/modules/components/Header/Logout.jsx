import { NavLink } from "react-router-dom"
import Button from "../Elements/Button/Button"
import style from './Logout.module.css'
const Logout = (props) => {
   
    return (
        <div className={style.logout__wrapper}>
            <NavLink to='../login' >
                <Button color={'white'} border={16} onClick={props.logout} name={'logout'}/>
            </NavLink>
        </div>
    )
}

export default Logout