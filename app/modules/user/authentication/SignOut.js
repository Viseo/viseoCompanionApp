import React, {Component} from 'react';
import {Button, Dimensions, StyleSheet, View} from 'react-native';
import AppText from '../../global/components/AppText';
import {Navigation} from 'react-native-navigation';
import colors from '../../global/colors';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signOut} from './authentication.actions';
import {startAppLoader} from '../../global/navigationLoader';

class SignOut extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps({isAuthenticated}) {
        if (!isAuthenticated) {
            startAppLoader();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8}}>
                    <AppText style={styles.title}>{'Déconnexion'}</AppText>
                    <AppText style={styles.content}>{'Etes-vous sûr de vouloir vous déconnecter?'}</AppText>
                </View>
                <View style={styles.buttonBar}>
                    <Button
                        style={styles.button}
                        title={'Annuler'}
                        onPress={() => this._goBack()}
                        color={colors.lightGray}
                    />
                    <Button
                        style={styles.button}
                        title={'Confirmer'}
                        onPress={() => this.props.signOut()}
                        color={colors.blue}
                    />
                </View>
            </View>
        );
    }

    _goBack() {
        Navigation.dismissLightBox();
    }
}

const mapStateToProps = ({authentication}, ownProps) => ({
    isAuthenticated: authentication.isAuthenticated,
    ...ownProps
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signOut,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignOut);

const styles = StyleSheet.create({
    button: {
        flex: 1,
    },
    buttonBar: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    container: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.3,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
    },
    content: {
        marginTop: 8,
        textAlign: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
    },
});