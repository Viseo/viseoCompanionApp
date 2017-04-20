import React, {Component} from 'react'
import Button from './Button'
import Image from './FlexImage'

export default class ImageButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Button
                onPress={this.props.onPress}
                style={this.props.style}
            >
                <Image
                    source={this.props.source}
                    resizeMode="stretch"
                />
            </Button>
        )
    }
}

ImageButton.displayName = 'ImageButton';
