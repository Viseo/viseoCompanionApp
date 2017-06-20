import {Navigation} from "react-native-navigation";
import NotationVote from "./NotationVote";
import NotationRemark from "./NotationRemark";
import NotationThanks from "./NotationThanks";

export default function (store, provider) {
    Navigation.registerComponent("notation.NotationVote", () => NotationVote, store, provider);
    Navigation.registerComponent("notation.NotationRemark", () => NotationRemark, store, provider);
    Navigation.registerComponent("notation.NotationThanks", () => NotationThanks, store, provider);
};