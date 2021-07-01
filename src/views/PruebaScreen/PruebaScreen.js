import React, {Component} from "react";
import {StyleSheet, View, TouchableHighlight, Text, Button, SectionList} from "react-native";
import Bluetooth from "react-native-bluetooth-serial";

import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import {readFromDevice} from "react-native-bluetooth-serial/android/src/main/java/com/rusel/RCTBluetoothSerial"

class PruebaScreen extends Component{

    sendMessage = (text) => {
        Bluetooth.write(text).then(()=>{
            console.log("success");
        }).catch((error)=>{
            console.log(error);
        });
        console.log(text);
        /*
        Bluetooth.readFromDevice().then((data)=>{
            console.log(data);
        }).catch((error)=>{
            console.log(error);
        });
        */
    }


    render(){
        const { mainViewStyle, titleStyle, sectionStyle } = styles;
        return(
            <View style={ mainViewStyle }>
                <Header/>
                <View style={sectionStyle}>
                    <Text style={titleStyle}>Manten presionado para mover y suelta para detener el movimiento de tu órtesis</Text>
                    <CustomButton text="Abrir"  onPressIn={this.sendMessage.bind(this, "a")} onPress={this.sendMessage.bind(this, "s")} />
                    <CustomButton text="Cerrar" onPressIn={this.sendMessage.bind(this, "c")} onPress={this.sendMessage.bind(this, "s")} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    sectionStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: "20%"
    },
    titleStyle: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center"
    }
});

export default PruebaScreen;