import React, { Component } from "react";
import { FontAwesome5 } from '@expo/vector-icons'
import {View,Text, StyleSheet,TextInput, FlatList,Keyboard,ScrollView, ActivityIndicator} from "react-native";


export default class characters extends React.Component {
     constructor(props) {
      super(props);

      this.state = {
      dat: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=d4b1296148adc17e86c2d2acec324ac3&hash=c867cb4ebd84ccbde559d844ef2f5b2d')
    .then((application) => application.json())
    .then((applicationjson) => {
        this.setState({
           dat: applicationjson.data,
           isLoading: false,
        })
        console.log(applicationjson.data.results)
    })
    .catch((error) => {
        console.log(error)
    })

}

    
   render(){
     
       if(this.state.isLoading){
           return(
               <View style = {styles.mainbackground}>
                   <View style = {{alignItems:'center', marginTop: '50%',fontSize: 20, fontWeight: 'bold'}}>
                   <ActivityIndicator></ActivityIndicator>
                   <Text style = {{ fontSize: 20, fontWeight: 'bold'}}>Loading</Text>
               </View>
               </View>
           )
       }

       else{ 
        
            return (
              
            <ScrollView style = {styles.mainbackground}> 
              <View style = {{alignItems: 'center'}}>
                    <Text style = {{fontWeight:'bold', fontSize: 30}}>Marvel Characters</Text>
             </View>
              <View style={{ height: 80, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 20, }}>
                 <View style={styles.shad}>
                     <View style = {{marginLeft:20}}>
                         <FontAwesome5 name="search" size={25} color={'gray'}></FontAwesome5>
                      </View>
                     <TextInput placeholder="Search" style={{ fontSize: 24, marginLeft: 15, flex: 1 }} />
                   </View>
               </View>
               <View>
 
              
               </View>
            </ScrollView>
        )
     }
  }
}
const styles = StyleSheet.create({
    mainbackground: {
      flex: 1,
      backgroundColor:'#fff',
    },
    shad:{
        height: 50, 
        backgroundColor: 'white', 
        flexDirection: 'row', 
        padding: 5, alignItems: 'center',
        borderRadius: 8, 
        shadowColor: "#000",
        shadowOffset: {
          width: 15,
          height: 15,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    
        elevation: 12,
    },
}
)
