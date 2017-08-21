import React, {Component} from 'react';
import {Platform, View} from 'react-native';
import colors from '../global/colors';
import Highlighter from 'react-native-highlight-words';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AppText from '../global/components/AppText';
import moment from 'moment';

class ActionCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row', height: 100, borderWidth: 5, borderColor: '#000000'}}>
                {this._renderDate()}
                <View style={{flex: 2, flexDirection: 'row', height: 100}}>
                    <View style={{
                        flex: .2, alignSelf: 'stretch',
                        marginRight: 10,
                        //backgroundColor: getCategoryColor(this.props.event.category),
                    }}
                    />
                    <View style={{flex: 8, flexDirection: 'column', marginTop: 5}}>
                        <View style={{flex: 1}}>
                            <View>
                                <Highlighter
                                    numberOfLines={1}
                                    highlightStyle={{backgroundColor: colors.highlight}}
                                    style={{
                                        paddingRight: 10,
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
                                    }}
                                    searchWords={this.props.searchWords}
                                    textToHighlight={'Titre de l\'event' || ''}
                                />
                            </View>
                        </View>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View>
                                    <Highlighter
                                        numberOfLines={2}
                                        highlightStyle={{backgroundColor: colors.highlight}}
                                        style={{
                                            color: colors.mediumGray,
                                            fontWeight: '200',
                                            fontSize: 16,
                                            fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
                                        }}
                                        searchWords={this.props.searchWords}
                                        textToHighlight={'lieu' || ''}
                                    />
                                </View>
                                <View>
                                    <AppText style={{color: colors.mediumGray, fontSize: 13, marginTop: 2,}}>
                                        {'prenom'} {'nom'}
                                    </AppText>
                                </View>
                            </View>
                            <View style={{flex: .5, justifyContent: 'center', alignItems: 'center'}}>
                                <View style={[
                                    {width: 20, height: 20, borderRadius: 20},
                                ]}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    _renderDate() {
        const date = moment().format('DD MMM HH:mm');
        let splitDate = date.split(' ');
        let [day, month, time] = splitDate;

        return (
            <View>
                <View>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        searchWords={this.props.searchWords}
                        textToHighlight={day}
                    />
                </View>
                <View>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        searchWords={this.props.searchWords}
                        textToHighlight={month}
                    />
                </View>
                <View>
                    <Highlighter
                        numberOfLines={1}
                        highlightStyle={styles.highlightStyle}
                        searchWords={this.props.searchWords}
                        textToHighlight={time}
                    />
                </View>

            </View>
        );
    }

}

ActionCard.propTypes = {};

const mapStateToProps = ({events, user, searchWords}, ownProps) => ({
    event: events.items.find(event => parseInt(event.id) === ownProps.eventId),
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