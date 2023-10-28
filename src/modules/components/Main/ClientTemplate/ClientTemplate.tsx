import { change, stopSubmit } from 'redux-form'
import style from './ClientTemplate.module.scss'
import ClientTemplateContainer from './ClientTemplateContainer'
import ClientTemplateForm from './ClientTemplateForm/ClientTemplateForm'
import { useDispatch } from 'react-redux'

export type ClientTemplateOnSubmitType = (values: ClientTemplateValuesType) => void
export type OnDocumentUploadType = (event: any) => void
export type ClientTemplateValuesType = {

    documentFirst: 'documentFirst',

    // documentSecond: 'documentSecond',


}
//@ts-ignore
const ClientTemplate = ({ uploadClientTemplate }) => {

    const values = {
        documentFirst: 'documentFirst',
    }
    const dispatch = useDispatch();
    const onSubmit: ClientTemplateOnSubmitType = (values: ClientTemplateValuesType) => {

        debugger
        console.log('values')
        console.log(values)
        if (!values.documentFirst) {

            let message = 'Password is wrong'
            let action = stopSubmit('login', {
                _error: message
            })
            dispatch(action)

        } else {
            // const file = event.target.files[0];


            const file = values.documentFirst
            debugger
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', 'props.fileName');
            formData.append('portal', 'april-garant.bitrix24.ru');
            formData.append('type', 'props.type');
            uploadClientTemplate()
        }

    }

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     dispatch(change('client-template', 'documentFirst', file));
    // };



    const onDocumentUpload: OnDocumentUploadType = (event: any) => {
        //@ts-ignore
        const file = event.target.files[0];
        debugger
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', 'props.fileName');
        formData.append('portal', 'april-garant.bitrix24.ru');
        formData.append('type', 'props.type');
        uploadClientTemplate(formData)


    }





    return (
        <div>
            ClientTemplate

            <div>

                <ClientTemplateForm documentFirst={'documentFirst'} onSubmit={onSubmit}
                    //@ts-ignore
                    onDocumentUpload={onDocumentUpload}
                />

            </div>
        </div>
    )
}


export default ClientTemplate