import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import AppText from '../global/components/AppText';
import colors from '../global/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {defaultNavBarStyle} from '../global/navigatorStyle';

class ActionCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flexDirection: 'column',
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 15,
                backgroundColor: colors.white,
            }}>
                { /*{this. _renderActionEdit()}*/}
                <AppText
                    style={{alignSelf: 'center', color: colors.red, fontSize: 15, marginTop: 10, marginBottom: 10}}>
                    {this.props.item.action.name}
                </AppText>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <AppText style={{
                        flex: 0.5,
                        marginTop: 5,
                        marginBottom: 5,
                        fontSize: 12,
                        textAlign: 'left',
                        marginLeft: 20,
                    }}>
                        {this.props.item.etat}
                    </AppText>
                    <AppText style={{
                        flex: 0.5,
                        marginTop: 5,
                        marginBottom: 5,
                        fontSize: 12,
                        textAlign: 'left',
                        marginLeft: 38,
                        marginRight: 20,
                    }}>
                        {this.props.item.address}
                    </AppText>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Icon name="play-circle-o" style={{flex: 1, alignSelf: 'center', marginLeft: 20}}/>
                        <AppText
                            style={{
                                flex: 15,
                                fontWeight: 'bold',
                                marginTop: 5,
                                marginBottom: 5,
                                fontSize: 12,
                                textAlign: 'center',
                            }}>
                            {this.props.item.dateStart}
                        </AppText>
                    </View>
                    <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Icon name="stop-circle-o" style={{flex: 1, alignSelf: 'center', marginLeft: 20}}/>
                        <AppText
                            style={{
                                flex: 15,
                                fontWeight: 'bold',
                                marginTop: 5,
                                marginBottom: 5,
                                fontSize: 12,
                                textAlign: 'center',
                            }}>
                            {this.props.item.dateEnd}
                        </AppText>

                    </View>

                </View>
                <View style={{
                    flex: 0.5,
                    backgroundColor: colors.red,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <Icon.Button
                    style={[styles.icon, {
                        paddingRight: 80
                    }]}
                    name="edit"
                    size={40}
                    color={colors.white}
                    onPress={() => {
                        this.props.navigator.push({
                            screen: 'actions.CreateAction',
                            title: 'Ajouter une action',
                            navigatorStyle: defaultNavBarStyle,
                            passProps: {
                                actionId: this.props.item.id,
                                userId: this.props.userId,
                                refresh: this.props.refresh,
                            },

                        });
                    }}
                />
                <Icon.Button
                    name="trash"
                    style={[styles.icon, {
                        paddingLeft: 80
                    }]}
                    size={40}
                    color={colors.white}
                />
                </View>
            </View>
        );
    }

    /*_renderActionEdit() {
        const deleteButton = canEdit ? this._renderDelete() : null;
        const canEdit = this.props.actionId.userId === this.props.item.id.userId;
        const editButton = canEdit ? this._renderEdit() : null;

        return (

            <View style={{
                flex: 0.5,
                backgroundColor: colors.red,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {editButton}
                {deleteButton}
            </View>
        );
    }
    _renderEdit() {
        const reply = (

            <Icon.Button
                style={[styles.icon, {
                    paddingRight: 80
                }]}
                name="edit"
                size={40}
                color={colors.white}
                onPress={() => {
                    this.props.navigator.push({
                        screen: 'actions.CreateAction',
                        title: 'Ajouter une action',
                        navigatorStyle: defaultNavBarStyle,
                        passProps: {
                            actionId: this.props.item.id,
                            userId: this.props.userId,
                            refresh: this.props.refresh,
                        },

                    });
                }}
            />
        );
        return (

            <View style={{
                flex: 0.5,
                backgroundColor: colors.red,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {reply}
            </View>

        );
    }
    _renderDelete() {
        const deleteAction = (
            <Icon.Button
                name="trash"
                style={[styles.icon, {
                    paddingLeft: 80
                }]}
                size={40}
                color={colors.white}
            />
        );
        return (
            <View style={{
                flex: 0.5,
                backgroundColor: colors.red,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {deleteAction}
            </View>
        );
    }*/

}

ActionCard.propTypes = {};

const mapStateToProps = ({actions, user, searchWords}, ownProps) => ({
    action: actions.items.find(action => parseInt(action.id) === ownProps.actionId),
    searchWords,
    user,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActionCard);


const styles = StyleSheet.create({

    icon: {
        backgroundColor: colors.red,
        fontWeight: 'bold',
        flex: 15,
        textAlign: 'center',

    },
});