import React, {Component} from "react";
import Button from "./Button.obsolete";
import Image from "./FlexImage.obsolete";

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
                    resizeMode="center"
                />
            </Button>
        )
    }
}

ImageButton.displayName = 'ImageButton';
