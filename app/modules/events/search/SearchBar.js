import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {setWords} from './search.actions';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        const searchWords = this.props.searchWords.length > 0 ?
            this._arrayToString(this.props.searchWords) :
            '';
        this.state = {
            searchWords,
        };
    }

    componentWillReceiveProps({searchWords}) {
        this.setState({
            searchWords: this._arrayToString(searchWords),
        });
    }

    render() {
        return (
            <View style={[styles.mainContainer, this.props.style]}>
                <TextInput
                    style={styles.input}
                    placeholder="Rechercher ..."
                    placeholderTextColor={'#FFFFFF'}
                    selectionColor={'#FFFFFF'}
                    onChangeText={this.props.setWords}
                    value={this.state.searchWords}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    returnKeyType="search"
                />
            </View>
        );
    }

    _arrayToString(array) {
        return array.join(' ');
    }
}

SearchBar.propTypes = {
    setWords: PropTypes.func.isRequired,
};

const mapStateToProps = ({searchWords}, ownProps) => ({
    searchWords,
    ...ownProps
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            setWords,
        },
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchBar);

const styles = StyleSheet.create({
    mainContainer: {
        height: 60,
    },
    input: {
        flex: 1,
        fontSize: 13,
        backgroundColor: 'transparent',
        textAlign: 'center',
        padding: 0,
        color: '#FFFFFF',
    },
});