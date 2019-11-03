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
  ScrollView,
  TouchableOpacity,
  ListView,
  RefreshControl
} from 'react-native';

import HttpUtils from '../util';
import ListViewtable from './listViewTable.js';
import Toast, {DURATION} from 'react-native-easy-toast'
var Dimensions=require('Dimensions');
let { width, height } = Dimensions.get('window');
const col=3;
const boxwidth=100;
let marGin=(width-col*boxwidth)/(col+1)

export default class  Profile extends Component{
	constructor(props){
		super(props);
		 const getSectionHeaderData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${sectionId}:${rowId}`];
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData,
      getRowData,
    }); 
		this.state={
			isLoading:true,
			data:'',
			dataSource:ds

		}

	}

	load(url){
		HttpUtils.get(url)
		.then(result=>{
			this.setState({
				data:result.list
			})
		})
		.then(()=>{this.controldata()})
			// .catch((error) => {
	  //     	alert(error);
	  //  		 });
		}
	onLoad(){
		setTimeout(()=>{
			this.setState({
				isLoading:false
			})
		},2000)
	}
	controldata(){
		let list=this.state.data;
		let dataBlob={};
		let sectionIDs=[];
		let rowIDs=[];
		let user=[];
		for (let i=0;i<list.length;i++){
			let organization = list[i];
			sectionIDs.push(i);
			dataBlob[i]=list[i].title;
			rowIDs[i] = [];
			user=list[i].row;
			for (let j=0;j<user.length;j++){
				rowIDs[i].push(j);
				dataBlob[i+':'+j]=user[j]
			}
		}
		this.setState({
			 dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
		});
	}

	render(){
		if(this.state.dataSource){
			return(
				<View style={styles.container}>
		<TouchableOpacity onPress={()=>{this.load('http://rap2api.taobao.org/app/mock/233634/myrn/news')}}>
			<Text>点击加载</Text>
		</TouchableOpacity>	
				 <ListView
			        dataSource={this.state.dataSource}
			        renderRow={(rowData) => this.renderRow(rowData)}
			          renderSectionHeader={(sectionData, sectionID)=>this.renderSectionHeader(sectionData, sectionID)}
			         renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
                        this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)
                    }
			         refreshControl={
                        <RefreshControl refreshing={this.state.isLoading} 
                        				onRefresh={() => this.onLoad()}/>
                    }
                    renderFooter={() => this.renderFooter()}
			        />
			        	<Toast ref={toast=>{
			        		this.toast=toast
			        	}}/>

			</View>
			)
		}else{
			return(
				<View>
				<Text> loading</Text>
				<TouchableOpacity onPress={()=>{this.load('http://rap2api.taobao.org/app/mock/233634/myrn/news')}}>
					<Text>点击加载</Text>
				</TouchableOpacity>	
				</View>
				)
		}

		
		
	}

 renderSectionHeader(sectionData, sectionID) { // 渲染Section部分
    return (
      <View style={styles.textstyle}>
        <Text style={styles.textstyle}>{sectionData}</Text>
      </View>
    );
  }
renderRow(rowData, sectionID, rowID){
    return(
      <View key={rowData.id} style={{height:40,width:width,alignItems:'center',justifyContent:'center',backgroundColor:'#f0f0f0'}}>
      <TouchableOpacity onPress={()=>{
      	this.toast.show('你点击了'+rowData.id,3000);
      }}>
      <Text  style={{fontSize: 15, color: 'black'}} >{rowData.name}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
  	return(<View style={styles.line}>
  	</View>
  	)
  	
  }
renderFooter(){
	return(
		<Image style={{width:width,height:100}} source={{uri:'https://www.baidu.com/img/bd_logo1.png'}} />
		)
}

}

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems:'center',
		backgroundColor:'#dddddd'
	},
	line:{
		height:1,
		backgroundColor:'black'
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