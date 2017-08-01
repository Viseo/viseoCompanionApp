import React, {Component} from "react";
import  {View} from "react-native";
import   {Select, Option, OptionList} from "react-native-selectme";
import * as db from "../global/db";
import PropTypes from "prop-types";
import colors from "../global/colors";
import AppTextInput from "../global/components/AppTextInput";
import AppText from "../global/components/AppText";
class Action extends Component {
    constructor(props) {
        super(props);
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
        const {onSelect} = this.props;
        let actions = options.map(function (option, i) {
            return (<Option value={{id: option.id}} key={i} style={{
                backgroundColor: "transparent",
                borderWidth:1,
                borderColor: colors.mediumGray,
            }}>{option.name}</Option>);
        });
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 0}}>
                <Select
                    width={350}
                    height={50}
                    ref="SELECT1"
                    optionListRef={this._getOptionList.bind(this)}
                    onSelect={(action) => {
                        this._select(action);
                        onSelect(action.id);
                    }}
                    style={{backgroundColor: "#00BFB3"}}
                    defaultValue="Choisir une action ..."
                >
                    {actions}
                </Select>
                <OptionList ref="OPTIONLIST"
                            overlayStyles={{
                                backgroundColor: "transparent",
                                width: 400,
                                height: 120,
                                padding: 0,
                                left: 5,
                                top: 40,
                                bottom: 0,
                                zIndex: 100,
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

}
export default Action;

Action.propTypes = {
    onSelect: PropTypes.func,
};