

export const tfieldsSetToFirebase = (fields, items) => {
    let result =
        fields.map(field => {
            debugger
            let resultField = { ...field }
            if (field.type === 'array') {

                resultField = {
                    ...field,
                    items: items.filter(item => item.fieldNumber === field.number)
                }
            }
            return resultField
        })
debugger
    return result

}