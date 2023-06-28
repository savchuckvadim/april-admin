const initialState = {
    coefficients: [1.25, 1.5, 2, 3, 4, 5, 6, 7],
    prof: {
        msk: {
            internet: [],
            proxima: []
        },
        regions: {
            internet: [],
            proxima: []
        }
    },
    universal: [
        { id: 0, name: 'Классик', abs: 2, weight: 1 }
    ],


    prof: {
        abon: [],
        abonBig: [],
        internet: [],
        proxima: [],
    },

    universal: {
        internet: [],
        proxima: [],
    }

}









const price = (state = initialState, action) => {

    return state
}

export default price