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
  ScrollView,
  DeviceEventEmitter
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
// import NavigatorBar from './NavigatorBar';
import Product from './product';
import Profile from './profile';
import Other from './other';
import Setting from './set';
import BaseComponent from './common/BaseComponent'
import Toast,{DURATION} from 'react-native-easy-toast'
var Dimensions=require('Dimensions');
export const FLAG_TAB={
    flag_popularTab:'tb_popular',
    flag_trendingTab:'tb_trending',
    flag_favoriteTab:'tb_favorite',
    flag_my:'tb_my'
}
export const ACTION_HOME={A_SHOW_TOAST:'showToast',A_RESTART:'restart',A_THEME:'theme'};
export default class Main extends BaseComponent {
  constructor(props){
    super(props);
    this.state={
      selectedTab:'home',
      theme:this.props.theme
    }
  }
    componentDidMount(){
        super.componentDidMount();
        this.listener = DeviceEventEmitter.addListener('ACTION_HOME',
            (action,params) => this.onAction(action,params));
        this.update();
    }
    update(){
        // codePush.sync({
        //     updateDialog: {
        //         appendReleaseDescription: true,
        //         descriptionPrefix:'更新内容',
        //         title:'更新',
        //         mandatoryUpdateMessage:'',
        //         mandatoryContinueButtonLabel:'更新',
        //     },
        //     mandatoryInstallMode:codePush.InstallMode.ON_NEXT_RESTART,
        // });
    }
 onAction(action,params){
        if(ACTION_HOME.A_RESTART===action){
            this.onRestart(params)
        }else if(ACTION_HOME.A_SHOW_TOAST===action){
            this.toast.show(params.text,DURATION.LENGTH_LONG);
        }
    }
    onRestart(jumpToTab){
        this.props.navigator.resetTo({
            component:Main,
            params:{
                ...this.props,
                selectedTab:jumpToTab
            }
        })
    }
  render() {
    return (
      <View style={styles.container}>
        
     {/* <NavigatorBar title='boy'
     style={{backgroundColor:'#EE6363'}} 
     leftButton={
      <TouchableOpacity
      onPress={()=>{
        this.props.navigator.pop();
      }}>
        <Image style={{width:22,height:22,margin:5}} source={require('../src/images/ic_arrow_back_white_36pt.png')} />
      </TouchableOpacity>
     }
     rightButton={
      <TouchableOpacity>
        <Image style={{width:22,height:22,margin:5}} source={require('../src/images/ic_star.png')} />
      </TouchableOpacity>
     }
      />*/}
        <TabNavigator>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'home'}
              title="Home"
              selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
              renderIcon={() => <Image style={styles.img} source={ require('../src/images/ic_polular.png')} />}
              renderSelectedIcon={() => <Image style={[styles.img,this.state.theme.styles.tabBarSelectedIcon]} source={ require('../src/images/ic_favorite.png')} />}
              badgeText="1"
              onPress={() => {this.setState({ selectedTab: 'home' })} }>
              <Navigator
                 initialRoute={{name:'home',component: Product}}
                
                configureScene={()=>{
                  return Navigator.SceneConfigs.PushFromRight
                }}
                renderScene={(route, navigator) => {
                 let Component = route.component;
                 return <Component {...route.passProps} navigator={navigator}/>;
                }} 
                />
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'profile'}
              title="Profile"
              selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
              renderIcon={() => <Image style={styles.img} source={ require('../src/images/ic_trending.png')} />}
              renderSelectedIcon={() => <Image style={[styles.img,this.state.theme.styles.tabBarSelectedIcon]} source={ require('../src/images/ic_favorite.png')} />}
            
              onPress={() => this.setState({ selectedTab: 'profile' })}>
              <Navigator
                 initialRoute={{name:'home',component: Profile}}
                
                configureScene={()=>{
                  return Navigator.SceneConfigs.PushFromRight
                }}
                renderScene={(route, navigator) => {
                 let Component = route.component;
                 return <Component {...route.passProps} navigator={navigator}/>;
                }} 
                />
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'other'}
              title="Other"
              selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
              renderIcon={() => <Image style={styles.img} source={ require('../src/images/ic_polular.png')} />}
              renderSelectedIcon={() => <Image style={[styles.img,this.state.theme.styles.tabBarSelectedIcon]} source={ require('../src/images/ic_favorite.png')} />}
            
              onPress={() => this.setState({ selectedTab: 'other' })}>
             <Navigator
                 initialRoute={{name:'home',component: Other}}
                
                configureScene={()=>{
                  return Navigator.SceneConfigs.PushFromRight
                }}
                renderScene={(route, navigator) => {
                 let Component = route.component;
                 return <Component {...route.passProps} navigator={navigator}/>;
                }} 
                />
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'set'}
              title="Setting"
              selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
              renderIcon={() => <Image style={styles.img} source={ require('../src/images/ic_polular.png')} />}
              renderSelectedIcon={() => <Image style={[styles.img,this.state.theme.styles.tabBarSelectedIcon]} source={ require('../src/images/ic_favorite.png')} />}
            
              onPress={() => this.setState({ selectedTab: 'set' })}>
             <Navigator
                 initialRoute={{name:'home',component: Setting}}
                
                configureScene={()=>{
                  return Navigator.SceneConfigs.PushFromRight
                }}
                renderScene={(route, navigator) => {
                 let Component = route.component;
                 return <Component {...route.passProps} navigator={navigator}/>;
                }} 
                />
            </TabNavigator.Item>
        </TabNavigator>
        <Toast ref={(toast)=>this.toast=toast}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection:'row',
    height:64,
  },
  img:{
    width:22,
    height:22,
  },
  nav:{
    marginTop:40,
    flex:1,
    position:'relative',
    backgroundColor:'#F5FCFF',
    alignItems:'center'
  },
  nav1:{
    marginTop:40,
    flex:1,
    position:'relative',
    backgroundColor:'#fff',
  },
  textCenter:{
    textAlign:'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'red',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

