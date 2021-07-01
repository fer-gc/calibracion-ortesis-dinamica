import React from "react"
import { View, Image, StyleSheet, Text } from 'react-native';
import {colors, APP_NAME} from "../utils/constants";

const Header = () => {
    const {headerStyle, logoStyle, nameStyle} = styles;
    return (
        <View style={headerStyle}>
            <Image source={ require("../utils/images/logo_ipn.png") } style={ logoStyle } resizeMode="contain" />
            <Text style={nameStyle}>{APP_NAME}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        height: "10%",
        backgroundColor: colors.granate,
        alignItems: "center",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center"
    },
    logoStyle: {
        height: "100%",
        width: "30%",
        tintColor: "#FFF"
    },
    nameStyle: {
        width: "70%",
        paddingVertical: "auto",
        textAlign: "center",
        color: "#FFF",
        fontSize: 23,
        fontWeight: "bold"
    }
});

export default Header;