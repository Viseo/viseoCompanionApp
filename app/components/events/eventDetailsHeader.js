/**
 * Created by VBO3596 on 22/03/2017.
 */
import React, {Component} from "react";
import {View, TouchableOpacity, StyleSheet, Image, Dimensions} from "react-native";
import categories from "../../util/eventCategories";
import AppText from "../appText";

let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

class EventDetailsHeader extends Component {

    static defaultProps = {
        userName: 'Al Inclusive',
    }

    constructor(props) {
        super(props);
        this.state = {
            categoryName: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderOrganizatorPicture()}
                {this.renderEventInfos()}
            </View>
        )
    }

    renderOrganizatorPicture() {
        return (
            <TouchableOpacity style={styles.userPictureContainer}>
                <Image source={require('./../../images/userAvatar.jpg')} style={styles.circle}/>
            </TouchableOpacity>
        );
    }

    renderEventInfos() {
        return (
            <View style={styles.contentContainer}>
                {this.renderTitle()}
                {this.renderCategory()}
                {this.renderUserName()}
                {this.renderLocation()}
            </View>
        );
    }

    renderTitle() {
        return (
            <AppText style={styles.title}>
                {this.props.event.name}
            </AppText>
        );
    }

    renderCategory() {
        let categoryName = categories.eventCategories[this.props.event.category];
        let categoryColor =  categories.eventCategoriesColors[categoryName];
        return (
            <AppText style={[styles.category, {color: categoryColor}]}>
                {categoryName}
            </AppText>
        );
    }

    renderUserName(){
        return(
            <View style={styles.headerInfoItem}>
                <Image source={require('./../../images/user.png')}/>
                <AppText style={{margin: 5}}>
                    {this.props.userName}
                </AppText>
            </View>
            );
    }

    renderLocation(){
        return(
            <View style={styles.headerInfoItem}>
                <Image source={require('./../../images/place.png')}/>
                <AppText style={{margin: 5}}>
                    {this.props.event.location}
                </AppText>
        </View>
        );
    }
}

export default EventDetailsHeader;

const styles = StyleSheet.create({
    container: {
        height: deviceHeight * 0.25,
        width: deviceWidth,
        flexDirection: 'row'
    },

    userPictureContainer: {
        height: deviceHeight * 0.25,
        width: deviceWidth * 0.25,
    },

    circle: {
        height: 90,
        width: 90,
        borderRadius: 45,
        margin: deviceWidth * 0.01
    },

    contentContainer: {
        height: deviceHeight * 0.25,
        width: deviceWidth * 0.75,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    title: {
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        fontSize: 22
    },

    category: {
        textAlign: 'left',
    },

    headerInfoItem: {
        flexDirection: 'row',
    }
});