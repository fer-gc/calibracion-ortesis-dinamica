import React, {Component} from "react";
import {StyleSheet, View, Image, Text, Button, TouchableOpacity} from "react-native";
import { colors } from "../utils/constants"

class CustomButton extends Component{

    nop = () =>{};

    render(){
        const {buttonStyle, textStyle} = styles;
        const {style, text, onPress, onPressIn} = this.props;
        return(
            <TouchableOpacity style={ {...buttonStyle, ...style} } 
                onPress={ onPress } onPressIn={onPressIn || this.nop}>
                <Text style={textStyle}> { text } </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: "80%",
        height: "10%",
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: colors.granate,
        borderRadius: 15
    },
    textStyle: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default CustomButton;