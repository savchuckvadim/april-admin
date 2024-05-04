import { change } from 'redux-form'
// import photo from '../../../../../../../assets/imgs/icons/camera-photo.svg'
import inputstyle from './Input.module.scss'
import style from './File.module.scss'
import { useDispatch } from 'react-redux'



//REFACTORING TO FORMIK

const FileInput = ({children, field, form, placeholder, type, props}) => {
    
    let index = 0
    // let containerClasses = [style.container, style.containerFocus]
    let error = null
    // const dispatch = useDispatch ();
    if (form.touched || field.value) {
        index = 1
    }

    if (form.error && form.touched && !form.active) {
        error = <span className={style.error}>{form.error}</span>
    }

    // let containerClass = containerClasses[index]
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // dispatch(change('login', field.name, file));
        form.setFieldValue('file', file)
        
        // field.onChange(file)
        console.log(form.values)
    };

    let displayedText = field.value ?field.value.name : placeholder;
    return (
        <>
            {/* <div className={containerClass}> */}
            {/* {icon} */}

            <input
                key={`fake-input_${placeholder}`}
                className={inputstyle.input}
                placeholder={displayedText}
                disabled
            >

            </input>
            <label htmlFor={`signup-${field.name}`}> {/* Добавьте связь с инпутом */}
                <span className={style.photo__span}>
                    {/* <img className={style.photo} src={photo} alt="photo-camera" /> */}
                    <p>Document</p>
                </span>
            </label>

            <input
                {...field}
                key={`fileInput_${placeholder}`}
                accept='.doc, .docx'
                placeholder={placeholder}
                type="file"
                id={`signup-${field.name}`}
                className={style.hidden}
                onChange={handleFileChange}
                value={null}

            />


        </>
    )
}


export default FileInput