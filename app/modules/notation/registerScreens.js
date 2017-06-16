
import { Navigation } from 'react-native-navigation';
import NotationVote from "./NotationVote";
import NotationReview from './NotationReview';
import NotationThanks from './NotationThanks';

export default function(store, provider) {
    Navigation.registerComponent('notation.NotationVote', () => NotationVote, store, provider);
    Navigation.registerComponent('notation.NotationThanks', () => NotationThanks, store, provider);
    Navigation.registerComponent('notation.NotationReview', () => NotationReview, store, provider);
}