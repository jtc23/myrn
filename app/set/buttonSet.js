import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Navigator,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box'
import NavigationBar from '../common/NavigatorBar.js';
import ViewUtils from '../util/ViewUtils';
import ArrayUtils from '../util/ArrayUtils'
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
var Dimensions=require('Dimensions');
let { width, height } = Dimensions.get('window');


export default class  ButtonSet extends Component{
	constructor(props){
		super(props);
		 this.isRemoveKey=this.props.isRemoveKey?true:false;
		  this.changeValues = [];
		this.LanguageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
		this.state={
			dataArray:[],
			str:''
		}
	}
	componentDidMount(){
	 
		this.loadData()
		// this.languageDao.getdata(data=>{
		// 	this.setState({
  //               str: data
  //           })
		// })
	
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
    onClick(data) {
    //     if(!this.isRemoveKey)
    	data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues, data)
         this.setState({//重新渲染
            dataArray: this.state.dataArray,
        })

    }
    onSave() {
        if (this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }
        // if(this.isRemoveKey){
        //     for(let i=0,l=this.changeValues.length;i<l;i++){
        //         ArrayUtils.remove(this.state.dataArray,this.changeValues[i]);
        //     }
        // }
        this.LanguageDao.save(this.state.dataArray);
        this.props.navigator.pop();
        // var jumpToTab=this.props.flag===FLAG_LANGUAGE.flag_key?FLAG_TAB.flag_popularTab:FLAG_TAB.flag_trendingTab;
        // DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_RESTART,jumpToTab);
    }
    onBack() {
    	if (this.changeValues.length > 0) {
            Alert.alert(
                '提示',
                '要保存修改吗?',
                [
                    {
                        text: '否', onPress: () => {
                        this.props.navigator.pop();
                    }
                    }, {
                    text: '是', onPress: () => {
                        this.onSave();
                    }
                }
                ]
            )
        } else {
            this.props.navigator.pop();
        }
    }
    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0)return;
        var len = this.state.dataArray.length;
        var views = [];
        for (var i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
            </View>
        )
        return views;

    }
    renderCheckBox(data) {
        let leftText = data.name;
        let isChecked =data.checked;
        return (
            <CheckBox
                style={{flex: 1, padding: 10,alignItems:"center"}}
                onClick={()=>this.onClick(data)}
                isChecked={isChecked}
                leftText={leftText}
                checkedImage={<Image source={require('../../src/images/ic_check_box.png')}
                                     />}
                unCheckedImage={<Image source={require('../../src/images/ic_check_box_outline_blank.png')}
                                      />}
            />);
    }
	render(){
		
		return(
			<View style={styles.container}>
			<NavigationBar 
			title={'自定义按钮'}
			leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
			rightButton={ViewUtils.getRightButton('save',()=>this.onSave())}
			/>

					{this.renderView()}
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
	},
	item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
});