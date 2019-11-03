/**
 * WebViewPage
 * @flow
 **/
'use strict'
import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    WebView,
    Platform,
    TouchableOpacity,
    Text,
    TextInput,
    View,
} from 'react-native'
import ViewUtils from './util/ViewUtils';
import NavigationBar from './common/NavigatorBar'
import GlobalStyles from '../src/styles/GlobalStyles'


export default class WebViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://m.baidu.com',
            canGoBack: false,
            title: 'webView',
            text:''
        }
    }
        onBack() {
            this.props.navigator.pop();
    }
    onBackPress(e) {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack
        });
    }
    goBack(){
        if(this.state.canGoBack){
            this.webView.goBack()
        }else{
            alert('到顶了')
        }
    }
    goUrl(){
        this.setState({
            url: this.state.text,
        });
    }

    render() {
        
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                   leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    rightButton={ViewUtils.getRightButton('save',()=>this.onSave())}
                    title={this.state.title}
                />
                <View style={styles.webViewstyle}>
                    <Text style={styles.tips}
                            onPress={()=>{this.goBack()}}
                            >返回</Text>
                    <TextInput style={styles.inputstyle} 
                                defaultValue={this.state.url}
                                onChangeText={(text)=>{
                                    this.setState({
                                        text:text,
                                    });
                                } }/>
                    <Text style={styles.tips} 
                        onPress={()=>{this.goUrl()}}
                    >前往</Text>
                </View>
                <WebView
                    ref={webView=>this.webView=webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}/>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    webViewstyle:{
        justifyContent:'space-between',
        flexDirection:'row',
        height:40,
        margin:10
    },
    inputstyle:{
        width:200,
        height:40
    },
    tips:{
        marginTop:10
    }
});