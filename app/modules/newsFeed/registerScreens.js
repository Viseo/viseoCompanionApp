import { Navigation } from 'react-native-navigation';
import NewsFeed from "./NewsFeed";

export default function(store, provider) {
    Navigation.registerComponent('NewsFeed', () => NewsFeed, store, provider);
}