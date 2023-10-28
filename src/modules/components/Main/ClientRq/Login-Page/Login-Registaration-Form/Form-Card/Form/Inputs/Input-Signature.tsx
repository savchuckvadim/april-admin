import style from './Signature.module.scss'
import React, { useEffect, useRef, useState } from 'react'
// import getLoginRegistrationIcon from '../../../../../../../assets/imgs/login-form/login-registartion-imgs'
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form'
// import { FieldValidatorType } from '../../../../../../utils/Validators/validator'
import 'react-phone-input-2/lib/style.css';
// import SignatureCanvas from 'react-signature-canvas';
import { useDispatch } from 'react-redux'
import { change } from 'redux-form';
// import save from '../../../../../../../assets/imgs/checkboxes/ch_true_grn_1.png'
// import cancel from '../../../../../../../assets/imgs/checkboxes/ch_false_bw_1.svg'
import { FieldValidatorType } from '../../../../../../../../utils/Validators/validator';


type SignatureProps = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder: string
    type: string
    validate: Array<FieldValidatorType>
}




const Signature: React.FC<SignatureProps> = (props) => {
    // const signatureRef = useRef<SignatureCanvas | null>(null); // Задаем тип для signatureRef
    const [trimmedDataURL, setTrimmedDataURL] = useState<string | null>(null);


    let error = null
    let index = 0
    if (props.meta.active || props.input.value) {
        index = 1
    }

    if (props.meta.error && props.meta.touched && !props.meta.active) {
        error = <span className={style.input__error}>{props.meta.error}</span> 
    }

    const dispatch = useDispatch();
    // const handleClear = () => {
        
    //     if (signatureRef.current && !signatureRef.current.isEmpty()) {
            
    //         setTrimmedDataURL(null)
    //         dispatch(change('login', 'signature', null));
    //         signatureRef.current.clear();

    //     } else {
    //         setTrimmedDataURL(null)
    //         dispatch(change('login', 'signature', null));
    //     }

    // }

    // const handleTrim = () => {
    //     // @ts-ignore
    //     console.log(signatureRef.current)

    //     if (signatureRef.current && !signatureRef.current.isEmpty()) {
    //         console.log(signatureRef.current.isEmpty())
    //         let data = signatureRef.current.getTrimmedCanvas().toDataURL('image/png')
    //         setTrimmedDataURL(data);
    //         dispatch(change('login', 'signature', data));
    //     }
    // }

    return (

        <>
            <div className={style.signature__header}>
                <h3 className={style.signature__title}>{props.placeholder}: {error}</h3> 
            </div>
            <div className={trimmedDataURL ? style.signatureDone : style.signature}
                // onMouseLeave={handleTrim}

            >

                {/* {<SignatureCanvas

                    ref={signatureRef}
                    canvasProps={{ className:style.canvas }}
                />}
                {trimmedDataURL && <div className={style.signatureResult__wrapper}>
                </div>}

                {<input style={{ display: 'none' }} {...props.input} />}
                <div className={trimmedDataURL ? style.signature__optionsDone : style.signature__options}>
                    <div className={style.signature__buttons}>

                        <img onClick={handleClear} className={style.signature__button} src={cancel} />
                        {!trimmedDataURL && <img className={style.signature__button} src={save} onClick={handleTrim} />}
                    </div>



                </div> */}

            </div>
        </>
    )
}



export default Signature