import React, {Component} from "react";
import {StyleSheet, View, Image, Text, Button, Alert} from "react-native";
import Bluetooth from "react-native-bluetooth-serial";

import { colors, APP_NAME } from "../../utils/constants";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";

class HomeScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    nextScreen = () => {
        this.props.navigation.navigate( "FindScreen" );
    }

    turnBluetoothOn = () =>{
        Bluetooth.enable().then(()=>{
            setTimeout(() =>{
                this.nextScreen();
            }, 500);
        }).catch(()=>{
            Alert.alert("Error", "No se pudo encender el Bluetooth, hagalo manualmente e intentelo de nuevo.")
        });
    }

    start = async () => {
        Bluetooth.isEnabled().then((result)=>{
            if(result) this.nextScreen();
            else this.turnBluetoothOn();
        }).catch((error)=>{
            console.log(error);
            this.turnBluetoothOn();
        });
    }

    componentDidMount(){
        Bluetooth.on("connectionLost", () => {
            this.props.navigation.navigate("Home")
        })
    }

    render(){
        const {mainViewStyle, sectionStyle, textStyle, buttonStyle, descriptionStyle} = styles;
        return(
            <View style={ mainViewStyle }>
                <Header/>
                <View style={sectionStyle}>
                    <Text style={textStyle} >
                        Bienvenido 😀
                    </Text>
                    <Text style={descriptionStyle}>Es momento de conectar tu <Text style={{fontWeight: "bold"}} >{APP_NAME}</Text>. Conforme calibres tus movimientos aprenderás a usar tu órtesis. </Text>
                    <CustomButton style={buttonStyle} text="¡¡¡Empecemos!!!" onPress={this.start}/>
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
    sectionStyle:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center"
    },
    textStyle: {
        fontSize: 30,
        textAlign: "center",
        paddingHorizontal: "10%"
    },
    buttonStyle: {
        alignSelf: "center",
        marginTop: "30%"
    },
    descriptionStyle: {
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: "5%",
        marginTop: 25
    }
});

export default HomeScreen;