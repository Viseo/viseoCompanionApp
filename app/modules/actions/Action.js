import  {AppRegistry, Text, View} from 'react-native';
import  DropDown,{Select, Option, OptionList} from 'react-native-selectme';
import React, {Component} from 'react';

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
            actions: action.id
        });
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:100}} >
                <Text>Choisir une action: {this.state.actions}</Text>
                <Select
                    style={{backgroundColor: "#00BFB3"}}
                    width={350}
                    height={50}
                    ref="SELECT1"
                    optionListRef={this._getOptionList.bind(this)}
                    defaultValue="Choisir une action ..."
                    onSelect={(action) => this._select(action)}
                    >
                    <Option value = {{id : "idee"}}>J'ai une idee est je souhaite lancer un projet participatif</Option>
                    <Option>j'aide à la conception d'une formation</Option>
                    <Option>j'organise et j'anime un évenement</Option>
                    <Option>je participe à la rédaction d'un livre blanc</Option>
                    <Option>je réalise un entretien de recrutement</Option>
                    <Option>je donne une formation</Option>
                    <Option>je rédige un billet globe</Option>
                    <Option>je remonte un lead</Option>
                    <Option>je valorise l'image de viseo en externe</Option>
                    <Option>je présente au cours d'un évenement</Option>
                    <Option>je publie en externe Viseo</Option>
                    <Option>je relie des billet blog avant parution</Option>
                    <Option>je presente Viseo</Option>
                    <Option>je  contribue à la revue de presse hebdo ce mois-ci</Option>
                </Select>
                <OptionList ref="OPTIONLIST"
                            overlayStyles={{
                                marginTop:15,marginLeft:5,backgroundColor:"#fff",width:400,height:120,
                                padding:0
                            }}
                />
            </View>
        );
    }

}

