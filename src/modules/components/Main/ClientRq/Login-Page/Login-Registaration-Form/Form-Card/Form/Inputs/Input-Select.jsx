import { change } from 'redux-form'
import photo from '../../../../../../../assets/imgs/icons/camera-photo.svg'
import style from './Input.module.scss'
import { useDispatch } from 'react-redux'


const CheckboxInput = (props) => {
    
    let index = 0
    // let containerClasses = [style.container, style.containerFocus]
    let error = null
    const dispatch = useDispatch();
    if (props.meta.touched || props.input.value) {
        index = 1
    }

    if (props.meta.error && props.meta.touched && !props.meta.active) {
        error = <span className={style.error}>{props.meta.error}</span>
    }

    // let containerClass = containerClasses[index]
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // props.input.onChange(file); // Передача файла в поле формы Redux Form
        
        dispatch(change('login', props.input.name, file));
    };
    let displayedText = props.input.value ? props.input.value.name : props.placeholder;
    return (
        <>
            {/* <div className={containerClass}> */}
            {/* {icon} */}

            <p
                key={`input_${props.placeholder}`}
                className={style.input__name}

            >
                {displayedText}

            </p>
            <label htmlFor={`signup-${props.input.name}`}> {/* Добавьте связь с инпутом */}
                <span className={style.photo__span}>
                    <img className={style.photo} src={photo} alt="photo-camera" />
                    {/* <p>Dwnld</p> */}
                </span>
            </label>

            <input
                {...props.input}
                key={`fileInput_${props.placeholder}`}
                accept='.jpg, .png, .jpeg'
                placeholder={props.placeholder}
                type="file"
                id={`signup-${props.input.name}`}
                className={style.hidden}
                onChange={handleFileChange}
                value={null}

            />
            {/* <label htmlFor="fileInput">

                    <span className={style.photo__span}>
                        <img className={style.photo} src={photo} alt="photo-camera" />
                        <p>Dwnld</p>
                    </span>
                </label> */}

            {/* {error} */}
            {/* </div > */}

        </>
    )
}


export default CheckboxInput