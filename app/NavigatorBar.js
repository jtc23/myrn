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
  StatusBar
} from 'react-native';
let Dimensions=require('Dimensions');
let { width, height } = Dimensions.get('window');
const NAV_HEIGHT_IOS=50;
const NAV_HEIGHT_AND=40;
const StatusBarShape={
	backgroundColor:PropTypes.string,
	barStyle:PropTypes.oneOf(['default', 'light-content', 'dark-content']),
	hidden:PropTypes.bool
}
export default class   NavigationBar extends Component{
	static propTypes={
		style:View.propTypes.style,
		title:PropTypes.string,
		titleView:PropTypes.element,
		leftButton:PropTypes.element,
		rightButton:PropTypes.element,
		statusBar:PropTypes.shape(StatusBarShape),
	}
	static defaultProps={
		statusBar:{
			barStyle:'light-content',
			hidden:false
		}
		
	}
	constructor(props){
		super(props);
		this.state={
			title:''
		}
		
	}
	render(){
		let staus=<View>
			<StatusBar {...this.props.statusBar}/>
		</View>
		
		let titleView=this.props.titleView?this.props.titleView:<Text>{this.props.title}</Text>
		let content=<View style={styles.navbar}>
		{this.props.leftButton}
		{titleView}
		{this.props.rightButton}
			
		</View>
		return(
			<View style={[styles.container,this.props.style]}>
			{statusBar}
			{content}
			</View>
			)
	}
}
const styles=StyleSheet.create({
	container:{
		backgroundColor:'gray',
		height:40,
		position:'absolute',
		top:0,
		width:width,
		flex:1
	},
	navbar:{
		justifyContent:'space-between',
		alignItems:'center',
		height:Platform.OS=='ios'?NAV_HEIGHT_IOS:NAV_HEIGHT_AND,
		flexDirection:'row',
		
	}
})