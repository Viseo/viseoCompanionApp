import {IS_REVIEW_POPUP_DISMISSED} from "./review.action";
export default (state = [], action) => {
    switch (action.type) {
        case IS_REVIEW_POPUP_DISMISSED:
            return {
                ...state,
                isReviewPopupDismissed: true,
            };
        default:
            return state;
    }
};
