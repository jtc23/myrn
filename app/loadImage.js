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
import ThemeDao from './expand/dao/ThemeDao'
let Dimensions=require('Dimensions');
let {width,height}=Dimensions.get('window');
import Main from './main';
export default class LoadImage extends Component {
	 constructor(props){
    super(props);
    this.state={
      timelimit:1,
      theme:{}
    }
  }
	render(){
		return(
			<View>
			<Text>{this.state.timelimit}</Text>
			 <Image  source={require('../src/images/fgo.jpg')} style={styles.imagestyle}/>
			
			</View>
			) 
	}

	componentDidMount(){
		// setTimeout(()=>{
		// 	 this.setState({ timelimit: (this.statetimelimit--)});
		// 	this.props.navigator.replace({
		// 		component:Main
		// 	});

		// },2000);
		new ThemeDao().getTheme().then((data)=>{
			this.theme=data
		})
		 this.bump();
	}

	bump(){

		 this._timer=setInterval(()=>{
		 		if(this.state.timelimit==0){
		 		this._timer&&clearInterval(this._timer);
			this.props.navigator.push({
					component:Main,
					 params:{
					 	...this.props,
						theme:this.theme
					}
				});
			}else{
				let ct=this.state.timelimit;
				ct--;
				 this.setState({ timelimit: parseInt(ct)})
			}

		 },1000)
	
	}
}	

const styles = StyleSheet.create({
		imagestyle:{
			width:width,
			height:height
		}
});