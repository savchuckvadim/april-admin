import { connect } from "react-redux"
import ClientTemplate from "./ClientTemplate"
import { uploadClientTemplate } from "../../../redux/reducers/client/client-reducer"







const mapStateToProps = (state) => {

    return {
        isInit: state.app.initialized

    }
}


export default connect(mapStateToProps, {
    uploadClientTemplate

})(ClientTemplate)