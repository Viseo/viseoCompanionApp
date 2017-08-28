import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppText from '../global/components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppTextInput from '../global/components/AppTextInput';
import PropTypes from 'prop-types';

class GridRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mean: this.props.mean,
            quantity: this.props.mean.quantity,

        };
    }

    render() {
        const {mean} = this.state;
        const {onQuantityChange} = this.props;
        const multiQuantityVizz = this.state.quantity === 0 ? mean.vizzsPerMean : mean.vizzsPerMean * this.state.quantity;
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', height: 50, width: 350}}>
                <View style={{flex: 3, marginLeft: 5, flexWrap: 'nowrap'}}>
                    <AppText >{mean.name}</AppText>
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                    <AppText>{multiQuantityVizz}</AppText>
                </View>
                <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                    <Icon.Button name="minus" backgroundColor="rgb(221, 239, 239)"
                                 style={{width: 40, borderRadius: 0}}
                                 onPress={() => {
                                     if (this.state.quantity > 0) {
                                         this.setState({
                                             quantity: this.state.quantity - 1,
                                         });
                                         const vizz=(this.state.quantity - 1)*mean.vizzsPerMean;
                                         onQuantityChange(mean.id, vizz);
                                     }
                                 }}
                    />
                    <AppTextInput
                        style={{
                            borderColor: 'dimgrey',
                            borderWidth: 1,
                            height: 30,
                            width: 30,
                            backgroundColor: '#fff',
                            fontSize: 15,
                            marginTop: -20,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 8,
                            paddingRight: 0,
                            marginTop: -10,
                            color: 'dimgrey',

                        }}
                        label=""
                        value={this.state.quantity.toString()}
                        onChangeText={quantity => {
                            this.setState({
                                quantity: parseInt(quantity),
                            });
                            onQuantityChange(mean.id, quantity);
                        }}
                    >

                    </AppTextInput>
                    <Icon.Button name="plus" backgroundColor="rgb(221, 239, 239)"
                                 style={{width: 50, borderRadius: 0}}
                                 onPress={() => {
                                     this.setState({
                                         quantity: this.state.quantity + 1,
                                     });

                                     const vizz=(this.state.quantity + 1)*mean.vizzsPerMean;
                                     onQuantityChange(mean.id, vizz);
                                 }}
                    />
                </View>

            </View>
        );
    }

}
;

export default GridRow;

GridRow.propTypes = {
    onQuantityChange: PropTypes.func,
    mean: PropTypes.object.isRequired,

};