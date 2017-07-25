import React, {AppRegistry, Text, View,Component} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DropDown, {Select, Option, OptionList,} from 'react-native-selectme';
import Text from 'react-native-svg/elements/Text';

class Action extends Component {
    constructor(props) {
        super(props);
        this.props.navigator(this.bind(this));
        this.state = {
            canada: ''
        };
    }

    _getOptionList() {
        return this.refs['OPTIONLIST'];
    }


    _canada(action) {

        this.setState({
            ...this.state,
            canada: action
        });
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Select
                    width={250}
                    ref="SELECT1"
                    optionListRef={this._getOptionList.bind(this)}
                    defaultValue="Choisir une action ..."
                    onSelect={this._canada.bind(this)}>
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

                <OptionList ref="OPTIONLIST"/>
            </View>
        );
    }
}

AppRegistry.registerComponent('App', () => App);



const mapStateToProps = ({user}, ownProps) => ({
    user,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Action);