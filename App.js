/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import 'react-native-gesture-handler';
 import React from 'react';
 import {
   StyleSheet,
   LogBox
 } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 // importar vistas
 import SplashScreen from "./src/views/SplashScreen/SplashScreen";
 import HomeScreen from "./src/views/HomeScreen/HomeScreen";
 import FindScreen from "./src/views/FindScreen/FindScreen";
 import FeaturesScreen from "./src/views/FeaturesScreen/FeaturesScreen";
 import PruebaScreen from "./src/views/PruebaScreen/PruebaScreen";
 import CalibrationCloseScreen from "./src/views/CalibrationCloseScreen/CalibrationCloseScreen";
 import CalibrationOpenScreen from "./src/views/calibrationOpenScreen/CalibrationOpenScreen.js";
 
 const {Navigator, Screen} = createStackNavigator();
 
 const opts = {headerShown: false};
 const screens = [
     {name: "Splash", component: SplashScreen, options: opts},
     {name: "Home", component: HomeScreen, options: opts},
     {name: "FindScreen", component: FindScreen, options: opts},
     {name: "FeaturesScreen", component: FeaturesScreen, options: opts},
     {name: "PruebaScreen", component: PruebaScreen, options: opts},
     {name: "CalibrationCloseScreen", component: CalibrationCloseScreen, options: opts},
     {name: "CalibrationOpenScreen", component: CalibrationOpenScreen, options: opts}
 ];
 
 const App = () => {
     LogBox.ignoreAllLogs();
 return (
     <NavigationContainer>
         <Navigator>
             {screens.map( ({name, component, options}, i) => 
                 <Screen name={ name } component={ component } options={options} key={"screen_"+i}/> 
             )}
         </Navigator>
     </NavigationContainer>
   );
 };
 
 const styles = StyleSheet.create({
 
 });
 
 export default App;
 