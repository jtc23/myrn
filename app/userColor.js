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
  TouchableHighlight,
  ScrollView,
  Modal,
  DeviceEventEmitter
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from '../src/styles/GlobalStyles'
import ThemeFactory,{ThemeFlags} from '../src/styles/ThemeFactory'
import ThemeDao from './expand/dao/ThemeDao'
import ViewUtils from './util/ViewUtils'
import {ACTION_HOME}from './main'
var Dimensions=require('Dimensions');

export default class  UserColor extends Component{
constructor(props) {
  super(props);
        this.themeDao=new ThemeDao();
        
    }
   onSelectTheme(themeKey){
        this.props.onClose();
        this.themeDao.save(ThemeFlags[themeKey]);
        DeviceEventEmitter.emit('ACTION_BASE',ACTION_HOME.A_THEME,ThemeFactory.createTheme(ThemeFlags[themeKey]))
    }
    getThemeItem(themeKey){
        return <TouchableHighlight
            style={{flex:1}}
            underlayColor='white'
            onPress={()=>this.onSelectTheme(themeKey)}
        >
            <View style={[{backgroundColor:ThemeFlags[themeKey]},styles.themeItem]}>
                <Text style={styles.themeText}>{themeKey}</Text>
            </View>
        </TouchableHighlight>
    }
    renderThemeItems(){
        var views=[];
        for (let i=0,keys=Object.keys(ThemeFlags),l=keys.length;i<l;i+=3){
            var key1=keys[i],key2=keys[i+1],key3=keys[i+2];
            views.push(<View key={i} style={{flexDirection:'row'}}>
                {this.getThemeItem(key1)}
                {this.getThemeItem(key2)}
                {this.getThemeItem(key3)}
            </View>)
        }
        return views;
    }
 renderContentView(){
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {this.props.onClose()}}
            >
            <View style={styles.modalContainer}>
                <ScrollView>
                    {this.renderThemeItems()}
                </ScrollView>
            </View>
            </Modal>
        )
    }

    render() {
        let view=<View style={GlobalStyles.root_container}>
            {this.renderContentView()}
        </View>;
        return view;
    }
}

const styles = StyleSheet.create({
    themeItem: {
        flex:1,
        height: 120,
        margin:3,
        padding:3,
        borderRadius:2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex:1,
        margin:10,
        marginTop:Platform.OS==='ios'?20:10,
        backgroundColor:'white',
        borderRadius:3,
        shadowColor:'gray',
        shadowOffset:{width:2,height:2},
        shadowOpacity:0.5,
        shadowRadius:2,
        padding:3
    },
    themeText:{
        color:'white',
        fontWeight:'500',
        fontSize:16
    }
})