import { ComplectFilterEnum, ComplectType, FieldType, FieldsFilterEnum, RegionType, SupplyFilterEnum, SupplyType } from "../../types/types";

type FilterType = ComplectFilterEnum | SupplyFilterEnum



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

export const getFiltred = (filter: ComplectFilterEnum | SupplyFilterEnum, values: Array<ComplectType | SupplyType>, type: 'complect' | 'supply') => {
    // filter = 'All', 'Global', 'Client' | 'All', 'Prof', 'Universal'

    let resultComplects = values.map(value => ({ ...value }))

    if (filter !== ComplectFilterEnum.All) {
        resultComplects = values.filter(value => (
            value.type === value.type.toLowerCase()
        ))
    }
    return resultComplects;



}

export const getFiltredRegions = (filters: Array<number>, regions: Array<RegionType>) => {

    if (filters.length > 0) {
        let filtredRegions = regions.filter(region => filters.includes(region.number))
        return  filtredRegions.map(region => ({ ...region }))

    } else {
        return regions.map(region => ({ ...region }))
    }
}