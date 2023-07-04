import { useEffect } from "react"
import { connect } from "react-redux"
import Price from "./Price"
import { setFilter, updatePrices, getPrices } from "../../../redux/reducers/price/price-reducer"



const mapStateToProps = (state) => {
debugger
    return {
        prices: state.price.filtred,
        filters: state.price.filter.filters ,
        filterCurrent: state.price.filter.index
    }
}



const PriceContainer = ({prices, filters, filterCurrent, getPrices, updatePrices, setFilter}) => {
 

    useEffect(() => {
        if(!prices.length > 0){
            getPrices()
        }
    }, [] )

    return <Price 
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