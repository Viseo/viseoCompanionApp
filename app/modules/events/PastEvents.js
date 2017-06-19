import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import ItemSpacer from '../global/components/ItemSpacer';
import SearchBar from '../../components/SearchBar';
import colors from '../global/colors';
import {bindActionCreators} from 'redux';
import {setVisibilityFilter} from '../../actionCreators/visibilityFilter';
import VisibleEventListExp from '../../containers/VisibleEventsExp';

class PastEvents extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.body}>
                    <View style={styles.searchBar}>
                        <ItemSpacer/>
                        <SearchBar style={{flex: 22}}/>
                        <ItemSpacer/>
                    </View>
                </View>
                <VisibleEventListExp style={{flex: 22}} navigator={this.props.navigator}/>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setVisibilityFilter,
    }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps,
)(PastEvents);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.blue,
        padding: 8,
        paddingBottom: 0,
        paddingTop: 0,
    },
    body: {
        flex: 0,
        flexDirection: 'column',
        paddingBottom: 10,
        marginTop: 20,
    },
    searchBar: {
        flex: 0,
        flexDirection: 'row',
    },
    icon: {
        fontSize: 24,
        height: 22,
        color: 'white',
    },
});