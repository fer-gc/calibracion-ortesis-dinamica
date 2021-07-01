import React, {Component} from "react";
import {StyleSheet, View, Alert, Text, Image, SectionList} from "react-native";
import Bluetooth from "react-native-bluetooth-serial";
import AwesomeAlert from "react-native-awesome-alerts";

import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";

class CalibrationCloseScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            showAlert: false,
            calibration: 1,
            count: 0,
            loading: false
        }
    }

    texts = [
        {
            title: "Calibración de cierre horizontal",
            description: "Coloca la mano en posición horizontal de reposo y reliza un solo movimiento hacia arriba como se muestra en la animación",
            gif: require("../../utils/images/gesture_1.gif")
        }, 
        {
            title: "Calibración de cierre",
            description: "Coloca la mano en posición vertical de reposo y reliza un solo movimiento hacia arriba como se muestra en la animación",
            gif: require("../../utils/images/gesture_close.gif")
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
        this.sendMessage( calibration ? "y":"x" );
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
                    <Image source={gif} style={animationStyle} resizeMode="contain" />
                    <CustomButton text="Calibrar" onPress={this.calibrate} />
                    {/*<CustomButton text={"Calibrar " + (calibration ? "cierre horizontal":"cierre vertical")} 
                        onPress={()=>this.setState({calibration: (calibration ? 0:1)})} />
                    */}
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
                            if(!calibration)
                                this.setState({ calibration: 1 });
                            else{
                                this.props.navigation.goBack();
                            }
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

export default CalibrationCloseScreen;