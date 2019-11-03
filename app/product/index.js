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
import 	ScrollableTabView,{	ScrollableTabBar}	from "react-native-scrollable-tab-view";
import ProductDetail from './productDetail.js';
import NavigationBar from '../common/NavigatorBar.js';
import ModalMenu,{MORE_MENU} from '../common/ModalMenu.js';
import ViewUtils from '../util/ViewUtils';
import {FLAG_TAB} from '../main'
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
var Dimensions=require('Dimensions');
let { width, height } = Dimensions.get('window');
const col=3;
const boxwidth=100;
let marGin=(width-col*boxwidth)/(col+1)

export default class  Product extends Component{
	constructor(props){
		super(props);
		this.LanguageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
		this.state = {
            dataArray: [],
            theme:'red',
            customThemeViewVisible: false,
        }
	}
	componentDidMount(){
	 
		this.loadData();
	}
	loadData() {
        this.LanguageDao.fetch().then((data)=> {
            this.setState({
                dataArray: data
            })
            
        }).catch((error)=> {
            alert(error);
        });
    }
     renderRightButton() {
        return <View style={{flexDirection:'row'}}>
            <TouchableOpacity
                onPress={()=> {
                    this.props.navigator.push({
                        component:SearchPage,
                        params:{
                            ...this.props
                        }
                    })
                }}
            >
                <View style={{padding:5,marginRight:8}}>
                    <Image
                        style={{width:24,height:24}}
                        source={require('../../src/images/ic_search_white_48pt.png')}
                    />
                </View>

            </TouchableOpacity>
            {ViewUtils.getMoreButton(()=>this.refs.moreMenu.open())}
        </View>
    }
    renderMoreView(){
        let params={...this.props,fromPage:FLAG_TAB.flag_popularTab}
        return <ModalMenu
            ref="moreMenu"
            {...params}
            menus={[MORE_MENU.Custom_Key,MORE_MENU.Sort_Key,MORE_MENU.Remove_Key,MORE_MENU.Share,MORE_MENU.Custom_Theme,
            MORE_MENU.About_Author,MORE_MENU.About]}
            anchorView={()=>this.refs.moreMenuButton}
            onMoreMenuSelect={(e)=> {
                if (e === MORE_MENU.Custom_Theme) {
                    this.setState({
                        customThemeViewVisible:true
                    })
                }
            }}
        />
    }
	render(){
		 var statusBar={
            backgroundColor: this.state.theme,
            barStyle: 'light-content',
        }
        let content=this.state.dataArray.length > 0 ?
        <ScrollableTabView
		 tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
        tabBarInactiveTextColor='black'
        tabBarActiveTextColor='black'
        tabBarBackgroundColor='white'
		 renderTabBar={() => <ScrollableTabBar style={{height: 40,borderWidth: 0, elevation: 2}}
                                                      tabStyle={{height: 39}}/>}
		 >
		        {this.state.dataArray.map((reuslt, i, arr)=> {
                    let language = arr[i];
                    return language.checked ? <Text key={i} tabLabel={language.name}></Text>: null;
                })}
      </ScrollableTabView>:null;
		return(
			<View style={styles.container}>
		{/*<TouchableOpacity onPress={()=>{this.pushroute()}}>
				<Text style={styles.textstyle}>首页</Text>
			</TouchableOpacity>
		*/}
			<NavigationBar
			statusBar={statusBar}
			title={'index'}
			rightButton={this.renderRightButton()}
			/>
		 {content}
		   {this.renderMoreView()}
			</View>
			)

		
	}
			pushroute(){
			this.props.navigator.push(
			{
				component:ProductDetail
			})
		}

}

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems:'center',
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
		alignItems:'center',
		width:100,
		height:30,
		backgroundColor:'red',
		justifyContent:'center',
		borderRadius:15,
		textAlign:'center',
		lineHeight:20
	}
});