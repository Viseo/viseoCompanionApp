import React, {Component} from "react";
import {Button, View, Dimensions} from "react-native";
import AppText from "../global/components/AppText";
import * as db from "../global/db";
import {connect} from 'react-redux';
import moment from "moment";
import {noActionsForThisCategory} from "../events/tabs/util";
import {fetchActions} from "./actions.actions";
import {bindActionCreators} from 'redux';
class DeleteAction extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#FFFFFF",
                padding: 10,
                width: Dimensions.get("window").width * 0.7,
                height: Dimensions.get("window").height * 0.2,
            }}>
                <View style={{flex: 1}}>
                    <AppText>Voulez-vous supprimer cette action ?
                      </AppText>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    height: 30,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <View style={{flex: .5, alignSelf: "center", marginRight: 5}}>
                        <Button onPress={() => {
                            db.actions.delete(this.props.actionId);
                            this.props.refresh();
                            this.props.navigator.dismissLightBox();
                        }}
                                title="Oui"/>
                    </View>
                    <View style={{flex: .5, alignSelf: "center"}}>
                        <Button onPress={() => {
                            this.props.navigator.dismissLightBox();
                        }}
                                title="Non"/>
                    </View>
                </View>
            </View>
        );
    }
};


DeleteAction.propTypes = {};

function filterActionsByUser(actions, userId) {
    let hostedActions = actions.myItems.filter((action) => {
        return action.user.id === userId;
    });
    if (hostedActions.length === 0) {
        hostedActions.push(noActionsForThisCategory);
    }
    return hostedActions.sort((action1, action2) => {
        return moment(action1.dateStart) - moment(action2.dateStart);
    });
}

const mapStateToProps = ({actions, user}, ownProps) => ({
    actions: filterActionsByUser(actions, user.id),
    user,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            refresh: fetchActions,
        },
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteAction);
