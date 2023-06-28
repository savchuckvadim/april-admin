import style from './Light-Loading-Page.module.scss'
import dark from './Dark-Loading-Page.module.css'
import redLogo from '../../../../assets/imgs/logo/lg_april_tree_blue.png'

const LoadingPage = (props) => {
    let logo =  redLogo
    return (
        <div className={style.wrapper} style={props.style}>
            {/* <img className={!props.isComponent ? style.logo : style.logoMini}
                src={logo} alt="logo" /> */}
                <div className={style.logoWrapper}>
                <div className={style.logo}></div>
                </div>
                
           {!props.isComponent && <p className={style.text}>Loading...</p>}
        </div>
    )
}
export default LoadingPage