import React, {Component} from 'react';
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
                sendComment={(comment) => this._sendComment(comment)}
            />
        );
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

    _renderThanksAfterCommentingPage() {
        return (
            <Thanks
                textContent="Merci pour vos remarques !"
                emotion="done"
            />
        );
    }

    _renderThanksAfterLeavingAGoodRatingPage() {
        return (
            <Thanks
                textContent="Merci de nous aider à nous améliorer !"
                emotion="happy"
            />
        );
    }

    async _sendComment(comment) {
        // todo send comment to server (with no hardcoded values)
        this.setState({currentPage: 'thanksAfterCommenting'});
    }

    async _sendReview(rating) {
        // todo send review to server (with no hardcoded values)
        // const review = {
        //     userId: '1',
        //     eventId: '2',
        //     rating,
        //     avis: '',
        // };
        // await db.sendReview(review);
        const nextPage = rating > 50 ? 'thanksAfterLeavingAGoodRating' : 'comment';
        this.setState({currentPage: nextPage});
    }
}

// todo set propTypes