/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component, PropTypes} from 'react';

import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image,
    Text,
    View,
    Linking,

} from 'react-native'
import ButtonSet from '../set/buttonSet.js';
import AboutPage from '../about';
import WebViewPage from '../webView';
import UserColor from '../userColor';
import CommonModal from './commonModal';
import UShare from './UShare'
export const MORE_MENU = {
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
export default class ModalMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
           customThemeViewVisible:false,
        }
    }

    static propTypes = {
        contentStyle: View.propTypes.style,
        menus: PropTypes.array.isRequired,
        anchorView: PropTypes.func,
    }

    /**
     * 打开更多菜单
     */
    open() {
        this.showPopover();
    }

    showPopover() {
        this.dialog.show()
    }

    closePopover() {
       this.dialog.dismiss()
    }

    onMoreMenuSelect(tab) {
        let TargetComponent='';
       switch (tab) {
               case 'webView':
                TargetComponent=WebViewPage;
                break;
               case 'ButtonSet':
                TargetComponent = ButtonSet;
                break;
                case 'AboutPage':
                TargetComponent = AboutPage;
                break;

       }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
            });
             this.closePopover();
        }

    }

    renderMoreView() {
      return( 
        <View>
        <CommonModal 
        ref={dialog=>this.dialog=dialog}
        onSelect={(ele)=>this.onMoreMenuSelect(ele)}
        />
         </View>
        )
        
    }

    render(){
        return (this.renderMoreView())
    }
}
