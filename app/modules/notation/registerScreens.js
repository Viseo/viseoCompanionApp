/**
 * Created by HEL3666 on 15/06/2017.
 */
import { Navigation } from 'react-native-navigation';
import NotationVote from "./NotationVote";

export default function(store, provider) {
    Navigation.registerComponent('notation.NotationVote', () => NotationVote, store, provider);
}