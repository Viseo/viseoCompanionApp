import  {AppRegistry, Text, View} from 'react-native';
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';
import  DropDown,{Select, Option, OptionList} from 'react-native-selectme';
import React, {Component} from 'react';
import colors from '../global/colors';

export default  class Action extends Component {
    constructor(props) {
        super(props);
       // this.props.navigator(this.bind(this));
        this.state = {
            actions: ''
        };
    }

    _getOptionList() {
        return this.refs['OPTIONLIST'];
    }


    _select(action) {

        this.setState({
            ...this.state,
            canada: action.id
        });
    }

    render() {

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:100 }} >

                <Select
                    width={400}
                    height={50}
                    ref="SELECT1"
                    optionListRef={this._getOptionList.bind(this)}
                    defaultValue="Choisir une action ..."
                    onSelect={(action) => this._select(action)}
                    >
                    <Option value = {{id : "alberta"}}>Alberta</Option>
                    <Option>British Columbia</Option>
                    <Option>Manitoba</Option>
                    <Option>New Brunswick</Option>
                    <Option>Newfoundland and Labrador</Option>
                    <Option>Northwest Territories</Option>
                    <Option>Nova Scotia</Option>
                    <Option>Nunavut</Option>
                    <Option>Ontario</Option>
                    <Option>Prince Edward Island</Option>
                    <Option>Quebec</Option>
                    <Option>Saskatchewan</Option>
                    <Option>Yukon</Option>
                </Select>

                <Text>Selected Canada's province: {this.state.canada}</Text>

                <OptionList ref="OPTIONLIST"
                            overlayStyles={{
                                marginTop:15,marginLeft:5,backgroundColor:"#fff",width:400,height:120,
                                padding:0
                            }}
                />
            </View>
        );
    }
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%'
    }

}

