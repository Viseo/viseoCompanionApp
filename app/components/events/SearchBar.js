/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import FilterToggle from './../../containers/FilterToggle'
import SearchInput from './../../containers/SearchInput'
import VisibilityToggle from './../../containers/VisibilityToggle'
import Toggle from './../Toggle'

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterBarVisible: false
        }
    }

    toggleFilterBar = (isOn) => {
        this.setState({
            filterBarVisible: isOn
        })
    }

    render() {
        return (
            <View
                style={[
                    styles.searchBar,
                    this.props.style
                ]}
            >
                {this.renderSearchBar()}
                {this.state.filterBarVisible && this.renderFilterBar()}
            </View>
        );
    }

    renderSearchBar() {
        return (
            <View style={styles.searchBarInput}>
                <SearchInput
                    style={styles.searchInput}
                    placeholder="Rechercher.."
                />
                {this.renderFilterToggle()}
            </View>
        )
    }

    renderFilterBar() {
        return (
            <View style={styles.filterContainer}>
                <VisibilityToggle
                    filter={'SHOW_GOING'}
                    selectedColor="blue"
                    text={"Show my events"}
                />
                <FilterToggle
                    filter={{category:0}}
                    selectedColor="red"
                    text={"Show important events"}
                />
                <FilterToggle
                    filter={{category:1}}
                    selectedColor="orange"
                    text={"Show informative events"}
                />
                <FilterToggle
                    filter={{category:2}}
                    selectedColor="green"
                    text={"Show entertaining events"}
                />
            </View>
        )
    }

    renderFilterToggle() {
        return (
            <Toggle
                style={styles.filterToggle}
                onToggle={this.toggleFilterBar}
                on={
                    <Image
                        source={require('./../../images/upArrow.png')}
                        resizeMode="contain"
                        style={styles.fitImage}
                    />
                }
                off={
                    <Image
                        source={require('./../../images/filter.png')}
                        resizeMode='contain'
                        style={styles.fitImage}
                    />
                }
            />
        )
    }
}

export default SearchBar;

var styles = StyleSheet.create({
    searchBar: {
        flex: 0,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 4,
    },
    searchBarInput: {
        flex: 0,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 8,
        backgroundColor: 'transparent',
    },
    filterToggle: {
        padding: 8
    },
    filterContainer: {
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'center',
        borderTopWidth: 0.5,
        borderColor: 'lightgray',
    },
    fitImage: {
        flex: 1,
        width: null,
        height: null
    }
});
