import style from './Button.module.css'


const Button = (props) => {

    return (
        <input
            key={`input-send-post-btn-${props.nameOfButton}`}
            className={style.btn__post}
            type="button"
            value={props.nameOfButton}
            onClick={props.onClick} 
            />
    )
}

