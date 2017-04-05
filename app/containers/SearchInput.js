/**
 * Created by AAB3605 on 05/04/2017.
 */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setWords} from '../actionCreators/searchWords'
import Input from './../components/events/Input'

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onChangeText: setWords
        },
        dispatch
    )
}

const SearchInput = connect(
    mapStateToProps,
    mapDispatchToProps
)(Input)

export default SearchInput