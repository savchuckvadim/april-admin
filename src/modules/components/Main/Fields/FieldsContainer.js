import { connect } from "react-redux";
import { getFields, setFilter, updateField, updateFields } from "../../../redux/reducers/field/field-reducer";
import Fields from "./Fields";


const mapStateToProps = (state) => {

    return {
        fields: state.field.filtredFields,
        filters: state.field.filter.filters,
        filterCurrent: state.field.filter.index,
    }

}







export default connect(mapStateToProps, {
    getFields,
    setFilter,
    updateField,
    upload: updateFields
})(Fields)