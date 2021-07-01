import React, {Component} from "react";
import {StyleSheet, View, TouchableHighlight, Text, Button, SectionList} from "react-native";
import Bluetooth from "react-native-bluetooth-serial";

import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";

class FeaturesScreen extends Component{


    pruebas = () => {
        this.props.navigation.navigate("PruebaScreen");
    }
    
    calibrarApertura = () => {
        this.props.navigation.navigate("CalibrationOpenScreen");
    }
    calibrarCierre = () => {
        this.props.navigation.navigate("CalibrationCloseScreen");
    }

    render(){
        const { mainViewStyle, titleStyle, sectionStyle } = styles;
        return(
            <View style={ mainViewStyle }>
                <Header/>
                <View style={sectionStyle}>
                    <Text style={titleStyle}>Home</Text>
                    <CustomButton text="Calibrar apertura" onPress={this.calibrarApertura} />
                    <CustomButton text="Calibrar cierre" onPress={this.calibrarCierre} />
                    <CustomButton text="Probar" onPress={this.pruebas} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: "#FFF",
        
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
        fontSize: 30
    }
});

export default FeaturesScreen;