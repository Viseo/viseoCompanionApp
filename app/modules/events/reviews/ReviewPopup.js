import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Button} from 'react-native';
import AppText from '../../global/components/AppText';
import {Navigation} from 'react-native-navigation';
import colors from '../../global/colors';
import Rating from './Rating';
import Comment from './Comment';
import Thanks from './Thanks';

export default class ReviewPopup extends Component {

    state = {
        currentPage: 'rating',
    };

    constructor(props) {
        super(props);
    }

    render() {
        switch (this.state.currentPage) {
            case 'rating':
                return this._renderRatingPage();
            case 'comment':
                return this._renderCommentPage();
            case 'thanks':
                return this._renderThanksPage();
            default:
                break;
        }
        return null;
    }

    _renderRatingPage() {
        return (
            <Rating
                date={this.props.date}
                eventName={this.props.eventName}
                location={this.props.location}
                sendReview={(rating) => this._sendReview(rating)}
            />
        );
    }

    async _sendComment(comment) {
        this.setState({currentPage: 'thanks'});
    }

    async _sendReview(rating) {
        const review = {
            userId: '1',
            eventId: '2',
            rating,
            avis: '',
        };
        // const updatedNotation = await db.sendNotation(review);
        this.setState({currentPage: 'comment'});
        // this.props.navigator.showLightBox({
        //     screen: 'notation.NotationRemark',
        //     title: 'Avis',
        //     animationType: 'slide-up',
        //     passProps: {
        //         notation: updatedNotation,
        //         onRemarkSent: () => this._onRemarkSent(),
        //     },
        // });
    }

    _renderCommentPage() {
        return (
            <Comment
                sendComment={(comment) => this._sendComment(comment)}
            />
        );
    }

    _renderThanksPage() {
        return (
            <Thanks
                textContent="Merci de nous aider à nous améliorer !"
                emotion="happy"
            />
        );
    }
}

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