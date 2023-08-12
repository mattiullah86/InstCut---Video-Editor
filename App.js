import React,{useState,useEffect} from "react";
import {View,Text,Image,StyleSheet,ImageBackground,ActivityIndicator, Button} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import ImagePicker from 'react-native-image-crop-picker';
import {RNFFmpeg} from "react-native-ffmpeg";
import Edit from "./Edit";

function Home({navigation}){
  const [data,setData]=useState(true);
  const [myrand,setRand]=useState();
  const [onerr,setoneErr]=useState(false);
  const [err,setErr]=useState(false);

  var one="";
  var two="";
  var three="";
  var four="";
  var five="";
  var num="";
  var duration=0;
  var arr=new Array();
  var arr2=new Array();
  function fun(){
    RNFFmpeg.execute(`${four} -filter_complex "${two}concat=n=${num}:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -crf 28 ${arr[0]}_${myrand}.mp4`).then(result=>{
      console.warn(result);
      navigation.navigate("Edit",{"video":`${arr[0]}_${myrand}.mp4`,"duration":duration});
      setData(true);
    })
  }

   function open(){
    setData(false)
    ImagePicker.openPicker({
      multiple:true,
      mediaType:"video",
    }).then(data => {
      var len=data.length;
      if(len==1){
        setData(true)
        setErr(false);
        setoneErr(false);

        navigation.navigate("Edit",{"video":data[0].path,"duration":data[0].duration});
      }
      else if(len>1){

        data.map((data,i)=>{
          duration=duration+data.duration;
          arr.push(data.path);
          one=one+` -i ${data.path} `
          two=two+`[${i}:v][${i}:a]`;
          three=three+` -i ${data.path} -vf scale=480:360:force_original_aspect_ratio=decrease,pad=480:360:(ow-iw)/2:(oh-ih)/2,setsar=1 -preset ultrafast -crf 28 -y ${data.path}_${i}.mp4 &`
          arr2.push(`-i ${data.path} -vf scale=480:360:force_original_aspect_ratio=decrease,pad=480:360:(ow-iw)/2:(oh-ih)/2,setsar=1 -preset ultrafast -crf 28 -y ${data.path}_${i}.mp4`);
          four=four+` -i ${data.path}_${i}.mp4 `
          five=`${data.path}_${i}.mp4`;
          num=i;
        })
        const min = 5000000;
        const max = 9000000;
        const rand = Math.floor(min + Math.random() * (max - min));
        setRand(rand);
        num=num+1
         
        function play(i){
          RNFFmpeg.execute(`-i ${arr[i]} -f lavfi -t 0.1 -i anullsrc -vf scale=480:360:force_original_aspect_ratio=decrease,pad=480:360:(ow-iw)/2:(oh-ih)/2,setsar=1 -preset ultrafast -crf 28 -y ${arr[i]}_${i}.mp4`).then(result=>{
            if(i==num){ 
              fun();
              return false;
            }
            setErr(false);
            setoneErr(false);
            play(i+1);
          }).catch((err)=>{
            setErr(true);
            setoneErr(true);
            setData(true);
          })
        }
        
        play(0);

      }
  
    }).catch((err)=>{
      setData(true);
      
    })
  }


  return(
    (data)?<View style={{flex:1,backgroundColor:"#28282B",alignItems:"center"}}>
      <View style={{top:20}}>
        <Image source={require("./image/addicon.png")} style={styles.topimg}/>
      </View>

        <View style={{width:"80%",padding:30,top:20}}>
         <Button title="New Project" onPress={open}/>
        </View>

        {(err && onerr)?<Text style={styles.texttwo}>Please remove white spaces from your video name or rename your video e.g: "vide.mp4" in order to procceed</Text>:null}
    </View>:
    <View>
    <ActivityIndicator size={"large"} color="green" style={{alignItems:"center",justifyContent:"center",marginTop:"50%"}}/>
    <Text style={{textAlign:"center"}}>Processing...</Text>
    <Text style={{textAlign:"center"}}>Keep Patient.It takes few time</Text>
    
    </View>
  )
}



const Stack=createStackNavigator();

function App(){

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles=StyleSheet.create({
  bgimage:{
    flex:1,
    resizeMode:"cover"
  },
  topimg:{
    width:150,
    height:150,
    
  },
  text:{
    fontSize:25,
    borderColor:'grey',
    borderWidth:4,
    textAlign:'center',
    color:'white',
    backgroundColor:'grey',
    width:"60%",
    marginLeft:"20%",
    marginTop:40,
    padding:10,
    borderRadius:10
  },
  texttwo:{
    fontSize:25,
    borderColor:'white',
    borderWidth:2,
    color:'red',
    backgroundColor:'white',
    marginLeft:10,
    marginTop:40,
    padding:15
  }
})

export default App;

