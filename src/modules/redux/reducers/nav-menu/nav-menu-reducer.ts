

let initialState = [
    // {
    //     name: 'Profile',
    //     link: 'profile',

    // },
    // {
    //     name: 'Messages',
    //     link: 'messages',

    // },
    {
        name: 'Managers',
        link: 'managers',
    },
    {
        name: 'Settings',
        link: 'settings',

    },
    {
        name: 'Clients',
        link: 'clients',
    },
    {
        name: 'Fields',
        link: 'fields',
    },
    {
        name: 'Complects',
        link: 'complects',
    },
    {
        name: 'Supplies',
        link: 'supplies',
    },
    {
        name: 'Products',
        link: 'products',

    },
    {
        name: 'Regions',
        link: 'regions',
    },
    {
        name: 'Prices',
        link: 'prices',
    },
    {
        name: 'Contracts',
        link: 'contracts',

    },
    {
        name: 'Consalting',
        link: 'consalting',

    },
    {
        name: 'Legal Tech',
        link: 'legaltech',

    },
    {
        name: 'Info Groups',
        link: 'infogroups',

    },
    {
        name: 'Info Blocks',
        link: 'infoblocks',

    },
    {
        name: 'Providers',
        link: 'providers',

    },
    {
        name: 'Template',
        link: 'template',

    },
    {
        name: 'Templates',
        link: 'templates',

    },
    {
        name: 'Tfields',
        link: 'tfields',

    }, 
    // {
    //     name: 'Fitems',
    //     link: 'fitems',

    // },

    {
        name: 'PriceRowCells',
        link: 'pricerowcells',

    },
    {
        name: 'Rq',
        link: 'rqs',

    },


]


export type NavMenuStateType = typeof initialState

const navMenuReducer = (state: NavMenuStateType = initialState, action: any): NavMenuStateType => {
    return state
}

export default navMenuReducer