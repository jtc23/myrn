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
  ScrollView,
  TouchableOpacity
} from 'react-native';
import product from './product.json';
import NavigationBar from '../common/NavigatorBar.js';
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao.js';
import ViewUtils from '../util/ViewUtils';
var Dimensions=require('Dimensions');
let { width, height } = Dimensions.get('window');
const col=3;
const boxwidth=100;
let marGin=(width-col*boxwidth)/(col+1)

export default class  ProductDetail extends Component{
	constructor(props){
		super(props);
		this.state={
			dataArray:'',
			str:''
		}
	}
	componentDidMount(){
		this.LanguageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
		this.loadData()
		this.languageDao.getdata(data=>{
			this.setState({
                str: data
            })
		})
		alert(1111)
	}
	loadData() {
        this.languageDao.fetch()
        .then((data)=> {
            this.setState({
                dataArray: data
            })
            
        }).catch((error)=> {
            alert(error);
        });
    }
    renderView(){
    	return(
    		this.state.dataArray
    		)
    }
	render(){
		
		return(
			<View style={styles.container}>
			<NavigationBar 
			title={'自定义按钮'}
			/>

			<Text>
					{this.state.dataArray}
			</Text>
			</View>
			)
		
	}
popRoute(){
	this.props.navigator.pop()
}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'red'
	},
	imagestyle:{
		width:boxwidth,
		height:100,
	},
	productliststyle:{
		marginLeft:marGin,
		marginBottom:10,
		alignItems:'center'
		
	},
	textstyle:{
		
	}
});