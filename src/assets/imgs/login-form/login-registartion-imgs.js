import style from './login-registartion-imgs.module.css'



const getLoginRegistrationIcon = (placeholder, colorIndex) => {
    const classes = [style.icon, style.iconRed]
    if (placeholder === 'E-mail') {
        return <svg className={classes[colorIndex]} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
                <path d="M17 21H12V21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V13.5C21 14.8807 19.8807 16 18.5 16C17.1193 16 16 14.8807 16 13.5V12C16 9.79086 14.2091 8 12 8V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>

    } else if (placeholder === 'Name' || placeholder === 'Surname') {
        return <svg className={classes[colorIndex]} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="1">
                <path d="M14.4749 4.52513C15.8417 5.89197 15.8417 8.10804 14.4749 9.47488C13.1081 10.8417 10.892 10.8417 9.52515 9.47488C8.15831 8.10804 8.15831 5.89197 9.52515 4.52513C10.892 3.15829 13.1081 3.15829 14.4749 4.52513Z" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 18.5V19.5C4 20.052 4.448 20.5 5 20.5H19C19.552 20.5 20 20.052 20 19.5V18.5C20 15.474 16.048 13.508 12 13.508C7.952 13.508 4 15.474 4 18.5Z" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    } else if (placeholder === 'Password' || placeholder === 'Repeat Password') {
        return <svg className={classes[colorIndex]} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
                <path d="M8 10V7C8 4.791 9.791 3 12 3C14.209 3 16 4.791 16 7V10" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 21H7C5.895 21 5 20.105 5 19V12C5 10.895 5.895 10 7 10H17C18.105 10 19 10.895 19 12V19C19 20.105 18.105 21 17 21Z" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    }


}

export default getLoginRegistrationIcon