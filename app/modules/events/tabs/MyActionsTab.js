import React, {Component} from 'react';
import {Dimensions, FlatList, RefreshControl, View} from 'react-native';
import AppText from '../../global/components/AppText';
import ActionCard from '../../actions/ActionCard';
import {noActionsForThisCategory} from './util';
import colors from '../../global/colors';


const deviceHeight = Dimensions.get('window').height;

export default class MyActionsTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
        console.disableYellowBox = true;
    }

    render() {
        return (
            <View style={{backgroundColor: colors.lighterBlue, height: deviceHeight}}>
                <View style={{marginTop: 15}}/>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    data={this.props.actions}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({item}) => this._renderActionCard(item)}
                />
            </View>
        );
    }

    _renderActionCard(item) {
        if (item === noActionsForThisCategory) {
            return (
                <View style={{
                    height: 40,
                    marginLeft: 20,
                    marginRight: 20,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <AppText>Aucune action.</AppText>
                </View>
            );
        } else {
            return (
                <ActionCard item={item} navigator={this.props.navigator}/>
            );
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.props.refresh().then(() => {
            this.setState({refreshing: false});
        });
    }
}

MyActionsTab.propTypes = {};

