import React, {Component} from "react";
import {StyleSheet, View, TouchableHighlight, Text, Button, SectionList, Alert} from "react-native";
import Bluetooth from "react-native-bluetooth-serial";
import AwesomeAlert from "react-native-awesome-alerts";
import { colors } from "../../utils/constants";

import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";

class FindScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            paired: [],
            unpaired: []
        }
        
    }

    listPaired = async () => {
        Bluetooth.list().then((devices)=>{
            console.log(devices);
            this.setState({
                paired: devices
            });
        }).catch((error)=>{
            console.log(error);
        });
    }

    listUnpaired = async () =>{
        console.log("unpaired")
        Bluetooth.discoverUnpairedDevices().then((devices)=>{
            
            console.log("Un", devices);
            this.setState({
                unpaired: devices
            });
        }).catch((error)=>{
            console.log(error);
        });
    }

    connect = (id) => {
        this.setState({loading: true});


        setTimeout(() => {
            this.setState({loading: false});
            console.log("Connect");
            this.props.navigation.navigate("FeaturesScreen");
        }, 2000);
        return

        
        Bluetooth.connect(id).then(()=>{
            this.setState({loading: false});
            console.log("Connect");
            this.props.navigation.navigate("FeaturesScreen");
        }).catch(()=>{
            console.log("No se pudo conectar");
            this.setState({loading: false});
            Alert.alert("Error", "No se pudo conectar.");
        });
    }

    find = () =>{
        this.listPaired();
        this.listUnpaired();
    }

    componentDidMount(){
        this.find();
        console.log("Desconenctando")
        Bluetooth.disconnect();
    }
    
    render(){
        const {mainViewStyle, listStyle, textStyle, descriptionStyle} = styles;
        const { paired, unpaired, loading } = this.state;
        return(
            <View style={ mainViewStyle }>
                <Header/>
                <Text style={textStyle}>Conecta tu órtesis</Text>
                <Text style={descriptionStyle}>Primero busca tu órtesis en la lista siguiente y seleccionala. </Text>
                <SectionList style={listStyle} sections={
                    [
                        { title: "Conocidos", data: paired },
                        { title: "Nuevos", data: unpaired }
                    ]
                } renderItem={this.listItem} renderSectionHeader={this.listHeader} keyExtractor={({id, i})=>`${id}_${Date.now()}`} />
                
                <AwesomeAlert 
                    title={"Conectando"}
                    show={loading}
                    showProgress={true}
                    progressColor={"#000"}
                    closeOnTouchOutside={false}
                />
            </View>
        )
    }

    listHeader = ({section: {title}}) => {
        const {sectionHeaderStyle} = styles;
        return(
            <Text style={sectionHeaderStyle}>{title}</Text>
        );
    }

    listItem = ({item:{name, id}}) => {
        const {elementStyle, elementTextStyle} = styles;
        return(
            <TouchableHighlight style={elementStyle} onPress={this.connect.bind(this, id)} key={name} underlayColor={"rgba(176, 54, 72, 0.7)"} >
                <Text style={elementTextStyle}>{ name || id }</Text>
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    textStyle: {
        fontSize: 30,
        textAlign: "center",
        paddingHorizontal: "10%",
        marginTop: 20
    },
    descriptionStyle: {
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: "2.5%",
        marginVertical: 20
    },
    elementStyle: {
        paddingVertical: 10,
        height: 50,
        justifyContent: "center",
        borderBottomWidth: 1
    },
    elementTextStyle: { 
        fontSize: 20,
        textAlign: "center"
    },
    sectionHeaderStyle: {
        fontSize: 30,
        fontWeight: "bold"
    }
});

export default (FindScreen);