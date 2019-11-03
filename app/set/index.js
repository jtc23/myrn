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
  TouchableOpacity,
  ScrollView
} from 'react-native';
var Dimensions=require('Dimensions');
import SettingCell from './settingCell'
import NavigationBar from '../common/NavigatorBar.js';
import ButtonSet from './buttonSet.js';
import webView from '../webView.js';
import AboutPage from '../about';
import UserColor from '../userColor';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import ViewUtils from '../util/ViewUtils';
import GlobalStyles from '../../src/styles/GlobalStyles'

let { width, height } = Dimensions.get('window');


export default class  Setting extends Component{
	constructor(props){
		super(props);
    this.LanguageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
		this.state={
			data:'2222',
      dataArray:[],
      customThemeViewVisible:false,
		}

	}
 
  onClick(element){
    let TargetComponent='';
       switch (element) {
               case 'webView':
                TargetComponent=webView;
                break;
               case 'ButtonSet':
                TargetComponent = ButtonSet;
                break;
                case 'AboutPage':
                TargetComponent = AboutPage;
                break;
                 case 'userColor':
               this.setState({customThemeViewVisible:true})
                break;

       }
     if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,

            });
        }
  }
  //  onClickwebView(element){
    
  //   this.props.navigator.push(
  //     {
  //       component:webView,
  //       params:{
  //         title:'webView',
  //         url:'https://m.baidu.com'
  //       }
  //     })
  // }
    renderUserColor(){
        return (<UserColor
            visible={this.state.customThemeViewVisible}
            {...this.props}
            onClose={()=>this.setState({customThemeViewVisible:false})}
        />)
    }
	render() {
        return (
            <View style={styles.container}>
                {/*导航条*/}
            <NavigationBar
            title={'设置'}
            />

                <ScrollView>
                <View style={GlobalStyles.line}/>

                   <View style={{marginTop:20}}>
                        <SettingCell
                            title="省流量模式"
                            isSwitch={true}
                            istouchable={false}
                        />
                        <SettingCell
                           title="进入webview"
                           component='webView'
                           onClick={(element)=>{this.onClick('webView')}}
                        />
                        <SettingCell
                           title="按钮设置"
                           component='ButtonSet'
                           onClick={(element)=>{this.onClick('ButtonSet')}}
                        />
                        <SettingCell
                           title="清空缓存"
                           rightTitle="1.99M"
                        />
                   </View>
                   <View style={GlobalStyles.line}/>
                    <View style={{marginTop:20}}>
                        <SettingCell
                            title="问卷调查"
                        />
                        <SettingCell
                            title="支付帮助"
                        />
                        <SettingCell
                            title="网络诊断"
                        />
                        <SettingCell
                            title="关于码团"
                        />
                        <SettingCell
                            title="我要应聘"
                        />
                    </View>
                     <View style={{marginTop:20}}>
                        <SettingCell
                            title="自定义颜色"
                             onClick={(element)=>{this.onClick('userColor')}}
                        />
                    </View>
                    <View style={{marginTop:20}}>
                        <SettingCell
                            title="关于"
                             onClick={(element)=>{this.onClick('AboutPage')}}
                        />
                    </View>
                </ScrollView>
                {this.renderUserColor()}
            </View>
        );
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