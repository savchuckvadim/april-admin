import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import Products from "./Products"
import { generateProducts, getProducts, updateProducts } from "../../../redux/reducers/product/product-reducer"
import { Button } from "@mui/material"


const mapStateToProps = (state) => {

    return {
        products: state.product.products.filtred,
        // consalting: state.product.consalting,
        // legalTech: state.product.legalTech
    }
}

const ProductsContainer = (props) => {

    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        if (!props.products) {
            if (!isFetched) {
                setIsFetched(true)
            }
            props.getProducts()
        }

    }, [])

    

    return (!isFetched && !props.products ? <div>Loading...</div>
        : props.products
            ? <Products products={props.products} updateProducts={props.updateProducts} />
            : <Button onClick={props.generateProducts}>Generate Products !</Button>
    )
}


export default connect(mapStateToProps, {
    getProducts,
    generateProducts,
    updateProducts
})(ProductsContainer)