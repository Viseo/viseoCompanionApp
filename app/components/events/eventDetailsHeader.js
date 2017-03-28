/**
 * Created by VBO3596 on 22/03/2017.
 */
import React, {Component} from "react";
import {View, TouchableOpacity, StyleSheet, Image, Dimensions} from "react-native";
import categories from "../../util/eventCategories";
import AppText from "../appText";

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
            <View style={{flex:1, flexDirection:'row'}}>
                {this.renderOrganizatorPicture()}
                {this.renderEventInfos()}
            </View>
        )
    }

    renderOrganizatorPicture() {
        return (
            <View style={styles.organizatorPicture}>
                <TouchableOpacity>
                    <Image source={require('./../../images/userAvatar.jpg')} style={styles.circle}/>
                </TouchableOpacity>
            </View>
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
        let categoryColor = categories.eventCategoriesColors[categoryName];
        return (
            <AppText style={[styles.category, {color: categoryColor}]}>
                {categoryName}
            </AppText>
        );
    }

    renderUserName() {
        return (
            <View style={styles.headerInfoItem}>
                <Image source={require('./../../images/user.png')}/>
                <AppText style={{margin: 5}}>
                    {this.props.userName}
                </AppText>
            </View>
        );
    }

    renderLocation() {
        return (
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

    circle: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },

    organizatorPicture:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        paddingHorizontal:20,
        alignItems:'center',
    },

    contentContainer: {
        flex:3,
        paddingLeft:20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    title: {
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        fontSize: 22,
        flex:2
    },

    category: {
        textAlign: 'left',
        flex:3,
        justifyContent:'flex-start',
        paddingTop:5
    },

    headerInfoItem: {
        flex:2,
        flexDirection: 'row',
    }
});