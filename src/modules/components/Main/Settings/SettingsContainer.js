import { connect } from "react-redux"
import { settingAction } from "../../../redux/reducers/settings/settings"
import Settings from "./Settings"


const mapStateToProps = (state) => {

    return {
        settings: state.settings
    }
}



export default connect(mapStateToProps, {
    settingAction
})(Settings)