import React, {Component} from "react";
import {StyleSheet, View, Alert, Text, Image, SectionList} from "react-native";
import Bluetooth from "react-native-bluetooth-serial";
import AwesomeAlert from "react-native-awesome-alerts";

import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";

class CalibrationOpenScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            showAlert: false,
            calibration: 0,
            count: 0,
            loading: false
        }
    }

    texts = [
        {
            title: "Calibración de apertura",
            description: "Coloca la mano en posición de reposo y realiza un solo movimiento girando la muñeca como se muestra en la animación dentro de los siguientes 3 segundos después de presionar el botón.",
            gif: require("../../utils/images/gesture_open.gif")
        }
    ]

    sendMessage = (text) => {
        Bluetooth.write(text);
    }

    calibrate = () => {
        const {calibration} = this.state;
        this.setState({
            loading: true
        });
        this.sendMessage("z");
        let interval = setInterval(() => {
            this.setState({count: this.state.count+1});
        }, 1000);
        setTimeout(()=>{
            clearInterval(interval);
            this.setState({
                loading: false
            });
            setTimeout(() => {
                this.setState({
                    showAlert: true, 
                    count: 0
                });
            }, 100);
        }, 3100);
    }

    render(){
        const { mainViewStyle, titleStyle, sectionStyle, animationStyle, textStyle } = styles;
        const { showAlert, calibration, count, loading } = this.state;
        const {title, description, gif} = this.texts[calibration];
        return(
            <View style={ mainViewStyle }>
                <Header/>
                <View style={sectionStyle}>
                    <Text style={titleStyle}>{title}</Text>
                    <Text style={textStyle}>{description}</Text>
                    <Image source={gif} style={animationStyle} resizeMode="center" />
                    <CustomButton text="Calibrar" onPress={this.calibrate} />
                    
                    <AwesomeAlert 
                        show={showAlert}
                        title="Calibrado"
                        message="Tu movimiento fue guardado correctamente."
                        showCancelButton={false}
                        showConfirmButton={true}
                        closeOnTouchOutside={false}
                        confirmText="Continuar"
                        onConfirmPressed={() => {
                            this.setState({showAlert: false});
                            this.props.navigation.goBack();
                        }}
                    />
                    <AwesomeAlert 
                        show={loading}
                        showProgress={true}
                        progressColor={"#000"}
                        closeOnTouchOutside={false}
                        title={"Calibrando"}
                        message={ count + "/3s"}
                    />
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
        textAlign: "center",
        marginHorizontal: 20
    },
    textStyle: {
        textAlign: "center",
        marginHorizontal: 20,
        fontSize: 20
    },
    animationStyle: {
        borderRadius: 50,
        height: "30%"
    }
});

export default CalibrationOpenScreen;