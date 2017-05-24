/**
 * Created by MBE3664 on 24/04/2017.
 */
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {authenticate} from "./../actionCreators/user";
import Form from "./../components/signInForm";
import {rememberUser} from "../actionCreators/user";

const mapStateToProps = (state, ownProps) => ({
    email: state.user.email,
    password: state.user.password,
    authenticationStatus: state.user.authenticationStatus,
    ...ownProps
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            authenticate,
            rememberUser
        },
        dispatch
    )
}

const SignInForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)

export default SignInForm