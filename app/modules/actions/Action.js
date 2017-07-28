import  {Text, View, StyleSheet} from "react-native";
import   {Select, Option, OptionList} from "react-native-selectme";
import React, {Component} from "react";
import * as db from "../global/db";

export default  class Action extends Component {
    constructor(props) {
        super(props);
        // this.props.navigator(this.bind(this));
        this.state = {
            action: "",
            options: [],
        };

    }

    componentWillMount() {
        this._getActions();
    }

    _getOptionList() {
        return this.refs["OPTIONLIST"];
    }

    _select(action) {
        this.setState({
            ...this.state,
            action: action.id,
        });
    }

    render() {
        const {options} = this.state;
        let actions = options.map(function (option, i) {
            return ( <Option value={{id: option.id}} key={i}  >{option.name}</Option>);
        });
        return (
            <View style={{flex:1, justifyContent: "center", alignItems: "center",marginTop:5 }}>
                <Select
                    width={350}
                    height={50}
                    ref="SELECT1"
                    optionListRef={this._getOptionList.bind(this)}
                    onSelect={(action) => this._select(action)}
                    style={{backgroundColor: "#00BFB3"}}
                    defaultValue="Choisir une action ..."
                >
                    {actions}
                </Select>
                <OptionList ref="OPTIONLIST"
                            overlayStyles={{
                                marginTop: 15, marginLeft: 5, backgroundColor: "#fff", width: 400, height: 120,
                                padding: 0
                            }}
                />
            </View>
        );
    }

    _getActions = async () => {
        this.setState({
            options: await db.actions.getAll(),
        });

    };

};
const styles = StyleSheet.create({});
