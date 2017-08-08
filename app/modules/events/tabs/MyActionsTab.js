import React, {Component} from 'react';
import {SectionList, View} from 'react-native';
import PropTypes from 'prop-types';
import AppText from '../../global/components/AppText';
import ActionCard from '../../actions/ActionCard';
import {noActionsForThisCategory} from './util';

export default class MyActionsTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ActionCard/>
            </View>
        );
    }

    _renderSectionList() {
        return (
            <SectionList
                renderItem={({item}) => this._renderActionCard(item)}
                renderSectionHeader={({section}) => null}
                keyExtractor={(item, index) => item.id}
                sections={this.props.actions}
            />
        );
    }

    _renderActionCard(item) {
        if (item === noActionsForThisCategory) {
            return (
                <View>
                    <AppText>Aucune action.</AppText>
                </View>
            );
        } else {
            return (
                <ActionCard
                    actionId={item.id}
                    navigator={this.props.navigator}
                />
            );
        }
    }
}

MyActionsTab.propTypes = {
    actions: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};