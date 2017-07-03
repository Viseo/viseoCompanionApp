import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import colors from '../global/colors';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWords: '',
        };
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Rechercher ..."
                    onChangeText={this.props.setWords}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    returnKeyType="search"
                />
            </View>
        );
    }
}

SearchBar.propTypes = {
    setWords: PropTypes.func.isRequired,
};

const setWords = (searchString = []) => ({
    type: 'SET_WORDS',
    searchWords: searchString.length > 0 ?
        searchString
            .trim()
            .replace(/\s+/g, ' ')
            .split(' ')
        : [],
});

const mapStateToProps = (state, ownProps) => ({
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
        backgroundColor: colors.lightBlue,
        height: 60,
    },
    input: {
        flex: 1,
        fontSize: 13,
        backgroundColor: 'transparent',
        textAlign: 'center',
        padding: 0,
    },
});

SearchBar.navigatorButtons = {
    leftButtons: [
        {
            icon: require('../../images/navigation/add.png'),
            id: 'addEvent',
        },
    ]
};