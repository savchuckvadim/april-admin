import { change } from 'redux-form'
import photo from '../../../../../../../assets/imgs/icons/camera-photo.svg'
import inputstyle from './Input.module.scss'
import style from './File.module.scss'
import { useDispatch } from 'react-redux'


const FileInput = (props) => {
    
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
        dispatch(change('login', props.input.name, file));
    };

    let displayedText = props.input.value ? props.input.value.name : props.placeholder;
    return (
        <>
            {/* <div className={containerClass}> */}
            {/* {icon} */}

            <input
                key={`fake-input_${props.placeholder}`}
                className={inputstyle.input}
                placeholder={displayedText}
                disabled
            >

            </input>
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


        </>
    )
}


export default FileInput