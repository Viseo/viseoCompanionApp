import React, {Component} from 'react';
import Rating from './Rating';
import Comment from './Comment';
import Thanks from './Thanks';
import {dismissLightBox} from '../../global/navigationUtil';
import * as db from '../../global/db';

export default class ReviewPopup extends Component {

    state = {
        currentPage: 'rating',
        rating: null,
        comment: '',
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
            case 'thanksAfterCommenting':
                return this._renderThanksAfterCommentingPage();
            case 'thanksAfterLeavingAGoodRating':
                return this._renderThanksAfterLeavingAGoodRatingPage();
            default:
                break;
        }
        return null;
    }

    _renderCommentPage() {
        return (
            <Comment
                sendComment={(comment) => this._setComment(comment)}
            />
        );
    }

    _renderRatingPage() {
        return (
            <Rating
                date={this.props.date}
                eventName={this.props.eventName}
                location={this.props.location}
                sendReview={(rating) => this._setRating(rating)}
            />
        );
    }

    _renderThanksAfterCommentingPage() {
        return (
            <Thanks
                textContent="Merci pour vos remarques !"
                emotion="done"
                onOk={() => this._sendReview()}
            />
        );
    }

    _renderThanksAfterLeavingAGoodRatingPage() {
        return (
            <Thanks
                textContent="Merci de nous aider à nous améliorer !"
                emotion="happy"
                onOk={() => this._sendReview()}
            />
        );
    }

    async _sendReview() {
        ///  todo send review to server (with no hardcoded values)
        const review = {
            eventId:this.props.eventId,
            userId:this.props.userId,
            rating: this.state.rating,
            comment: this.state.comment,
        };

        await db.events.sendReview(review);
        dismissLightBox();
    }

    async _setComment(comment) {
        this.setState({
            currentPage: 'thanksAfterCommenting',
            comment,
        });
        const review = {
            eventId:this.props.eventId,
            userId:this.props.userId,
            rating: this.state.rating,
            comment: this.state.comment,
        };
        await db.events.updateReview(review);
    }

    _setRating(rating) {
        const nextPage = rating > 50 ? 'thanksAfterLeavingAGoodRating' : 'comment';
        this.setState({
            currentPage: nextPage,
            rating,
        });
    }
};

// todo set propTypes