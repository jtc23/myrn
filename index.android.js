/*
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import LoadImage from './app/loadImage';
// import Product from './app/product';
// import Profile from './app/profile';
// import Other from './app/other';
// var Dimensions=require('Dimensions');
export default class MyRN extends Component {
 
  render() {
    return (
      <Navigator
                 initialRoute={{name:'home',component: LoadImage}}
                
                configureScene={()=>{
                  return Navigator.SceneConfigs.PushFromRight
                }}
                renderScene={(route, navigator) => {
                 let Component = route.component;
                 return <Component {...route.params} navigator={navigator}/>;
                }} 
                />
         );
  }
}



AppRegistry.registerComponent('MyRN', () => MyRN);