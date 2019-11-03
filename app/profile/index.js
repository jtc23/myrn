import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Navigator,
  Platform,
  StatusBar,
  TouchableOpacity
} from 'react-native';
var Dimensions=require('Dimensions');
let { width, height } = Dimensions.get('window');
const col=3;
const boxwidth=100;
let marGin=(width-col*boxwidth)/(col+1)

export default class  Profile extends Component{
	constructor(props){
		super(props);
		this.state={
			title:'login'
		}
	}
	render(){

		return(
			<View style={styles.container}>
				<Image source= {require('../../src/images/ic_my.png')} style={styles.imagestyle}/>
				<TextInput  placeholder={'用户名'}	multiline={false} style={styles.textstyle} underlineColorAndroid = {'transparent'}/>
				<TextInput placeholder={'密码'} keyboradtype={'numeric'} secureTextEntry={true} style={styles.textstyle} underlineColorAndroid = {'transparent'}	/>


				<View style={styles.login}>
					<TouchableOpacity activeOpacity={0.1}
					onPress={()=>{this.setState({title:"点击"})}}
					onPressIn={()=>{this.setState({title:"按下"})}}
					onPressOut={()=>{this.setState({title:"login"})}}
					onLongPress={()=>{this.setState({title:"长按"})}}
					>
						<Text style={styles.white}>login</Text>
					</TouchableOpacity>
				</View>
				<View>
				<Text style={styles.white}>{this.state.title}</Text>
				</View>
			</View>
			)
		
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems:'center',
		backgroundColor:'#dddddd'
	},
	white:{
		color:'white',
	},
	imagestyle:{
		width:80,
		height:80,
		borderRadius:40,
		borderWidth:2,
		borderColor:'white',
		marginBottom:20,
		marginTop:10,
	},
	textstyle:{
		height:38,
		backgroundColor:'white',
		borderColor:'white',
		textAlign:'center',
		marginTop:1,
		width:width
	},
	login:{
		marginTop:10,
		backgroundColor:'blue',
		width:width*0.8,
		height:38,
		alignItems:"center",
		paddingTop:10
	}
});