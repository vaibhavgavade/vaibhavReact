import React, { Component } from 'react';
import { View, Text ,StyleSheet,Image,ScrollView,TouchableOpacity,Modal,TextInput,KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import images from '../Constant/Images';
import MyRating from '../Component/MyRating'
import {Ionicons} from '@expo/vector-icons';
import context from '../Context/context';
import Api from '../Component/Api'
//import share from 'react-native-share';



export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        productDetailData:[],
        productImages:[],
        bigImage:'',
        modalVisible:false,
        rateModel:false,
     
        defaultRating:1,
        maxRating:5,
        access_token:'',
        quantity:null,

       
       
};

  }

  _hideModal(Bool){
      this.setState({
          modalVisible:Bool
      })
  }
  _rateModal(Bool){
    this.setState({
        rateModel:Bool
    })
}

  static navigationOptions =({navigation})=>({
      backgroundColor:'red',
   
    title:navigation.getParam('ProductTitle'),
    headerTitleStyle:{
      fontSize:15,
     
     
    }
   });



  updateRating(rate){
    this.setState({defaultRating:rate})
}


AddingCartItems(Ab){

    {this.addToCart()}
    {this.setState({modalVisible:!this.state.modalVisible})}
    // Ab.getData()
}
  
addToCart(){
    const {navigation}=this.props
    const quantity = this.state.quantity;
    const product_id = navigation.getParam('productId')
    
        const method = "POST";
        const url = "addToCart"
        const body = `product_id=${product_id}&quantity=${quantity}`
        return Api(url,method,body)
        .then(responseJson=>{
            console.log("Add cart data is:"+responseJson)
        })
        .catch(err=>{
            console.error(err)
        })
      
        
}


  
  componentDidMount(){
    const itemData = this.props.navigation.getParam('productId')
 
        console.log( 'peoduct drtail is is:',itemData)
    
     const product_id = itemData
   


            const method = "GET";
            const url = `products/getDetail?product_id=${product_id}`
           
            return Api(url,method,null)
            .then(responseJson=>{
                this.setState({
                    productDetailData:responseJson.data,
                    productImages:responseJson.data.product_images,
                    bigImage:responseJson.data.product_images[0].image
                })
            }).catch(err=>{
                console.error(err)
            })
};


        productCategory(){
            if (this.state.productDetailData.product_category_id==1){
                return <Text>Category-Tables</Text>
            }else if(this.state.productDetailData.product_category_id==2){
                return <Text>Category-Chairs</Text>
            }else if(this.state.productDetailData.product_category_id==3){
                return <Text>Category-Sofas</Text>
            }else if(this.state.productDetailData.product_category_id==4){
                return <Text>Category-Cupboards</Text>
            }
                    }




          imageData(){
              return this.state.productImages.map((item)=>{
               return(
                        <TouchableOpacity  key={item.image} onpress={()=>this.setState({bigImage:item.image})}>
                <Image style={{width:80,height:80,borderWidth:1,marginLeft:10, marginTop:10}} source={{uri:item.image}}/>
                </TouchableOpacity>
                );
              })
            }
            bigimagedata(){
                if(this.state.productImages.length>0){
                    return(
                       
                            <Image style={{width:257,height:178, paddingTop:10,paddingLeft:30}}  source ={{uri:this.state.bigImage}}/>
                           
                    );
                }
            }
                
            
  render() {
            console.log('product detail data is:',this.state.productDetailData)
            let RatingBar = []
            for(i=1;i<=this.state.maxRating;i++){
                RatingBar.push(
                    <TouchableOpacity activeOpacity={0.7} key={i} onPress={this.updateRating.bind(this,i)}>
                        <Image style={ProductStyle.ratingImg} source={i<=this.state.defaultRating?images.starCheck:images.starUncheck}/>
                     </TouchableOpacity>
        
                )
        
            }

      
    return (
        
 
      <View style={ProductStyle.P} >
         <View>
             <Text style={{fontSize:25, }}>{this.state.productDetailData.name}</Text>
             <Text style={{fontSize:22}}>{this.productCategory()}</Text>
             <View style={{flexDirection:'row'}}>
             <Text style={{fontSize:20}}>{this.state.productDetailData.producer}</Text>
             <MyRating ratings = {this.state.productDetailData.rating}/>
             </View>

              
             </View>

          


 

                <View style={{flex:1,flexDirection:'row',paddingTop:20}}>
                    <View style={{flex:1}}>
             <Text style={{fontSize:20,color:'red'}}>{this.state.productDetailData.cost}</Text>
             </View>
             {/* <View style={{flex:0.1}}> */}
                 <TouchableOpacity >
             {/* <Image source={images.shareImg}/> */}
             <Ionicons name="md-share-alt" size={30} color="#008b8b"/>
             
          </TouchableOpacity>
          {/* </View> */}
          </View>
                        

          <View style={{}}>{this.bigimagedata()}</View>

            <ScrollView style={{paddingTop:5}} horizontal showsHorizontalScrollIndicator={true} >
             {this.imageData()}
             </ScrollView >
          
             <ScrollView style={{height:50}} >
             <Text style={{fontSize:20}}>{this.state.productDetailData.description}</Text>
             </ScrollView>






            <View style={{flex:1,flexDirection:'row', paddingVertical:10}}>
                 <View style={{flex:1,alignContent:'center'}}>
             
             <TouchableOpacity  onPress={()=>{this.setState({modalVisible:true})}} style={{backgroundColor:'red',borderRadius:10,height:41 }} >
                 <Text style={{fontSize:20,alignSelf:'center',paddingVertical:10,color:'white'}}>Buy Now</Text>
              
                  </TouchableOpacity>
     
             </View>
             <View style={{flex:1,paddingLeft:20}}> 
             <TouchableOpacity onPress={()=>{this.setState({rateModel:true})}} style={{backgroundColor:'#808080',borderRadius:10,height:41}}>
                 <Text style={{fontSize:20,textAlign:'center',color:'white',paddingVertical:10 }}>Rate Now</Text>
             </TouchableOpacity>
             </View>

             </View>
         
             
           
        
              <Modal visible={this.state.modalVisible} animationType='slide' transparent={true} >
              <TouchableWithoutFeedback onPressOut={()=>this._hideModal(false)}>
                  
                  <View style={{backgroundColor:'#a9a9a9',flex:1}}>
                 
                  <View style={ProductStyle.modal}>
                      <Text style={ProductStyle.modalatext} >{this.state.productDetailData.name}</Text>
                     
                      <View style={{padding:40}} >{this.bigimagedata()}</View> 

                      <Text style={{fontSize:18,fontWeight:'bold', paddingHorizontal:100}}>Enter Quantity</Text>
                        <View style={{justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                      <TextInput style={ProductStyle.textinput}  onChangeText={(quantity)=>this.setState({quantity:quantity})}/>
                      </View>
                     
                        <View style={ProductStyle.buttonstyles}>
                            <context.Consumer >
                                {contextValue=>(
                                            <TouchableOpacity   onPress={()=>this.AddingCartItems(contextValue) }>
                          
                                            <Text style={{fontSize:30,textAlign:'center',color:'white',fontWeight:'bold'}} >Submit</Text>
                                           
                                        </TouchableOpacity>
                                )}
                      
                      </context.Consumer>
                     
                      </View>
                     
                  </View>
                  
                  </View>
                  </TouchableWithoutFeedback>
              </Modal>

             
                    
        



              <Modal visible={this.state.rateModel} animationType='slide' transparent={true}>
              <TouchableWithoutFeedback onPressOut={()=>this._rateModal(false)}>
                  <View style={{backgroundColor:'#a9a9a9',flex:1}}>
                  <View style={ProductStyle.modal}>
                      <Text style={ProductStyle.modalatext} >{this.state.productDetailData.name}</Text>
                     
                      <View style={{padding:40}} >{this.bigimagedata()}</View> 

                      <View style={ProductStyle.ratingView}>{RatingBar}</View>
                        <View style={ProductStyle.buttonstyles}>
                      <TouchableOpacity   onPress={()=> this.setState({rateModel:!this.state.rateModel})}>
                          
                          <Text style={{fontSize:30,textAlign:'center',color:'white',fontWeight:'bold'}} >Rate Now</Text>
                         
                      </TouchableOpacity>
                        
                     
                      </View>
                     
                  </View>
                  </View>
                  </TouchableWithoutFeedback>
              </Modal>
           



        
              </View >
            
           
   
            
      
    );
  }
}

const ProductStyle = StyleSheet.create({
    P:{
     flex:1,
     padding:20,

     
    },

    modal:{
        flex:1,
         justifyContent:'center',
         alignItems:'center',
        backgroundColor:'white',
     
        marginTop:150,
        marginBottom: 150,
          marginLeft:20,
         marginRight:20,
         borderWidth:2,
         borderColor:'#2f4f4f',
         borderRadius:10

    },
    modalatext:{
        fontSize:25,
        justifyContent:'center',
       alignItems:'center',
       paddingHorizontal:40,
       marginTop:10,
    
      
    },
    buttonstyles:{
        backgroundColor:'red',
        height:60,
        width:200,
        justifyContent:'center',
      
        alignSelf:'center',
        borderRadius:10,
        marginTop:20

      
       
        
    },
    textinput:{
        borderWidth:3,
        borderRadius:10,
        borderColor: '#008000',
        width:120,
        height:50,
        textAlign:'center',
        fontSize:25

       
    },
    ratingView:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:10
    },
    ratingImg:{
        width:50,
        height:50,
        resizeMode:'cover'
    }
});