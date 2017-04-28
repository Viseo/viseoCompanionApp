/**
 * Created by AAB3605 on 15/03/2017.
 */
import React, {Component} from "react";
import {View, StyleSheet, Image} from "react-native";
import FilterToggle from "../containers/FilterToggle";
import SearchInput from "../containers/SearchInput";
import VisibilityToggle from "../containers/VisibilityToggle";
import Toggle from "./Toggle";
import colors from "./colors";

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
                    placeholder="Rechercher..."
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
                    selectedColor={colors.blue}
                    text={"J'y vais"}
                />
                <FilterToggle
                    filter={{category:0}}
                    selectedColor={colors.red}
                    text={"important"}
                />
                <FilterToggle
                    filter={{category:1}}
                    selectedColor={colors.orange}
                    text={"informatif"}
                />
                <FilterToggle
                    filter={{category:2}}
                    selectedColor={colors.green}
                    text={"divers"}
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
                        source={require('./../images/upArrow.png')}
                        resizeMode="contain"
                        style={styles.fitImage}
                    />
                }
                off={
                    <Image
                        source={require('./../images/filter.png')}
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
        borderWidth:1.75,
        borderColor:'white'
    },
    searchBarInput: {
        flex: 0,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 9,
        backgroundColor: 'transparent',
    },
    filterToggle: {
        padding: 3
    },
    filterContainer: {
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'center',
    },
    fitImage: {
        flex: 0,
        width: 20,
        height: 20
    }
});
