import { ComplectFilterEnum, ComplectType, FieldType, FieldsFilterEnum, SupplyFilterEnum, SupplyType } from "../../types/types";




export const getFiltredFields = (filter: FieldsFilterEnum, fields: Array<FieldType>) => {
    // filter = 'All', 'Global', 'Client'

    let resultFields = fields.map(field => ({ ...field }))
    switch (filter) {

        case FieldsFilterEnum.All:

            return resultFields;

        case FieldsFilterEnum.Global:
            resultFields = fields.filter(field => (
                !field.isЕditableBitrix && !field.isЕditableValue
            ))
            return resultFields;

        case FieldsFilterEnum.Client:

            resultFields = fields.filter(field => (
                field.isЕditableBitrix || field.isЕditableValue
            ))
            return resultFields;



        default:
            return resultFields;
    }

}

export const getFiltred = (filter: ComplectFilterEnum | SupplyFilterEnum, values: Array<ComplectType | SupplyType >, type: 'complect' | 'supply') => {
    // filter = 'All', 'Global', 'Client' | 'All', 'Prof', 'Universal'

    let resultComplects = values.map(value => ({ ...value }))

    if (filter !== ComplectFilterEnum.All) {
        resultComplects = values.filter(value => (
            value.type === value.type.toLowerCase()
        ))
    }
    return resultComplects;
   
    

}