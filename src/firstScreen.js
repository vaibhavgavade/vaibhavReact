import React, {Component} from 'react';
import {View,Text,TextInput,StyleSheet,Image,TouchableOpacity,Button,KeyboardAvoidingView,AsyncStorage,SafeAreaView} from 'react-native';
import images from '../Constant/Images';
import Input from '../Component/Input';
import Toptext from '../Component/Toptext';
import RoundButton from '../Component/RoundButton';
import {Ionicons} from '@expo/vector-icons';
import Api from '../Component/Api';




export default class firstScreen extends Component{

    constructor(){
        super();
        this.state = {
            username:'',
            password:'',
            datasource:[]
        }
    }

    static navigationOptions = {
        title:'first Screen'
    }


  LoginMethod() {

        const username=this.state.username;
        const password=this.state.password;


            const method='POST';
            const body=`email=${username}&password=${password}`;
            const url='users/login'
            return Api(url,method,body)
            .then(responseJson=>{
                console.log("Done")
                console.log("response data is:"+responseJson)
                this.setState({
                datasource:responseJson})
                this.mySucessFullData()
            })
            .catch(err=>{
                    console.error(err)
            })
            
};

      mySucessFullData(){
          const {navigate}=this.props.navigation
          if(this.state.datasource.status==200){
             this.saveKey(
            "" + this.state.datasource.data.first_name,
            "" + this.state.datasource.data.last_name,
            "" + this.state.datasource.data.email,
            "" + this.state.datasource.data.access_token
        )
        setTimeout(function() {
            navigate('thirdpage');
          }, 2000);
        }
        else if (this.state.datasource.status == 401) {
            alert("" + this.state.datasource.user_msg);
          } else if (this.state.datasource.status == 400) {
            alert("" + this.state.datasource.user_msg);
          } else {
            alert("Something Went Wrong");
          }
   
        
    }
    async saveKey(value1,value2,value3,value4){
                
        const fname=['@NeoStore_fname',value1];
        const lname=['@NeoStore_lname',value2];
        const email=['@NeoStore_email',value3];
        const acess_token=['@NeoStore_at',value4]
        try{
            await AsyncStorage.multiSet([fname,lname,email,acess_token]);
            console.log('Done')
            

        }
        catch(error){
            console.log(error.message)
        }
    }


  render(){
      
      const{navigate}=this.props.navigation
     
return(
          
           <View style={loginStyle.container}>   
        <View>
        <Toptext>NeoSTORE</Toptext>
        <Input image={images.username} placeholder='Username' onChangeText={(username)=>this.setState({username})}/>
        <Input image={images.password} placeholder='Password'onChangeText={(password)=>this.setState({password})}/>
        <RoundButton onPress={()=>this.LoginMethod()} >Login</RoundButton>
        </View>
        <TouchableOpacity style={loginStyle.passwordLbl} onPress={()=>navigate('lforot')}>
        <Text style={loginStyle.textPassword}>Forot Password</Text>
        </TouchableOpacity>
      
        <View style={loginStyle.Account}>
            <Text style={loginStyle.AccountText}>DONT HAVE AN ACCOUNT</Text>
            <TouchableOpacity onPress={()=>navigate('thirdpage')} style={loginStyle.AccoutBtn} >
                {/* <Image  source={images.Account}/> */}
                <Ionicons name="md-arrow-round-forward" size={30} color="white" />
            </TouchableOpacity>

        </View>
        </View>
        



    )
} 
}

const loginStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#fe3f3f'
    },
    passwordLbl:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20
       
    },
    textPassword:{
        fontSize:25,
        color:'white',
     
        
    },
    Account:{
        flexDirection:'row',
        position:'absolute',
        bottom:30,
        marginHorizontal:5,
     },
     AccountText:{
         fontSize:20,
         color:'white'
    },
    AccoutBtn:{
            paddingLeft:20
    }
})

