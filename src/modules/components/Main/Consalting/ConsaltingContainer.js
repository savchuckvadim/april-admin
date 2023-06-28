import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getConsalting, updateConsalting } from "../../../redux/reducers/consalting/consalting-reducer"
import Consalting from "./Consalting"


const mapStateToProps = (state) => {

    return {
        consalting: state.consalting.consalting
    }
}



const ConsaltingContainer = (props) => {
    let consalting = props.consalting
    useEffect(() => {
        
        if (!props.consalting.length > 0) {
            
            props.getConsalting()
        }

    }, [])


    return (
        props.consalting
            ? <Consalting  consalting={consalting} updateConsalting={props.updateConsalting} />
            : <p>There are no consalting</p>
    )
}


export default connect(mapStateToProps, {
    getConsalting,
    updateConsalting
})(ConsaltingContainer)