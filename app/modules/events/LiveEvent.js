import React, {Component} from 'react';
import {View} from "react-native";
import {connect} from "react-redux";
import AppText from "../global/AppText";

class LiveEvent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <AppText>Live view</AppText>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    }
};

export default connect(
    mapStateToProps
) (LiveEvent);
