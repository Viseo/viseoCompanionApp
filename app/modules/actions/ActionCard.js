import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import AppText from '../global/components/AppText';
import colors from '../global/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

class ActionCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'column', marginLeft: 15, marginRight: 15, backgroundColor: colors.lightGray}}>
                <AppText
                    style={{alignSelf: 'center', color: colors.red, fontSize: 15, marginTop: 10, marginBottom: 10}}>
                    J'ai une idée et je souhaite lancer un projet participatif
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
                        Brouillon
                    </AppText>
                    <AppText style={{
                        flex: 0.5,
                        marginTop: 5,
                        marginBottom: 5,
                        fontSize: 12,
                        textAlign: 'right',
                        marginRight: 20,
                    }}>
                        Boulogne-Billancourt
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
                            08-08-2017 15:45
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
                            19-08-2017 10:00
                        </AppText>
                    </View>
                </View>
            </View>
        );
    }
}

ActionCard.propTypes = {
    actionId: PropTypes.number.isRequired,
    action: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
};

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