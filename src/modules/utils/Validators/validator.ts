export type FieldValidatorType = (value:string) => string | undefined 

export const symbol = (type: string): FieldValidatorType => (value) => {

    let error = undefined
    if (value) {
        if (type === 'password') {
            value.length < 8
                ? error = 'Пароль неверный'
                : error = undefined
        } else if (type === 'email') {

            if (value && value.indexOf('@') !== -1) {

                error = undefined
            } else {

                error = 'E-mail ввёден не правильно!'
            }
        }

    }
    return error
}

export const emailValidate = symbol('email')
export const passwordValidate = symbol('password')

export const requiredFields: FieldValidatorType = (value)=> {
    let error = undefined
    if (!value) {

        error = 'Не заполнено'
    }



    return error
}




