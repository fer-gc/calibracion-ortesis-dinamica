import React, {Component} from "react";
import {StyleSheet, View, Image, Text} from "react-native";
import { CommonActions } from '@react-navigation/native';
import { colors, APP_NAME } from "../../utils/constants";

class SplashScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        setTimeout( () => (
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'Home' }
                  ]
                })
            )
        ), 2000 );
    }

    render(){
        const {mainViewStyle, logoStyle, titleStyle} = styles;
        return(
            <View style={ mainViewStyle }>
                <Image source={ require("../../utils/images/logo_ipn.png") } style={ logoStyle } />
                <Text style={titleStyle}>{APP_NAME}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: colors.granate,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    logoStyle: {
        height: "50%",
        resizeMode: "contain",
        tintColor: "#FFF"        
    },
    titleStyle: {
        fontSize: 45,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: "10%"
    }
});

export default SplashScreen;