import { connect } from "react-redux"
import RegionsSelect from "./RegionsSelect"
import { getRegions } from "../../../../../../redux/reducers/region/region-reducer"
import {useEffect}  from 'react';

const mapStateToProps = (state) => {

    return {
        regions: state.region.regions
    }
}

const RegionsSelectContainer = ({regions, getRegions}) => {
    debugger
    useEffect(() => {
        regions.length < 1 && getRegions()
    }, [])


    return (
        <RegionsSelect regions={regions} />
    )
}

export default connect(mapStateToProps, {getRegions})(RegionsSelectContainer)