import style from './Login-Page.module.scss'
import RegistrationContainer from './Login-Registaration-Form/Registration-Container'
// import Background from '../Elements/Backgrounds/Background'
// import HeaderContainer from '../Header/Header-Container'


const RegistrationPage = () => {

    return (
        <>
            <div className={style.header}>
                {/* <HeaderContainer user={null} /> */}
            </div>
            <div className={style.page__container}>
                {/* <Background dark={false} /> */}
                <div className={style.form__wrapper}>
                    {/* <RegistrationContainer /> */}
                </div>
            </div>
        </>
    )
}

export default RegistrationPage