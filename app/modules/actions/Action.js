import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Option, OptionList, Select} from 'react-native-selectme';
import * as db from '../global/db';
import PropTypes from 'prop-types';
import colors from '../global/colors';

class Action extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
        };

    }

    componentWillMount() {
        this._getActions();
    }

    _getOptionList() {
        return this.refs['OPTIONLISTACTION'];
    }


    render() {
        const {options} = this.state;
        const {onSelect} = this.props;

        let actions = options.map(function (option, i) {
            const action=option.id+"|"+option.name;
            const textOption=option.name+'   '+option.minGain+' Vizz';
            return (<Option value={{action: action}} key={i} style={{
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: colors.lightGray,
            }}>{textOption}</Option>);
        });
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginTop: 0}}>
                <Select
                    width={350}
                    height={50}
                    ref="SELECTACTION"
                    optionListRef={this._getOptionList.bind(this)}
                    onSelect={(val) => {

                        const actionSplit = val.action.split("|");
                        const selectedAction=options.find(item => parseInt(item.id) === parseInt(actionSplit[0]));
                        onSelect(val.action,selectedAction.means);

                    }}
                    style={{backgroundColor: "#00BFB3", borderWidth: 1, borderColor: colors.lightGray}}
                    defaultValue="Choisir une action"
                >
                    {actions}
                </Select>
                <OptionList ref="OPTIONLISTACTION"
                            overlayStyles={{
                                backgroundColor: "transparent",
                                width: 400,
                                height: 120,
                                padding: 0,
                                left: 5,
                                top: 45,
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