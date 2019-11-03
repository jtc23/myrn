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
import AboutCommon, {FLAG_ABOUT} from './aboutCom.js'
import config from '../../src/data/config.json';
import ViewUtils from '../util/ViewUtils'
import GlobalStyles from '../../src/styles/GlobalStyles'
import ThemeDao from '../expand/dao/ThemeDao'
const MORE_MENU = {
    Custom_Language: '自定义语言',
    Sort_Language: '语言排序',
    Custom_Theme: '自定义主题',
    Custom_Key: '自定义标签',
    Sort_Key: '标签排序',
    Remove_Key: '标签移除',
    About_Author: '关于作者',
    About: '关于',
    Website: 'Website',
    Feedback: '反馈',
    Share: '分享',
}
export default class AboutPage extends Component{
     constructor(props) {
        super(props);
        this.aboutCommon=new AboutCommon(props,(dic)=>this.updateState(dic),FLAG_ABOUT.flag_about,config);
        this.state = {
            projectModels: [],
            author:config.author,
            theme:{}
        }
    }
    componentDidMount() {
        // this.aboutCommon.componentDidMount();
         new ThemeDao().getTheme().then((data)=>{
            this.setState({
                theme:data
            })
        })
             }
    // componentWillUnmount(){
    //     this.aboutCommon.componentWillUnmount();
    // }
    updateState(dic){
        this.setState(dic);
    }
    render() {
        let content=<View>
            {this.aboutCommon.renderRepository(this.state.projectModels)}
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.Website), require('../../src/images/ic_computer.png'),MORE_MENU.Website,'red')}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.About_Author), require('../../src/images/ic_insert_emoticon.png'), MORE_MENU.About_Author, 'red')}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.Feedback), require('../../src/images/ic_feedback.png'), MORE_MENU.Feedback,'red')}
            
        </View>
        return this.aboutCommon.render(content, {
            'name': 'GitHub Popular',
            'description': '这是一个用来查看GitHub最受欢迎与最热项目的App,它基于React Native支持Android和iOS双平台。',
            'avatar':this.state.author.avatar1,
            'backgroundImg':this.state.author.backgroundImg1,
        });
    }
}