import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import {connect} from "react-redux";
import ChatInput from "./components/ChatInput";
import ChatView from "./ChatView";

class LiveEvent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 10}}>
                    <ChatView/>
                </View>
                <ChatInput navigator={this.props.navigator}/>
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
)(LiveEvent);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    chatView: {
        flex: 10,
    },
});