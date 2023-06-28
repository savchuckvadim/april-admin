


export type UserType = {
    id: number
    email: string
    name: string
    // followed: 0 | 1
    // followers: Array<UserType>
    // followeds: Array<UserType>
    // profile: ProfileType
    // postsCount: number
    isAuthUser: boolean
}

// export type ProfileType = {
//     about_me: string | null
//     avatar: string | null
//     created_at: string
//     email: string
//     hero: string | null
//     id: number | null
//     name: string
//     surname: string
//     updated_at: string
//     user_id: number | null
// }

// export type PostType = {
//     author: UserType
//     body: string
//     id: number
//     img: string | null
//     isAuthLikes: boolean
//     likesCount: number
//     profile_id: number
//     created: string

// }

// export type LikeType = {
//     id: number
//     post_id: number,
//     author_id: number
// }

export enum PreloaderCodesEnum {
    Global = 'global',
    Page = 'page',
    Component = 'component'
}


// export type DialogType = {
//     id: number
//     participant: UserType
//     messages: Array<MessageType> | []
//     isSound: Boolean
// }

export type MessageType = {
    id: number
    dialogId: number
    body: string
    isForwarded: boolean
    isEdited: boolean
    authorId: number
    author: UserType
    isAuthorIsAuth: boolean
    created: string
}


export type PaginatorMetaType = {
    current_page: number
    from: number
    last_page: number
    links: Array<any>
    path: string
    per_page: string
    to: number
    total: number
}

export type PaginatorLinksType = {
    first: string
    last: string
    next: number
    prev: number
}

export type NotificationType = {
    // isSound: boolean
    message: MessageType 

}


export type FieldType = {

    number: number
    name: string
    rName: string
    bitrixId: string
    value: string
    type: string
    action: string
    isЕditableBitrix: boolean
    isЕditableValue: boolean
    isArray: boolean
    isInTemplate: boolean

}

export enum FieldsFilterEnum {
    All = 'All',
    Global = 'Global',
    Client = 'Client'
}
export type ClientType = {


    name: string | null
    domain: string | null
    email: string | null
    fields: Array<FieldType>
    number: number | null
    key:string | null
    hook:string | null
    products: Array<ProductType> | null
    // isCreating:boolean


}


export type ProductType = {
    number: number
    name: string
    productId: number | null
    type: ProductTypesEnum

    //from complect
    complectNumber: number
    complectName: string  //complect->fullName
    withConsalting: boolean
    complectType: ComplectTypesEnum
    abs: number | false

    //from supply
    supplyNumber: number
    supplyName: string
    supplyType: SupplyTypesEnum

    contractSupplyName: string
    contractProp1: string
    contractProp2: string
    contractPropComment: string
    contractPropEmail: string
    contractPropLoginsQuantity: string
    contractPropSuppliesQuantity: number | 'Флэш'

    //from contract
    contractName: ContractAprilNameEnum //aprilName
    contractNumber: number
    measureNumber: number
    mesureFullName: string
    prepayment: number
    discount: number

    //from consalting
    contractConsaltingProp: string
    contractConsaltingComment: string


    //other
    withPrice: boolean //price | abs

}


export enum ProductTypesEnum {
    Garant = 'Гарант',
    LegalTech = 'Legal Tech',
    Consalting = 'Consalting'
}

type ProfType = ProductType & {



}
type UniversalType = ProductType & {

    abs: number | null,
}

type ServiceProductType = ProductType & {
    isAbon: boolean
    halfYearId?: number
    yearId?: number
}


export type ComplectType = {

    number: number
    name: string
    fullName: string
    shortName: string

    isChanging: boolean
    withConsalting: boolean
    weight: number
    abs: number | null
    type: ComplectTypesEnum
}


export enum ComplectTypesEnum {
    prof = 'prof',
    universal = 'universal'
}



export enum ComplectFilterEnum {
    All = 'All',
    Prof = 'Prof',
    Universal = 'Universal'
}
export enum TableTypes {
    clients = 'clients',
    complects = 'complects',
    products = 'products',
    fields = 'fields',
    supply = 'supply',
    regions = 'regions',
    contracts = 'contracts',
    consalting = 'consalting',
    lt = 'lt'
}

export type SupplyType = {
    name: string
    number: number
    type: SupplyTypesEnum
    coefficient: number


    contractName: string
    contractProp1: string
    contractProp2: string
    contractPropComment: string
    contractPropEmail: string
    contractPropLoginsQuantity: string
    contractPropSuppliesQuantity: number | 'Флэш'



    // fullName: string
    // shortName: string

}

export enum SupplyTypesEnum {
    proxima = 'proxima',
    internet = 'internet'
}
export enum SupplyFilterEnum {
    All = 'All',
    Proxima = 'Proxima',
    Internet = 'Internet'
}



export type RegionType = {
    number: number
    name: string
    title: string
    abs: number
    infoblock: string
}



export type ConsaltingType = {
    number: number
    name: string
    fullName: string
    description: string
    productId: string
    halfYearId: string
    yearId: string
    abs: number
    price: number | null
    contractProp: string
    contractComment: string
    type: 'free' | 'paid'

}

export type LegalTechType = {
    number: number
    name: string
    fullName: string
    shortName: string
    title: string
    description: string
    weight: 1 | 2 | 5 | 10
    productId?: number | null
    halfYear?: number | null
    year?: number | null
    msk?: number | null
    regions?: number | null
    type: 'package' | 'lt'
}

export enum LegalTechFilterEnum {
    Packages = 'Packages',
    Services = 'Services'
}

export type ContractType = {
    number: number
    aprilName: ContractAprilNameEnum

    fieldsNumber: number
    bitrixName: string
    ItemId: number
    measureId: number
    measureNumber: number
    mesureFullName: string
    mesureName: string
    prepayment: number
    discount: number

}

export enum ContractAprilNameEnum {
    Internet = 'Internet',
    Service = 'Договор услуг',
    AbonHalf = 'Абонентский полгода',
    AbonYear = 'Абонентский год',
    licenseHalf = 'Лицензионный полгода',
    licenseYear = ' Лицензионный год'
}