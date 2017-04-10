/**
 * Created by AAB3605 on 05/04/2017.
 */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setWords} from '../actionCreators/searchWords'
import SearchTextInput from './../components/events/SearchTextInput'

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
)(SearchTextInput)

export default SearchInput