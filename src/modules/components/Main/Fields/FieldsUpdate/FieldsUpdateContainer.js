import { connect } from "react-redux";

import { updateFields } from "../../../../redux/reducers/field/field-reducer";
import UploadData from "../../../Elements/Actions/Upload/UploadData";




export default connect(null,{
    upload: updateFields
})(UploadData)