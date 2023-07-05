import { useEffect } from "react"
import { connect } from "react-redux"
import Price from "./Price"
import { setFilter, updatePrices, getPrices } from "../../../redux/reducers/price/price-reducer"



const mapStateToProps = (state, ownProps) => {
    debugger
    return {
        prices: state.price.filtred,
        filters: state.price.filter.filters,
        filterCurrent: state.price.filter.index,
        isClient: ownProps.isClient
    }
}



const PriceContainer = ({isClient, prices, filters, filterCurrent, getPrices, updatePrices, setFilter }) => {


    useEffect(() => {
        if (!prices.length > 0) {
            getPrices()
        }
    }, [])

    return <Price
        isClient={isClient}
        prices={prices}
        filters={filters}
        filterCurrent={filterCurrent}
        updatePrices={updatePrices}
        setFilter={setFilter}
    />

}



export default connect(mapStateToProps, {
    getPrices,
    updatePrices,
    setFilter
})(PriceContainer)