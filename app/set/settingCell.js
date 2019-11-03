/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    Switch
} from 'react-native';
let Dimensions=require('Dimensions');
let {width,height}=Dimensions.get('window');
export default class SettingCell extends Component{
 constructor(props){
  super(props);
  this.state={
    isOn:false
  }
 }
    static defaultProps = { 
           title: '',  // 标题
           isSwitch: false, // 是否展示开关
           rightTitle: '',
           istouchable:true,
                 }


    render() {
        return (
          this.props.istouchable?
          <TouchableOpacity onPress={()=>{this.props.onClick(this.props.component)}}>
                <View style={styles.container}>
                    {/*左边*/}
                    <Text style={{marginLeft:8}}>{this.props.title}</Text>
                    {/*右边*/}
                    {this.renderRightView()}
                </View>
              </TouchableOpacity> :
              <View style={styles.container}>
                    {/*左边*/}
                    <Text style={{marginLeft:8}}>{this.props.title}</Text>
                    {/*右边*/}
                    {this.renderRightView()}
                </View>
              )
         
    }

    // cell右边显示的内容
    renderRightView(){
      // 判断
       if (this.props.isSwitch){ // true
           return(
              <Switch 
              onTintColor={'#ffaa11'}
              tintColor={'#f0f0f0'}
              thumbTintColor={'blue'}
              value={this.state.isOn == true} onValueChange={()=>{this.setState({isOn: !this.state.isOn})}} style={{marginRight:8}} />
           )
       }else{
           return(
             <View style={{flexDirection:'row', alignItems:'center'}}>
               {this.rightTitle()}
               <Image source={{uri: 'icon_cell_rightArrow'}} style={{width:8, height:13, marginRight:8}}/>
             </View>
           )
       }
    }

    rightTitle(){
        if(this.props.rightTitle.length > 0){
            return(
                <Text style={{color:'gray', marginRight:3}}>{this.props.rightTitle}</Text>
            )
        }
    }
}


const styles = StyleSheet.create({
    container:{
        height:Platform.OS == 'ios' ? 40: 30,
        width:width,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0.5,

        flexDirection:'row',
        // 主轴的对齐方式
        justifyContent:'space-between',
        // 垂直居中
        alignItems:'center'
    }
});

// 输出组件类

