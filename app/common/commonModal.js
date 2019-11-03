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
    Modal
} from 'react-native'
// import CustomKeyPage from "../page/my/CustomKeyPage";
// import SortKeyPagePage from "../page/my/SortKeyPagePage";
// import Popover from '../common/Popover'
// import {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
// import AboutPage from '../page/about/AboutPage'
// import AboutMePage from '../page/about/AboutMePage'
// import UShare from '../common/UShare'
// import share from '../../res/data/share.json'
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
export default class CommonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {},
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
    show(){
        this.setState({
            isVisible:true
        })
    }
    dismiss(){
        this.setState({
            isVisible:false
        })
    }
    // renderMoreView() {
    //     let view = <Popover
    //         isVisible={this.state.isVisible}
    //         fromRect={this.state.buttonRect}
    //         placement="bottom"
    //         contentMarginRight={20}
    //         onClose={()=>this.closePopover()}
    //         contentStyle={{opacity: 0.82, backgroundColor: '#343434'}}
    //         style={{backgroundColor: 'red'}}>
    //         <View style={{alignItems: 'center'}}>
    //             {this.props.menus.map((result, i, arr) => {
    //                 return <TouchableOpacity key={i} onPress={()=>this.onMoreMenuSelect(arr[i])}
    //                                          underlayColor='transparent'>
    //                     <Text
    //                         style={{fontSize: 18, color: 'white', padding: 8, fontWeight: '400'}}>
    //                         {arr[i]}
    //                     </Text>
    //                 </TouchableOpacity>
    //             })
    //             }
    //         </View>
    //     </Popover>
    //     return view;
    // }

    render() {
        
        return(
            <View>
                <Modal
                 transparent={true}
                 visible={this.state.isVisible}
                 onRequestClose={()=>{this.props.onClose()}}
                 >
                  <TouchableOpacity
                style={styles.container}
                onPress={()=>{this.dismiss()}}>
                     <Image source={require('../../src/images/ic_tiaozhuan_up.png')}/>
                     <View  style={styles.content}>
                        <TouchableOpacity
                        onPress={()=>{this.props.onSelect('webView')}}
                        underlayColor={'transparent'}>
                            <View  style={{alignItems:'center',flexDirection:'row'}}>
                             <Image source={require('../../src/images/ic_code.png')}/>
                              <Text style={styles.text}>webview</Text>
                              
                            </View>
                         </TouchableOpacity>
                          <TouchableOpacity
                        onPress={()=>{this.props.onSelect('AboutPage')}}
                        underlayColor={'transparent'}>
                            <View  style={{alignItems:'center',flexDirection:'row'}}>
                             <Image source={require('../../src/images/ic_code.png')}/>
                           <Text style={styles.text}>关于页面</Text>
                              
                            </View>
                         </TouchableOpacity>
                         <TouchableOpacity
                        onPress={()=>{this.props.onSelect('ButtonSet')}}
                        underlayColor={'transparent'}>
                            <View  style={{alignItems:'center',flexDirection:'row'}}>
                             <Image source={require('../../src/images/ic_code.png')}/>
                           <Text style={styles.text}>自定义按钮</Text>
                              
                            </View>
                         </TouchableOpacity>
                         <TouchableOpacity
                        onPress={()=>{this.props.onSelect('share')}}
                        underlayColor={'transparent'}>
                            <View  style={{alignItems:'center',flexDirection:'row'}}>
                             <Image source={require('../../src/images/ic_code.png')}/>
                           <Text style={styles.text}>分享</Text>
                              
                            </View>
                         </TouchableOpacity>
                         
                     </View>
                </TouchableOpacity>
                </Modal>
               
            </View>
            )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'flex-end',
    },
    arrow:{
        marginTop:56,
        width:16,
        height:6
    },
    content:{
        backgroundColor:'white',
        borderRadius:3,
        paddingTop:10,
        paddingBottom:10,
        margin:3
    },
    text:{
        fontSize:16,
        color:'black',
        fontWeight:'400',
        paddingRight:10,
    },
    navbar:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
        
    }
})