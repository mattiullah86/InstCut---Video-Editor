import React, { useState,useRef, useEffect} from "react";
import {View,Modal,PermissionsAndroid,Text,StyleSheet,ScrollView,ActivityIndicator,Image, Dimensions, Pressable,Button, TouchableOpacity} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import VideoPlayer from "react-native-video-player";
import AsyncStorage from '@react-native-community/async-storage';
import {RNFFmpeg, RNFFprobe} from "react-native-ffmpeg";
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from "react-native-document-picker";
import SoundPlayer from "react-native-sound-player";
import RNFS from "react-native-fs";
import { TextInput } from "react-native-gesture-handler";
import ColorPicker from 'react-native-wheel-color-picker'

var next=0;
var prev=0;
var mywidth=0;


function Edit({route}){
    
    var [duration,setDuration]=useState(Math.floor(route.params.duration/1000));
    const [tempduration,settempDuration]=useState(Math.floor(route.params.duration/1000));
    const [videopath,setvideoPath]=useState(route.params.video);
    const [rand,setRender]=useState(true);
    const [time,setTime]=useState(0);
    const [position,setPosition]=useState([]);
    const [justpos,setPos]=useState([]);
    const [full,setFull]=useState();
    const [myvalue,setValue]=useState();
    const [tempone,settempOne]=useState();
    const [temptwo,settempTwo]=useState();
    const [timeone,settimeOne]=useState(0);
    const [timetwo,settimeTwo]=useState(0);
    const [show,setShow]=useState(false);
    const [load,setLoad]=useState(false);
    const [block,setBlock]=useState(false);
    const [shownot,setshowNot]=useState(false);
    const [secondpath,setsecondPath]=useState();
    const [secondduration,setsecondDuration]=useState(0);
    const [secondpos,setsecondPos]=useState([]);
    const [secondposition,setsecondPosition]=useState([]);
    const [secondtimeone,setsecondtimeOne]=useState([]);
    const [count,setCount]=useState(0);
    const [checktwo,setcheckTwo]=useState(0);
    const [checkme,setcheckMe]=useState(1);
    const [transition,setTransition]=useState(false);
    const [transitiontime,setTransitiontime]=useState(0);
    const [onetime,setoneTime]=useState(0);
    const [secondvalue,setsecondvalue]=useState(0);
    const [lastpath,setlastpath]=useState();
    const [filterfull,setfilterfull]=useState(false);
    const [myfilterpart,setfilterpart]=useState(false);
    const [path,setpath]=useState(0);
    const [progresstime,setprogresstime]=useState(0);
    const [again,setagain]=useState(0);
    const [wave,setwave]=useState(false);
    const [musicoption,setmusicoption]=useState(false);
    const [audiooption,setaudiooption]=useState(false);
    const [musicvolume,setmusicvolume]=useState(false);
    const [musicfade,setmusicfade]=useState(false);
    const [fadein,setfadein]=useState(0.0);
    const [fadeout,setfadeout]=useState(0.0);
    const [musicduration,setmusicduration]=useState(0);
    const [effect,seteffect]=useState(false);
    const [poseffect,setPoseffect]=useState([]);
    const [positioneffect,setPositioneffect]=useState([]);
    const [pausevideo,setpausevideo]=useState(false);
    const [audiovideooption,setaudiovideooption]=useState(false);
    const [mutevideoaudio,setmutevideoaudio]=useState(false);
    const [format,setformat]=useState(false);
    const [originalvideopath,setoriginalvideopath]=useState("");
    const [overlay,setoverlay]=useState(false);
    const [chroma,setchroma]=useState(false);
    const [colorpicker,setcolorpicker]=useState(false);
    const [speed,setspeed]=useState(false);
    const [speedvalue,setspeedvalue]=useState(0.5);
    const [speedpart,setspeedpart]=useState(false);
    const [myflip,setmyflip]=useState(false);
    const [checkflip,setcheckflip]=useState(false);
    const [flipvideooriginal,setflipvideooriginal]=useState();
    const [flipmecheck,setflipmecheck]=useState(false);
    const [oneangle,setoneangle]=useState(true);
    const [twoangle,settwoangle]=useState(false);
    const [threeangle,setthreeangle]=useState(false);
    const [fourangle,setfourangle]=useState(false);
    const [reverse,setreverse]=useState(false);
    const [reversevideooriginal,setreversevideooriginal]=useState();
    const [checkreverse,setcheckreverse]=useState(false);
    const [reversemecheck,setreversemecheck]=useState(false);
    const [text,settext]=useState(false);
    const [textchange,settextchange]=useState();
    const [downstatetext,setdownstatetext]=useState(0);
    const [rightstatetext,setrightstatetext]=useState(0);
    const [sizechange,setsizechange]=useState(30);
    const [textcolor,settextcolor]=useState("yellow");
    const [temptextcolor,settemptextcolor]=useState("yellow");
    const [textduration,settextduration]=useState(3);
    const [Subtitle,setsubtitle]=useState(false);
    const [addtext,setaddtext]=useState(false);
    const [addtextchange,setaddtextchange]=useState();
    const [addtextduration,setaddtextduration]=useState(3);
    const [addtemptextcolor,setaddtemptextcolor]=useState(0);
    const [addtextcolor,setaddtextcolor]=useState();
    const [videoeffect,setvideoeffect]=useState(false);
    const [myeffect,setmyeffect]=useState(false);
    const [effectduration,seteffectduration]=useState(3);
    const [modalVisible, setModalVisible] = useState(false);
    const [volumeofmusic,setvolumeofmusic]=useState(1);
    const [showprogress,setshowprogress]=useState("0/0");

    const ref=useRef();
        var arr=[];
        var arr2=[];
        var arr3=[];
        const value=useRef("");
        const check=useRef(true);
        var j=0;
        var num=0;
        var numme=0;
        var checknum=1;
        var calc=0;
        var musicarr=[];

    function videoValue(e){
        setTime(e[0])
        setoneTime(new Date(e[0] * 1000).toISOString().substr(11, 8));
        setprogresstime(e[0]);
        SoundPlayer.seek(e[0]);
        if(again==0){
          SoundPlayer.play();
        }
        
    }
        
    
    function renderimg(){
            for(var i in arr2){
                arr.push(
                    <View style={{flex:1,marginTop:150}} key={`video-thumb-${i}`}>
                    <Image source={{uri:`${arr2[i]}`}} style={{width:41,height:70}} />
                    </View>
                );
            } 
            return arr;
    }
    
    async function trim(e){
      if(shownot){
          if(checkme<=2){
             
          secondpos.sort();
          var myvalue=await AsyncStorage.getItem("leftmarkposition");
          var flag=0;
      for(var i in secondpos){
          if(secondpos[i].pos>myvalue){
              flag=1;
              alert("Can't trim previous part");
              break;
          }
      }
      var flagtwo=0;
      if(secondpos.length==1){
          if(((timetwo-timeone)+1)!=(secondduration-secondtimeone[0])+1){
              flagtwo=1;
              alert("Trim just "+((timetwo-timeone)+1)+" sec part");
          }
      }
  
     if(flag==0 && flagtwo==0){
          if(duration<=1){
              alert("duration must be greater than 1 sec");
          }
          else{
              const value=await AsyncStorage.getItem("leftmarkposition");
              setsecondPos((secondpos)=>[...secondpos,{"pos":Number(value),"num":secondduration,"left":Number(value)}])
              setsecondPosition((secondposition)=>[...secondposition,<View  style={[styles.Labeltwo,{ left: Number(value)}]} key={Number(value)}>
          <Text onPress={()=>transition()} style={styles.LabelTexttwo}></Text>
        </View>])
        setcheckTwo(1);
        if(checktwo==1){
          checknum+=2;
          setcheckMe(checknum);
        }
        setsecondtimeOne((secondtimeone)=>[...secondtimeone,secondduration]);
          }
      }
      flag=0;
  }
   else{
          alert("Trim only one part")
  }
      }
      else{
      justpos.sort();
      var myvalue=await AsyncStorage.getItem("leftmarkposition");

      var flag=0;
      for(var i in justpos){
          if(justpos[i].pos>myvalue){
              flag=1;
              alert("Can't trim previous part");
              break;
          }
      }
  
      if(flag==0){
          if(duration<=1){
              alert("duration must be greater than 1 sec");
          }
          else{
          const value=await AsyncStorage.getItem("leftmarkposition");
          setValue(value);
          setPos((justpos)=>[...justpos,{"pos":Number(value),"num":time,"left":Number(value)}]);
              setPosition((position)=>[...position,<View  style={[styles.Label,{ left: Number(value)}]} key={Number(value)}>
               <Text onPress={()=>showtransition(time)} style={styles.LabelText}>+</Text>
               </View>])
          
          }
          
      }
      flag=0;
      }
  }
    
    function checkin(e){
        justpos.sort();
        setTransition(false);
        var x=e.nativeEvent.locationX;
        if(justpos.length!=0){
            var flag=0;
            for(var i in justpos){
                if(justpos[i].pos>x){
                    flag=1;
                    setShow(true);
                    var nextleft=justpos[i].left;
                    var prevleft=(justpos[i-1]==undefined)?0:justpos[i-1].left;
                    if(prevleft==0){
                    settempOne(<View style={{backgroundColor:"black",width:3,height:"5%",left:prevleft+18,position:"absolute",top:300}}></View>);
                    }
                    else{
                    settempOne(<View style={{backgroundColor:"black",width:3,height:"5%",left:prevleft+2.5,position:"absolute",top:300}}></View>);
                    }
                    settempTwo(<View style={{backgroundColor:"black",width:3,height:"5%",left:nextleft+2,position:"absolute",top:300}}></View>)
                    var temptimeone=(justpos[i-1]==undefined)?0:justpos[i-1].num;
                    settimeOne(temptimeone);
                    settimeTwo(justpos[i].num);
                    
                    break;
                }
            }
            if(flag==0){
                    setShow(true);
                    var prevleft=justpos[justpos.length-1].left;
                    settempOne(<View style={{backgroundColor:"black",width:3,height:"5%",left:prevleft+2.5,position:"absolute",top:300}}></View>);
                    settempTwo(<View style={{backgroundColor:"black",width:3,height:"5%",left:(Dimensions.get("window").width-20)+2,position:"absolute",top:300}}></View>)
                    var temptimeone=(justpos[i-1]==undefined)?0:justpos[i-1].num;
                    settimeOne(justpos[justpos.length-1].num);
                    settimeTwo(duration);
            }
        }
    }
    
    async function deletepartvideo(){
        if(block){
            return false;
        }
        justpos.sort();
        var one=timeone;
        var two=timetwo;
        if(one==undefined && two==undefined){
            alert("Select triming area");
        }
        else if(false){
            alert("Can't delete whole video");
        }
        else{
        setLoad(true);
        setshowprogress("1/1");
        setBlock(true);
      var statement=`-i ${videopath} -vf  "select='not(between(t,${one-1},${two}))',  setpts=N/FRAME_RATE/TB" -af "aselect='not(between(t,${one-1},${two}))', asetpts=N/SR/TB" -preset ultrafast -y ${videopath}_restvideo.mp4`;
      var res=await RNFFmpeg.execute(statement);
      var dur=await RNFFprobe.getMediaInformation(`${videopath}_restvideo.mp4`);
      var mydur=Math.floor(dur.getAllProperties().format.duration);
      setshowprogress("almost done...");
      if(res==0){
      
        setDuration(mydur);
        setvideoPath(`${videopath}_restvideo.mp4`);
        if(justpos.length<=1){
            setPos([]);
            setPosition([]);
        }
        else{
            for(var i=0;i<justpos.length-1;i++){
                if(justpos[i].num==one){
                    if(two==duration){
                        try {
                            justpos.pop(i-1);
                            position.pop(i-1);
                        } catch (error) {
                            console.warn("error");
                        }
                    }
                    else{
                        justpos.pop(i);
                        position.pop(i);
                        try {
                            justpos.pop(i+1);
                            position.pop(i+1);
                        } catch (error) {
                            console.warn("error");
                        }
                    }
                    
                    setPos(justpos);
                    setPosition(position);
                    break;
                }
            }
        }
        settempOne();
        settempTwo();
      }
      setBlock(false);
      setshowprogress("");
      setLoad(false);
        }
      setShow(false);
      setLoad(false);
    
    }
    
    function goprevious(){
        if(block){
            return false;
        }
        setShow(false)
        settempOne();
        settempTwo();
    }
    
    function replaceparttvideo(){
        setCount(0);
        setcheckTwo(0);
        setcheckMe(1);
        setsecondDuration(0);
        setsecondtimeOne([]);
        setsecondPos([]);
        setsecondPosition([]);
        ImagePicker.openPicker({
            multiple:false,
            mediaType:"video",
          }).then(data=>{
            setsecondPath(data);
            setsecondDuration(Math.floor(data.duration/1000));
            setshowNot(true);
          })
            
    }
    
    function secondvideoValue(e){
        setsecondvalue(new Date(e[0] * 1000).toISOString().substr(11, 8));
        if(checktwo==1){
            if(e[0]==0){
                secondtimeone[0]=0;
                calc=e[0]-secondtimeone[0];
            }
            else{
                calc=e[0]-secondtimeone[0];
            }   
            console.warn(secondtimeone[0])
            if(calc>(timetwo-timeone+1)){
                setCount("limit excceed");
            }
            else{
        setCount(new Date((calc+1) * 1000).toISOString().substr(11, 8));
            }
        }
        setsecondDuration(e[0]);
    }
    
    async function replacevideome(){
        
        if(secondtimeone.length!=2){
            alert("select 2 trim part");
        }
        else{
        setLoad(true);
        setshowprogress("1/4");
        var dur=await RNFFprobe.getMediaInformation(`${videopath}`)
        var height=dur.getAllProperties().streams[0].height;
        var width=dur.getAllProperties().streams[0].width;
        var statement=`-ss ${secondtimeone[0]} -i ${secondpath.path} -t ${secondtimeone[1]-secondtimeone[0]+1} -c copy -preset ultrafast -y ${secondpath.path}_first.mp4`;
        var resone=await RNFFmpeg.execute(statement);
        setshowprogress("2/4");
        var statementtwo=`-i ${secondpath.path}_first.mp4 -vf scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2,setsar=1 -max_muxing_queue_size 9999 -preset ultrafast -y ${secondpath.path}_new.mp4`
        var restwo=await RNFFmpeg.execute(statementtwo); 
        var statementtwo=`-i ${secondpath.path}_new.mp4 -f lavfi -t 0.1 -i anullsrc -c:v copy -preset ultrafast -y ${secondpath.path}_second.mp4`
        var resthree=await RNFFmpeg.execute(statementtwo);
        
        if(timeone==0){
            setshowprogress("3/4");
            var mystatone=`-ss ${timetwo+1} -i ${videopath} -t ${duration-timetwo} -c copy -preset ultrafast -y ${videopath}_one.mp4`;
            var res=await RNFFmpeg.execute(mystatone);
            var statementtwo=`-i ${videopath}_one.mp4 -f lavfi -t 0.1 -i anullsrc -c:v copy -preset ultrafast ${videopath}_size.mp4`
            var restwo=await RNFFmpeg.execute(statementtwo);
            setshowprogress("4/4");
            var a=`-i ${secondpath.path}_second.mp4 -i  ${videopath}_size.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -y ${videopath}_replace.mp4`;
            var res=await RNFFmpeg.execute(a);
        }
        else if(timetwo==duration){
          setshowprogress("3/4");
            var mystattwo=`-ss 0 -i ${videopath} -t ${timeone-1} -c copy -preset ultrafast -y ${videopath}_one.mp4`;
            var res=await RNFFmpeg.execute(mystattwo);
            var statementtwo=`-i ${videopath}_one.mp4 -f lavfi -t 0.1 -i anullsrc -c:v copy -preset ultrafast ${videopath}_size.mp4`
            var restwo=await RNFFmpeg.execute(statementtwo);
            setshowprogress("4/4");
            var a=`-i  ${videopath}_size.mp4 -i ${secondpath.path}_second.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -y ${videopath}_replace.mp4`;
            var res=await RNFFmpeg.execute(a);
        }
        else{
          setshowprogress("3/4");
            var statementtwo=`-i ${videopath} -f lavfi -t ${duration} -i anullsrc -c:v copy -preset ultrafast ${videopath}_sizeone.mp4`
            var restwo=await RNFFmpeg.execute(statementtwo);
            var mystattwo=`-ss 0 -i ${videopath}_sizeone.mp4 -t ${timeone-1} -c copy -preset ultrafast -y ${videopath}_one.mp4`;
            var res=await RNFFmpeg.execute(mystattwo);
            setshowprogress("4/4");
            var mystattwo=`-ss ${timetwo+1} -i ${videopath}_sizeone.mp4 -t ${duration-timetwo} -c copy -preset ultrafast -y ${videopath}_two.mp4`;
            var res=await RNFFmpeg.execute(mystattwo);
            var a=`-i ${videopath}_one.mp4 -i ${secondpath.path}_second.mp4 -i ${videopath}_two.mp4  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -y ${videopath}_replace.mp4`;
            var res=await RNFFmpeg.execute(a);
        }
        
        if(secondtimeone.length!=2){
            alert("select 2 trim part");
        }
        else{
        var dur=await RNFFprobe.getMediaInformation(`${videopath}_replace.mp4`);
        var mydur=Math.floor(dur.getAllProperties().format.duration);
        console.warn(mydur);
        setDuration(mydur);
        setvideoPath(`${videopath}_replace.mp4`);
        setCount(0);
        setcheckTwo(0);
        setcheckMe(1);
        setsecondDuration(0);
        setsecondtimeOne([]);
        setsecondPos([]);
        setsecondPosition([]);
        setLoad(false);
        setshowNot(false);
        }
    }  
    }
    
    function goprevioustransition(){
        setTransition(false);
    }
    
    
    
    
    
    async function duplicatepartvideo(){
        setLoad(true);
    
    
        if(timeone==0){
            setshowprogress("1/3");
            var statementtwo=`-i ${videopath} -f lavfi -t ${duration} -i anullsrc -c:v copy -preset ultrafast -y ${videopath}_sizeone.mp4`
            var restwo=await RNFFmpeg.execute(statementtwo);
            setshowprogress("2/3");
            var mystatone=`-ss 0 -i ${videopath}_sizeone.mp4 -t ${timetwo} -preset ultrafast -c copy -y ${videopath}_one.mp4`;
            var res=await RNFFmpeg.execute(mystatone);
            var mystatone=`-ss ${timetwo} -i ${videopath}_sizeone.mp4 -t ${duration} -preset ultrafast -c copy -y ${videopath}_two.mp4`;
            var res=await RNFFmpeg.execute(mystatone);
            setshowprogress("3/3");
            var a=`-i ${videopath}_one.mp4 -i  ${videopath}_one.mp4 -i ${videopath}_two.mp4 -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -y ${videopath}_duplicate.mp4`;
            var res=await RNFFmpeg.execute(a);
           
        }
        else if(timetwo==duration){
            console.warn(timeone+" "+timetwo);
            setshowprogress("1/3");
            var statementtwo=`-i ${videopath} -f lavfi -t ${duration} -i anullsrc -c:v copy -preset ultrafast -y ${videopath}_sizeone.mp4`
            var restwo=await RNFFmpeg.execute(statementtwo);
            setshowprogress("2/3");
            var mystattwo=`-ss 0 -i ${videopath}_sizeone.mp4 -t ${timeone} -preset ultrafast -c copy -y ${videopath}_one.mp4`;
            var res=await RNFFmpeg.execute(mystattwo);
            var mystatone=`-ss ${timeone} -i ${videopath}_sizeone.mp4 -t ${duration} -preset ultrafast -c copy -y ${videopath}_two.mp4`;
            var res=await RNFFmpeg.execute(mystatone);
            setshowprogress("3/3");
            var a=`-i  ${videopath}_one.mp4 -i ${videopath}_two.mp4 -i ${videopath}_two.mp4 -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -y ${videopath}_duplicate.mp4`;
            var res=await RNFFmpeg.execute(a);
            
        }
        else{
            setshowprogress("1/3");
            var statementtwo=`-i ${videopath} -f lavfi -t ${duration} -i anullsrc -c:v copy -preset ultrafast -y ${videopath}_sizeone.mp4`
            var restwo=await RNFFmpeg.execute(statementtwo);
            setshowprogress("2/3");
            var mystattwo=`-ss 0 -i ${videopath}_sizeone.mp4 -t ${timeone} -preset ultrafast -c copy -y ${videopath}_one.mp4`;
            var res=await RNFFmpeg.execute(mystattwo);
            var mystattwo=`-ss ${timetwo} -i ${videopath}_sizeone.mp4 -t ${duration} -preset ultrafast -c copy -y ${videopath}_two.mp4`;
            var res=await RNFFmpeg.execute(mystattwo);
            var statthree=`-ss ${timeone} -i ${videopath}_sizeone.mp4 -t ${timetwo-timeone} -preset ultrafast -c copy -y ${videopath}_three.mp4`
            var res=await RNFFmpeg.execute(statthree);
            setshowprogress("3/3");
            var a=`-i ${videopath}_one.mp4 -i ${videopath}_three.mp4 -i ${videopath}_three.mp4 -i ${videopath}_two.mp4 -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a][3:v][3:a]concat=n=4:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -y ${videopath}_duplicate.mp4`;
            var res=await RNFFmpeg.execute(a);
        }
    
        
        setLoad(false);
        var dur=await RNFFprobe.getMediaInformation(`${videopath}_duplicate.mp4`);
        var mydur=Math.floor(dur.getAllProperties().format.duration);
        setDuration(mydur);
        setPos([]);
        setPosition([]);
        setvideoPath(`${videopath}_duplicate.mp4`);
    
    }
    
    
    
    
    
    async function showtransition(time){
        setTransition(true);
        setTransitiontime(time);
        
    }
    
    async function gotransition(value){
        
        console.warn(value+" "+transitiontime);
        if(transitiontime==0){
            alert("can't apply transition at 0 second");
        }
        else if(transitiontime==duration){
            setLoad(true);
            setshowprogress("1/3");
            var now=`-i ${videopath} -f lavfi -t ${duration} -i anullsrc -c:v copy -preset ultrafast -y ${videopath}_newone.mp4`
            var res=await RNFFmpeg.execute(now);
            setshowprogress("2/3");
            var mystatone=`-ss 0 -i ${videopath}_newone.mp4 -t ${transitiontime} -c copy -preset ultrafast -y ${videopath}_one.mp4`;
            var res=await RNFFmpeg.execute(mystatone);
            console.warn("res1"+res);

            var mystatone=`-ss ${transitiontime} -i ${videopath}_newone.mp4 -t ${duration} -c copy -preset ultrafast -y ${videopath}_two.mp4`;
            var res=await RNFFmpeg.execute(mystatone);
            console.warn("res2"+res);
            setshowprogress("3/3");
            var trans=`-i ${videopath}_one.mp4 -i ${videopath}_two.mp4 -filter_complex "xfade=transition=${value}:duration=1:offset=${transitiontime-1},format=yuv420p;acrossfade=duration=1" -preset ultrafast -y ${videopath}_transition.mp4`
            var res=await RNFFmpeg.execute(trans);
            console.warn("res3"+res);

            setvideoPath(`${videopath}_transition.mp4`);
            setTransition(false);
            setLoad(false);
        }
        else{
            console.warn(transitiontime);
            setLoad(true);
            setshowprogress("1/3");
            var now=`-i ${videopath} -f lavfi -t ${duration} -i anullsrc -c:v copy -preset ultrafast -y ${videopath}_newone.mp4`
            var res=await RNFFmpeg.execute(now);
            setshowprogress("2/3");
            var mystatone=`-ss 0 -i ${videopath}_newone.mp4 -t ${transitiontime} -c copy -preset ultrafast -y ${videopath}_one.mp4`;
            var res=await RNFFmpeg.execute(mystatone);
            
            var mystatone=`-ss ${transitiontime} -i ${videopath}_newone.mp4 -t ${duration} -c copy -preset ultrafast -y ${videopath}_two.mp4`;
            var res=await RNFFmpeg.execute(mystatone);
            setshowprogress("3/3");
            var trans=`-i ${videopath}_one.mp4 -i ${videopath}_two.mp4 -filter_complex "xfade=transition=${value}:duration=1:offset=${transitiontime-1},format=yuv420p;acrossfade=duration=1" -preset ultrafast -y ${videopath}_transition.mp4`
            var res=await RNFFmpeg.execute(trans);
            console.warn("res3"+res);

            setvideoPath(`${videopath}_transition.mp4`);
            setTransition(false);
            setLoad(false);
        }
        
    
    }
    
    async function addlast(){
      var data=await ImagePicker.openPicker({
        multiple:false,
        mediaType:"video",
      })
      console.warn(data);
      setlastpath(data.path);
      setLoad(true);
      setshowprogress("1/3");
      var dur=await RNFFprobe.getMediaInformation(`${videopath}`)
      var height=dur.getAllProperties().streams[0].height;
      var width=dur.getAllProperties().streams[0].width;
      if(data.mime=="image/jpeg" || data.mime=="image/png" || data.mime=="image/jpg" || data.mime.startsWith("image/")){
        var two=`-i ${data.path} -vf scale=${width}:${height},setsar=1:1 -preset ultrafast -y ${data.path}_two.png`;
        var res=await RNFFmpeg.execute(two);
        console.warn("res1"+res);
        var a=`-loop 1 -t 2 -i ${data.path}_two.png -i ${videopath} -f lavfi -t 0.1 -i anullsrc -c:v copy=channel_layout=stereo:sample_rate=44100 -filter_complex "[1:v][1:a][0:v][2:a]concat=n=2:v=1:a=1" -preset ultrafast -y ${videopath}_lastconcat.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res2"+res);
        var dur=await RNFFprobe.getMediaInformation(`${videopath}_lastconcat.mp4`);
        var mydur=Math.floor(dur.getAllProperties().format.duration);
        setvideoPath(`${videopath}_lastconcat.mp4`);
        setDuration(mydur);
        setPos([]);
        setPosition([]);
      }
      else{
      var now=`-i ${videopath} -f lavfi -i anullsrc -c:v copy -t ${duration} -preset ultrafast -y ${videopath}_newone.mp4`
      var res=await RNFFmpeg.execute(now);
      console.warn("res1"+res);
      setshowprogress("2/3");
      var two=`-i ${data.path} -vf scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2,setsar=1 -preset ultrafast -y ${data.path}_two.mp4`
      var res=await RNFFmpeg.execute(two);
      console.warn("res2"+res);
      var now=`-i ${data.path}_two.mp4 -f lavfi -i anullsrc -c:v copy -t ${duration} -preset ultrafast -y ${videopath}_newtwo.mp4`
      var res=await RNFFmpeg.execute(now);
      console.warn("res3"+res);
      setshowprogress("3/3");
      if(res==0){
        var concat=`-i ${videopath}_newone.mp4 -i ${videopath}_newtwo.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -y ${videopath}_lastconcat.mp4`;
        var res=await RNFFmpeg.execute(concat);
        console.warn("res4"+res);
      }      
      var dur=await RNFFprobe.getMediaInformation(`${videopath}_lastconcat.mp4`);
      var mydur=Math.floor(dur.getAllProperties().format.duration);
      setvideoPath(`${videopath}_lastconcat.mp4`);
      setDuration(mydur);
      setPos([]);
      setPosition([]);
      }
      setLoad(false);
    
    }
    
    
    async function antique(value){
      
      if(myfilterpart!=true){
        setLoad(true);
        setshowprogress("1/2");
      var dur=await RNFFprobe.getMediaInformation(`${videopath}`)
      var height=dur.getAllProperties().streams[0].height;
      var width=dur.getAllProperties().streams[0].width;
      setshowprogress("2/2");
        if(value=="antique"){
          var stat=`-i ${videopath} -f lavfi -i "color=#b0903d:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
          }
          else if(value=="aqua"){
          var stat=`-i ${videopath} -f lavfi -i "color=#00FFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="baw"){
            var stat=`-i ${videopath} -vf hue=s=0 -preset ultrafast -y ${videopath}_filter.mp4`
          
          }
          else if(value=="cocoa"){
            var stat=`-i ${videopath} -f lavfi -i "color=#775554:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="cyan"){
            var stat=`-i ${videopath} -f lavfi -i "color=#00FFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="ghostwhite"){
            var stat=`-i ${videopath} -f lavfi -i "color=#cbd2d9:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="hotpink"){
            var stat=`-i ${videopath} -f lavfi -i "color=#E31C79:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="maroon"){
            var stat=`-i ${videopath} -f lavfi -i "color=#510400:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="navy"){
            var stat=`-i ${videopath} -f lavfi -i "color=#000080:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="silver"){
            var stat=`-i ${videopath} -f lavfi -i "color=#AFAFAF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="blueish"){
            var stat=`-i ${videopath} -f lavfi -i "color=#00008B:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="cold"){
            var stat=`-i ${videopath} -f lavfi -i "color=#d2eaf1:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="congopink"){
            var stat=`-i ${videopath} -f lavfi -i "color=#f88379:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="foggy"){
            var stat=`-i ${videopath} -f lavfi -i "color=#abaeb0:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="gold"){
            var stat=`-i ${videopath} -f lavfi -i "color=gold:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="green"){
            var stat=`-i ${videopath} -f lavfi -i "color=green:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="underwater"){
            var stat=`-i ${videopath} -f lavfi -i "color=#4400f2:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="warmtea"){
            var stat=`-i ${videopath} -f lavfi -i "color=#6b4100:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="bluenature"){
            var stat=`-i ${videopath} -f lavfi -i "color=#05cfda:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="coffee"){
            var stat=`-i ${videopath} -f lavfi -i "color=#6f373c:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="diamond"){
            var stat=`-i ${videopath} -f lavfi -i "color=#b9f2ff:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="pink"){
            var stat=`-i ${videopath} -f lavfi -i "color=pink:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="purplehaze"){
            var stat=`-i ${videopath} -f lavfi -i "color=#7D7098:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="rainy"){
            var stat=`-i ${videopath} -f lavfi -i "color=#FFFFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="sky"){
            var stat=`-i ${videopath} -f lavfi -i "color=#87ceeb:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="grey"){
            var stat=`-i ${videopath} -f lavfi -i "color=grey:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="ragingmist"){
            var stat=`-i ${videopath} -f lavfi -i "color=#9b3d61:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="sepia"){
            var stat=`-i ${videopath} -f lavfi -i "color=#704214:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="vignette"){
            var stat=`-i ${videopath} -vf "vignette=angle=PI/4:mode=backward" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
          else if(value=="vintage"){
            var stat=`-i ${videopath} -f lavfi -i "color=#811112:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5" -preset ultrafast -y ${videopath}_filter.mp4`
        
          }
      var res=await RNFFmpeg.execute(stat);
      console.warn(res);
      if(res==0){
        setvideoPath(`${videopath}_filter.mp4`);
        setLoad(false);
      }
      }
    
      else{
    
      setLoad(true);
      setshowprogress("1/2");
      var dur=await RNFFprobe.getMediaInformation(`${videopath}`)
      var height=dur.getAllProperties().streams[0].height;
      var width=dur.getAllProperties().streams[0].width;
      setshowprogress("2/2");
      console.warn(timeone+" "+timetwo);
        if(timeone==0){
    
          if(value=="antique"){
            var stat=`-i ${videopath} -f lavfi -i "color=#b0903d:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
            }
            else if(value=="aqua"){
            var stat=`-i ${videopath} -f lavfi -i "color=#00FFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
            
            }
            else if(value=="baw"){
              var stat=`-i ${videopath} -f lavfi -i "color=#808080:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
            
            }
            else if(value=="cocoa"){
              var stat=`-i ${videopath} -f lavfi -i "color=#775554:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="cyan"){
              var stat=`-i ${videopath} -f lavfi -i "color=#00FFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="ghostwhite"){
              var stat=`-i ${videopath} -f lavfi -i "color=#cbd2d9:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="hotpink"){
              var stat=`-i ${videopath} -f lavfi -i "color=#E31C79:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="maroon"){
              var stat=`-i ${videopath} -f lavfi -i "color=#510400:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="navy"){
              var stat=`-i ${videopath} -f lavfi -i "color=#000080:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="silver"){
              var stat=`-i ${videopath} -f lavfi -i "color=#AFAFAF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="blueish"){
              var stat=`-i ${videopath} -f lavfi -i "color=#00008B:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="cold"){
              var stat=`-i ${videopath} -f lavfi -i "color=#d2eaf1:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="congopink"){
              var stat=`-i ${videopath} -f lavfi -i "color=#f88379:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast-y ${videopath}_filter.mp4`
          
            }
            else if(value=="foggy"){
              var stat=`-i ${videopath} -f lavfi -i "color=#abaeb0:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="gold"){
              var stat=`-i ${videopath} -f lavfi -i "color=gold:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="green"){
              var stat=`-i ${videopath} -f lavfi -i "color=green:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="underwater"){
              var stat=`-i ${videopath} -f lavfi -i "color=#4400f2:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="warmtea"){
              var stat=`-i ${videopath} -f lavfi -i "color=#6b4100:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="bluenature"){
              var stat=`-i ${videopath} -f lavfi -i "color=#05cfda:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="coffee"){
              var stat=`-i ${videopath} -f lavfi -i "color=#6f373c:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="diamond"){
              var stat=`-i ${videopath} -f lavfi -i "color=#b9f2ff:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="pink"){
              var stat=`-i ${videopath} -f lavfi -i "color=pink:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="purplehaze"){
              var stat=`-i ${videopath} -f lavfi -i "color=#7D7098:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="rainy"){
              var stat=`-i ${videopath} -f lavfi -i "color=#FFFFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="sky"){
              var stat=`-i ${videopath} -f lavfi -i "color=#87ceeb:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="grey"){
              var stat=`-i ${videopath} -f lavfi -i "color=grey:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="ragingmist"){
              var stat=`-i ${videopath} -f lavfi -i "color=#9b3d61:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="sepia"){
              var stat=`-i ${videopath} -f lavfi -i "color=#704214:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="vignette"){
              var stat=`-i ${videopath} -vf "vignette=angle=PI/4:mode=backward:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="vintage"){
              var stat=`-i ${videopath} -f lavfi -i "color=#811112:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,0,${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
          var res=await RNFFmpeg.execute(stat);
          setvideoPath(`${videopath}_filter.mp4`);
          setLoad(false);
      }
      else if(timetwo==duration){
          if(value=="antique"){
            var stat=`-i ${videopath} -f lavfi -i "color=#b0903d:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
            }
            else if(value=="aqua"){
            var stat=`-i ${videopath} -f lavfi -i "color=#00FFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="baw"){
              var stat=`-i ${videopath} -f lavfi -i "color=#808080:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
            
            }
            else if(value=="cocoa"){
              var stat=`-i ${videopath} -f lavfi -i "color=#775554:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="cyan"){
              var stat=`-i ${videopath} -f lavfi -i "color=#00FFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="ghostwhite"){
              var stat=`-i ${videopath} -f lavfi -i "color=#cbd2d9:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="hotpink"){
              var stat=`-i ${videopath} -f lavfi -i "color=#E31C79:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="maroon"){
              var stat=`-i ${videopath} -f lavfi -i "color=#510400:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="navy"){
              var stat=`-i ${videopath} -f lavfi -i "color=#000080:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="silver"){
              var stat=`-i ${videopath} -f lavfi -i "color=#AFAFAF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="blueish"){
              var stat=`-i ${videopath} -f lavfi -i "color=#00008B:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="cold"){
              var stat=`-i ${videopath} -f lavfi -i "color=#d2eaf1:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast-y ${videopath}_filter.mp4`
          
            }
            else if(value=="congopink"){
              var stat=`-i ${videopath} -f lavfi -i "color=#f88379:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="foggy"){
              var stat=`-i ${videopath} -f lavfi -i "color=#abaeb0:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="gold"){
              var stat=`-i ${videopath} -f lavfi -i "color=gold:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="green"){
              var stat=`-i ${videopath} -f lavfi -i "color=green:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast-y ${videopath}_filter.mp4`
          
            }
            else if(value=="underwater"){
              var stat=`-i ${videopath} -f lavfi -i "color=#4400f2:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="warmtea"){
              var stat=`-i ${videopath} -f lavfi -i "color=#6b4100:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="bluenature"){
              var stat=`-i ${videopath} -f lavfi -i "color=#05cfda:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="coffee"){
              var stat=`-i ${videopath} -f lavfi -i "color=#6f373c:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="diamond"){
              var stat=`-i ${videopath} -f lavfi -i "color=#b9f2ff:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="pink"){
              var stat=`-i ${videopath} -f lavfi -i "color=pink:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="purplehaze"){
              var stat=`-i ${videopath} -f lavfi -i "color=#7D7098:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="rainy"){
              var stat=`-i ${videopath} -f lavfi -i "color=#FFFFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="sky"){
              var stat=`-i ${videopath} -f lavfi -i "color=#87ceeb:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="grey"){
              var stat=`-i ${videopath} -f lavfi -i "color=grey:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="ragingmist"){
              var stat=`-i ${videopath} -f lavfi -i "color=#9b3d61:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="sepia"){
              var stat=`-i ${videopath} -f lavfi -i "color=#704214:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="vignette"){
              var stat=`-i ${videopath} -vf "vignette=angle=PI/4:mode=backward:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="vintage"){
              var stat=`-i ${videopath} -f lavfi -i "color=#811112:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timetwo)+1})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
    
          var res=await RNFFmpeg.execute(stat);
          setvideoPath(`${videopath}_filter.mp4`);
          setLoad(false);
    
          
      }
      else{
    
          if(value=="antique"){
            var stat=`-i ${videopath} -f lavfi -i "color=#b0903d:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
            }
            else if(value=="aqua"){
            var stat=`-i ${videopath} -f lavfi -i "color=#00FFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="baw"){
              var stat=`-i ${videopath} -f lavfi -i "color=#808080:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
            
            }
            else if(value=="cocoa"){
              var stat=`-i ${videopath} -f lavfi -i "color=#775554:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="cyan"){
              var stat=`-i ${videopath} -f lavfi -i "color=#00FFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="ghostwhite"){
              var stat=`-i ${videopath} -f lavfi -i "color=#cbd2d9:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="hotpink"){
              var stat=`-i ${videopath} -f lavfi -i "color=#E31C79:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="maroon"){
              var stat=`-i ${videopath} -f lavfi -i "color=#510400:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="navy"){
              var stat=`-i ${videopath} -f lavfi -i "color=#000080:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="silver"){
              var stat=`-i ${videopath} -f lavfi -i "color=#AFAFAF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="blueish"){
              var stat=`-i ${videopath} -f lavfi -i "color=#00008B:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="cold"){
              var stat=`-i ${videopath} -f lavfi -i "color=#d2eaf1:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="congopink"){
              var stat=`-i ${videopath} -f lavfi -i "color=#f88379:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="foggy"){
              var stat=`-i ${videopath} -f lavfi -i "color=#abaeb0:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="gold"){
              var stat=`-i ${videopath} -f lavfi -i "color=gold:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="green"){
              var stat=`-i ${videopath} -f lavfi -i "color=green:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="underwater"){
              var stat=`-i ${videopath} -f lavfi -i "color=#4400f2:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="warmtea"){
              var stat=`-i ${videopath} -f lavfi -i "color=#6b4100:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="bluenature"){
              var stat=`-i ${videopath} -f lavfi -i "color=#05cfda:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="coffee"){
              var stat=`-i ${videopath} -f lavfi -i "color=#6f373c:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="diamond"){
              var stat=`-i ${videopath} -f lavfi -i "color=#b9f2ff:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="pink"){
              var stat=`-i ${videopath} -f lavfi -i "color=pink:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="purplehaze"){
              var stat=`-i ${videopath} -f lavfi -i "color=#7D7098:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="rainy"){
              var stat=`-i ${videopath} -f lavfi -i "color=#FFFFFF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="sky"){
              var stat=`-i ${videopath} -f lavfi -i "color=#87ceeb:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="grey"){
              var stat=`-i ${videopath} -f lavfi -i "color=grey:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="ragingmist"){
              var stat=`-i ${videopath} -f lavfi -i "color=#9b3d61:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="sepia"){
              var stat=`-i ${videopath} -f lavfi -i "color=#704214:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="vignette"){
              var stat=`-i ${videopath} -vf "vignette=angle=PI/4:mode=backward:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
            else if(value=="vintage"){
              var stat=`-i ${videopath} -f lavfi -i "color=#811112:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${timeone},${Number(timeone)+Number(timetwo)})'" -preset ultrafast -y ${videopath}_filter.mp4`
          
            }
          var res=await RNFFmpeg.execute(stat);
          setvideoPath(`${videopath}_filter.mp4`);
          setLoad(false);
      }  
     }
    }
    
    function filterpart(){
      setfilterfull(true);
      setfilterpart(true);
    }
    
    
    async function addmusic(){
      setwave(true);
      var res=await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.audio],
        copyTo : "cachesDirectory"
      })
    
      SoundPlayer.playUrl(`${res.fileCopyUri}`);
      var dur=await RNFFprobe.getMediaInformation(`${res.fileCopyUri}`);
      var mydur=Math.floor(dur.getAllProperties().format.duration);
      setmusicduration(mydur);
      setpath(`${res.fileCopyUri}`);
      setTime(0);      
    }
    
   async function progress(time){
      setprogresstime(Math.floor(time.currentTime));
      setoneTime(new Date(Math.floor(time.currentTime) * 1000).toISOString().substr(11, 8));
    }
    
    
    function progressend(){
       SoundPlayer.pause();
    }
    function startvideo(){
      SoundPlayer.seek(0);
      SoundPlayer.play();
    }
    
    function playvideo(){
      if(again==0){
        setagain(1);
        SoundPlayer.seek(progresstime);
        SoundPlayer.pause();
      }
      else{
        setagain(0);
        SoundPlayer.seek(progresstime);
        SoundPlayer.play();
      }
    }
    var checkmeagain=0;
    function getmusicvolume(e){
      setvolumeofmusic(e/10);
      var checkone=0;
      SoundPlayer.setVolume(e/10);
      if(checkone==0){
        checkone=1
        if(checkmeagain>=1)
        {
          musicarr.pop()
        }
        musicarr.push(`-i ${path} -filter:a "volume=${e/10}" ${path}_volume.wav`);
      }
      checkmeagain++;
    }
    
    async function applyfade(){
      setLoad(true);
      setshowprogress("1/1");
      var fadin=fadein.toFixed(1);
      var fadout=fadeout.toFixed(1);
      if(fadein!=0.0){
        var fade=`-i ${path} -af "afade=t=in:st=0:d=${fadein}" ${path}_fadein.wav`;
        var res=await RNFFmpeg.execute(fade);
        setpath(`${path}_fadein.wav`);
      }
      if(fadeout!=0.0){
        var fade=`-i ${path} -af "afade=t=out:st=${musicduration-fadeout}:d=${fadeout}" ${path}_fadeout.wav`;
        var res=await RNFFmpeg.execute(fade);
        setpath(`${path}_fadeout.wav`);
      }
      SoundPlayer.playUrl(path);
      setLoad(false);
      setmusicfade(false);
    }
    
    async function duplicatemusic(){
      setLoad(true);
      setshowprogress("1/1");
      var a=`-i ${path} -i ${path} -filter_complex '[0:0][1:0]concat=n=2:v=0:a=1[out]' -map '[out]' -preset ultrafast -y ${path}_concat.wav`;
      var res=await RNFFmpeg.execute(a);
      if(res==0){
        setpath(`${path}_concat.wav`);
        setaudiooption(false);
        setLoad(false);
        SoundPlayer.playUrl(`${path}_concat.wav`);
      }
    }
    
    async function deletemusic(){
      SoundPlayer.stop();
      setpath("");
      setwave(false);
      setfadein(0);
      setfadeout(0);
      setaudiooption(false);
    }
    async function localmusic(){
      var res=await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.audio],
        copyTo : "cachesDirectory"
      })
      if(wave==true){
        SoundPlayer.stop();
        setfadein(0);
        setfadeout(0);
      }
      SoundPlayer.playUrl(`${res.fileCopyUri}`);
      var dur=await RNFFprobe.getMediaInformation(`${res.fileCopyUri}`);
      var mydur=Math.floor(dur.getAllProperties().format.duration);
      setmusicduration(mydur);
      setpath(`${res.fileCopyUri}`);
      setTime(0);
      setwave(true);
    }
    async function extractmusic(){
      var res=await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.video],
        copyTo : "cachesDirectory"
      })
      setLoad(true);
      setshowprogress("1/1");
      var ex=`-i ${res.fileCopyUri} -map 0:a -c copy -y ${res.fileCopyUri}_extract.m4a`;
      var myres=await RNFFmpeg.execute(ex);
      if(wave==true){
        SoundPlayer.stop();
        setfadein(0);
        setfadeout(0);
      }
      SoundPlayer.playUrl(`${res.fileCopyUri}_extract.m4a`);
      setLoad(false);
      var dur=await RNFFprobe.getMediaInformation(`${res.fileCopyUri}_extract.m4a`);
      var mydur=Math.floor(dur.getAllProperties().format.duration);
      setmusicduration(mydur);
      setpath(`${res.fileCopyUri}_extract.m4a`);
      setTime(0);
      setwave(true);
    }

    async function playeffect(name,type){
      setpausevideo(true);
      SoundPlayer.playSoundFile(name,type);
      SoundPlayer.addEventListener("FinishedPlaying",()=>{
        SoundPlayer.stop();
        setpausevideo(false);
        if(wave!=false){
          SoundPlayer.playUrl(path);
          SoundPlayer.seek(progresstime);
        }
      })
      
    }

    async function applyeffect(name,type){
      var flag=0;
      for(var i in poseffect){
        if(poseffect[i].num==time){
          flag=1;
          alert("can't apply duplicate effect at same time");
          break;
        }
      }
      if(flag!=1){
        setLoad(true);
        setshowprogress("1/2");
        seteffect(false);
        var a=`-i ${videopath} -f lavfi -t 0.1 -i anullsrc -c:v copy -y ${videopath}_effectvoice.mp4`;
        var res= await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        if(res==0){
        setshowprogress("2/2");
          RNFS.copyFileAssets(`${name}.${type}`,`${RNFS.DocumentDirectoryPath}/${name}.${type}`);
          var a=`-i ${videopath}_effectvoice.mp4 -i ${RNFS.DocumentDirectoryPath}/${name}.${type}  -filter_complex "[1]adelay=${(time-1)*1000}|${(time-1)*1000}[aud];[0][aud]amix" -y ${videopath}_effect.mp4`;
          var res= await RNFFmpeg.execute(a);
          setvideoPath(`${videopath}_effect.mp4`);
          setLoad(false);
          console.warn("res2"+res);
          const value=await AsyncStorage.getItem("leftmarkposition");
          setPoseffect((poseffect)=>[...poseffect,{"pos":Number(value),"num":time,"left":Number(value),"name":name+"."+type}]);
          setPositioneffect((positioneffect)=>[...positioneffect,<View  style={[styles.Labeleffect,{ left: Number(value)-15}]} key={Number(value)}></View>])

        }
        
        
      }
    }

    function muteaudio(){
      setmutevideoaudio(true);

    }
    function unmuteaudio(){
      setmutevideoaudio(false);
    }
    async function deleteaudio(){
      setLoad(true);
      setshowprogress("1/1");
      var a=`-i ${videopath} -c copy -an -y ${videopath}_unaudio.mp4`;
      var res=await RNFFmpeg.execute(a);
      if(res==0){
        setvideoPath(`${videopath}_unaudio.mp4`);
        setPoseffect([]);
        setPositioneffect([]);
      }
      setLoad(false);
    }
    var patha=0;
    async function formatvideo(ratio){
      
      if(patha==0){
        setoriginalvideopath(videopath);
      }

      if(ratio=="original"){
        setvideoPath(originalvideopath);
      }
      else{
        setLoad(true);
        setshowprogress("1/1");
        var a=`-i ${videopath} -aspect ${ratio} -c copy -y ${videopath}_ration.mp4`;
        var res=await RNFFmpeg.execute(a);
        if(res==0){
          console.warn(ratio);
          setvideoPath(`${videopath}_ration.mp4`);
        }
        setLoad(false);
      }
      patha=1;
    }
    async function funoverlay(position){
      var secondvideoduration=3
      var data=await ImagePicker.openPicker({
        multiple:false,
        mediaType:"all",
      })
      console.warn(data);
      if(data.mime.startsWith("image/")){
        secondvideoduration=3;
      }
      else{
        var dur=await RNFFprobe.getMediaInformation(`${data.path}`);
        secondvideoduration=Math.floor(dur.getAllProperties().format.duration);
      }
      if(data.path.startsWith("file")){
        console.warn(time+"  :  "+secondvideoduration);
        if(position=="TopLeft"){
          setLoad(true)
        setshowprogress("1/2");
          var b=`-i ${data.path} -vf scale=100:-1 -preset ultrafast -y ${data.path}_output.mp4`;
          var res=await RNFFmpeg.execute(b);
        setshowprogress("2/2");
          var a=`-i ${videopath} -i ${data.path}_output.mp4 -filter_complex "[0:v][1:v]overlay=2:2:enable='between(t,${time},${time+secondvideoduration})'" -c:a copy -preset ultrafast -y ${videopath}_pos.mp4`
          var res=await RNFFmpeg.execute(a);
          var dur=await RNFFprobe.getMediaInformation(`${videopath}_pos.mp4`);
          var mydur=Math.floor(dur.getAllProperties().format.duration);
          setDuration(mydur);
          setvideoPath(`${videopath}_pos.mp4`);
          setLoad(false);
        }
        else if(position=="TopRight"){
          setLoad(true);
        setshowprogress("1/2");
          var b=`-i ${data.path} -vf scale=100:-1 -preset ultrafast -y ${data.path}_output.mp4`
          var res=await RNFFmpeg.execute(b);
        setshowprogress("2/2");
          var a=`-i ${videopath} -i ${data.path}_output.mp4 -filter_complex "[0:v][1:v]overlay=W-w-2:2:enable='between(t,${time},${time+secondvideoduration})'" -codec:a copy -preset ultrafast -y ${videopath}_pos.mp4`
          var res=await RNFFmpeg.execute(a);
          var dur=await RNFFprobe.getMediaInformation(`${videopath}_pos.mp4`);
          var mydur=Math.floor(dur.getAllProperties().format.duration);
          setDuration(mydur);
          setvideoPath(`${videopath}_pos.mp4`);
          setLoad(false);
        }
        else if(position=="BottomLeft"){
          setLoad(true);
        setshowprogress("1/2");
          var b=`-i ${data.path} -vf scale=100:-1 -preset ultrafast -y ${data.path}_output.mp4`
          var res=await RNFFmpeg.execute(b);
        setshowprogress("2/2");
          var a=`-i ${videopath} -i ${data.path}_output.mp4 -filter_complex "[0:v][1:v]overlay=2:main_h-overlay_h:enable='between(t,${time},${time+secondvideoduration})'" -codec:a copy -preset ultrafast -y ${videopath}_pos.mp4`
          var res=await RNFFmpeg.execute(a);
          var dur=await RNFFprobe.getMediaInformation(`${videopath}_pos.mp4`);
          var mydur=Math.floor(dur.getAllProperties().format.duration);
          setDuration(mydur);
          setvideoPath(`${videopath}_pos.mp4`);
          setLoad(false);
        }
        else if(position=="BottomRight"){
          setLoad(true);
        setshowprogress("1/2");
          var b=`-i ${data.path} -vf scale=100:-1 -preset ultrafast -y ${data.path}_output.mp4`
          var res=await RNFFmpeg.execute(b);
        setshowprogress("2/2");
          var a=`-i ${videopath} -i ${data.path}_output.mp4 -filter_complex "[0:v][1:v]overlay=W-w-2:H-h-2:enable='between(t,${time},${time+secondvideoduration})'" -codec:a copy -preset ultrafast -y ${videopath}_pos.mp4`
          var res=await RNFFmpeg.execute(a);
          var dur=await RNFFprobe.getMediaInformation(`${videopath}_pos.mp4`);
          var mydur=Math.floor(dur.getAllProperties().format.duration);
          setDuration(mydur);
          setvideoPath(`${videopath}_pos.mp4`);
          setLoad(false);
        }
        else if(position=="Center"){
          setLoad(true);
        setshowprogress("1/2");
          var b=`-i ${data.path} -vf scale=100:-1 -preset ultrafast -y ${data.path}_output.mp4`
          var res=await RNFFmpeg.execute(b);
        setshowprogress("2/2");
          var a=`-i ${videopath} -i ${data.path}_output.mp4 -filter_complex "[0:v][1:v]overlay=(W-w)/2:(H-h)/2:enable='between(t,${time},${time+secondvideoduration})'" -codec:a copy -preset ultrafast -y ${videopath}_pos.mp4`
          var res=await RNFFmpeg.execute(a);
          var dur=await RNFFprobe.getMediaInformation(`${videopath}_pos.mp4`);
          var mydur=Math.floor(dur.getAllProperties().format.duration);
          setDuration(mydur);
          setvideoPath(`${videopath}_pos.mp4`);
          setLoad(false);
        }
      }

    }

    async function chromapick(code){
      var data=await ImagePicker.openPicker({
        multiple:false,
        mediaType:"all",
      })
      console.warn(data);
      setLoad(true);
      setshowprogress("1/2");
      var dur=await RNFFprobe.getMediaInformation(`${videopath}`)
      var height=dur.getAllProperties().streams[0].height;
      var width=dur.getAllProperties().streams[0].width;
      var statementtwo=`-i ${videopath} -f lavfi -t ${duration} -i anullsrc -c:v copy -preset ultrafast -y ${videopath}_partsound.mp4`
      var res=await RNFFmpeg.execute(statementtwo);

      if(data.mime=="image/jpeg"){
      var b=`-i ${data.path} -vf scale=${width}:${height} -preset ultrafast -y ${data.path}_output.png`
      }
      else{
      var b=`-i ${data.path} -vf scale=${width}:${height} -preset ultrafast -y ${data.path}_output.mp4`
      }
      var res=await RNFFmpeg.execute(b);
      setshowprogress("2/2");
      if(data.mime.startsWith("image/")){
      //var a=`-i ${data.path}_output.png -i ${videopath} -filter_complex '[1:v]colorkey=${code}:0.3:0.0[ckout];[0:v][ckout]overlay[out]' -map '[out]' -map 1:a -c:v libx264 -pix_fmt yuv420p -shortest -preset ultrafast -y ${videopath}_chroma.mp4`;

      var a=`-i ${data.path}_output.png -i ${videopath}_partsound.mp4 -filter_complex '[1:v]colorkey=${code}:0.4:[ckout];[0:v][ckout]overlay[out]' -map '[out]' -map 1:a -c:v libx264 -pix_fmt yuv420p -shortest -preset ultrafast -y ${videopath}_chroma.mp4`
      }
      else{
      var a=`-i ${data.path}_output.mp4 -i ${videopath}_partsound.mp4 -filter_complex '[1:v]colorkey=${code}:0.4:[ckout];[0:v][ckout]overlay[out]' -map '[out]' -map 1:a -c:v libx264 -pix_fmt yuv420p -shortest -preset ultrafast -y ${videopath}_chroma.mp4`;
      
      }
      var res=await RNFFmpeg.execute(a);
      console.warn(res);
      if(res==0){
        var dur=await RNFFprobe.getMediaInformation(`${videopath}_chroma.mp4`);
        var mydur=Math.floor(dur.getAllProperties().format.duration);
        setDuration(mydur);
        setvideoPath(`${videopath}_chroma.mp4`);
      }
      setLoad(false);
    }
    async function videospeed(){
      setLoad(true);
      setshowprogress("1/2");
      var a=`-i ${videopath} -vf "setpts=(PTS-STARTPTS)/${speedvalue}" -af atempo=${speedvalue} -preset ultrafast -y ${videopath}_speed.mp4`;
      var res=await RNFFmpeg.execute(a);
      setshowprogress("2/2");
      if(res==0){
        var dur=await RNFFprobe.getMediaInformation(`${videopath}_speed.mp4`);
        var mydur=Math.floor(dur.getAllProperties().format.duration);
        setDuration(mydur);
        setvideoPath(`${videopath}_speed.mp4`);
      }
      setPos([]);
      setPosition([]);
      setspeed(false);
      setLoad(false);
    }

    async function videopartspeed(){
      setLoad(true);
      setshowprogress("1/2");
      console.warn(speedvalue);
      var statementtwo=`-i ${videopath} -f lavfi -t ${duration} -i anullsrc -c:v copy -preset ultrafast -y ${videopath}_partsound.mp4`
      var res=await RNFFmpeg.execute(statementtwo);
      console.warn("res1: "+res);
      if(timeone==0){

        var mystatone=`-ss 0 -i ${videopath}_partsound.mp4 -t ${timetwo} -preset ultrafast -c copy -y ${videopath}_one.mp4`;
        var res=await RNFFmpeg.execute(mystatone);
        console.warn("res2: "+res);

        var mystatone=`-ss ${timetwo} -i ${videopath}_partsound.mp4 -t ${duration} -preset ultrafast -c copy -y ${videopath}_two.mp4`;
        var res=await RNFFmpeg.execute(mystatone);
        console.warn("res3: "+res);
        setshowprogress("2/2");
        var a=`-i ${videopath}_one.mp4 -vf "setpts=(PTS-STARTPTS)/${speedvalue}" -af atempo=${speedvalue} -preset ultrafast -y ${videopath}_speed.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res4: "+res);

        var a=`-i ${videopath}_speed.mp4 -i  ${videopath}_two.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -y ${videopath}_speedpartvideo.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res5: "+res);
       
    }
    else if(timetwo==duration){
        var mystattwo=`-ss 0 -i ${videopath}_partsound.mp4 -t ${timeone} -preset ultrafast -c copy -y ${videopath}_one.mp4`;
        var res=await RNFFmpeg.execute(mystattwo);
        console.warn("res2: "+res);
        var mystatone=`-ss ${timeone} -i ${videopath}_partsound.mp4 -t ${duration} -preset ultrafast -c copy -y ${videopath}_two.mp4`;
        var res=await RNFFmpeg.execute(mystatone);
        console.warn("res3: "+res);
        setshowprogress("2/2");
        var a=`-i ${videopath}_two.mp4 -vf "setpts=(PTS-STARTPTS)/${speedvalue}" -af atempo=${speedvalue} -preset ultrafast -y ${videopath}_speed.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res4: "+res);
        var a=`-i ${videopath}_one.mp4 -i ${videopath}_speed.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -y ${videopath}_speedpartvideo.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res5: "+res);

    }
    else{
        var mystatone=` -i ${videopath}_partsound.mp4 -t ${timeone} -preset ultrafast -c copy -y ${videopath}_one.mp4`;
        var res=await RNFFmpeg.execute(mystatone);
        console.warn("res2: "+res);
        var mystattwo=`-ss ${timetwo} -i ${videopath}_partsound.mp4 -t ${duration} -preset ultrafast -c copy -y ${videopath}_two.mp4`;
        var res=await RNFFmpeg.execute(mystattwo);
        console.warn("res3: "+res);
        var statthree=`-ss ${timeone} -i ${videopath}_partsound.mp4 -t ${timetwo-timeone} -preset ultrafast -c copy -y ${videopath}_three.mp4`
        var res=await RNFFmpeg.execute(statthree);
        console.warn("res4: "+res);
        setshowprogress("2/2");
        var a=`-i ${videopath}_three.mp4 -vf "setpts=(PTS-STARTPTS)/${speedvalue}" -af atempo=${speedvalue} -preset ultrafast -y ${videopath}_speed.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res5: "+res);
        var a=`-i ${videopath}_one.mp4 -i ${videopath}_speed.mp4 -i ${videopath}_two.mp4 -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]" -vsync 2 -map "[v]" -map "[a]" -preset ultrafast -y ${videopath}_speedpartvideo.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res6: "+res);
    }
        setLoad(false);
        var dur=await RNFFprobe.getMediaInformation(`${videopath}_speedpartvideo.mp4`);
        var mydur=Math.floor(dur.getAllProperties().format.duration);
        setDuration(mydur);
        setPos([]);
        setPosition([]);
        setvideoPath(`${videopath}_speedpartvideo.mp4`);
    }
    async function flip(){
        setLoad(true);
        setshowprogress("1/1");
        setflipmecheck(true);
        var a=`-i ${videopath} -vf hflip -c:a copy -crf 30 -preset ultrafast -y ${videopath}_flip.mp4`;
        var res=await RNFFmpeg.execute(a);
        setvideoPath(`${videopath}_flip.mp4`);
        setLoad(false);
    }
    async function angle(){
      setLoad(true);
      setshowprogress("1/1");
      if(oneangle==true){
        var a=`-i ${videopath} -c copy -metadata:s:v:0 rotate=90 -y ${videopath}_angle.mp4`;
        var res=await RNFFmpeg.execute(a);
        setvideoPath(`${videopath}_angle.mp4`);
        setoneangle(false);
        settwoangle(true);
        setthreeangle(false);
        setfourangle(false);
      }
      else if(twoangle==true){
        var a=`-i ${videopath} -c copy -metadata:s:v:0 rotate=180 -y ${videopath}_angle.mp4`;
        var res=await RNFFmpeg.execute(a);
        setvideoPath(`${videopath}_angle.mp4`);
        setoneangle(false);
        settwoangle(false);
        setthreeangle(true);
        setfourangle(false);
      }
      else if(threeangle==true){
        var a=`-i ${videopath} -c copy -metadata:s:v:0 rotate=270 -y ${videopath}_angle.mp4`;
        var res=await RNFFmpeg.execute(a);
        setvideoPath(`${videopath}_angle.mp4`);
        setoneangle(false);
        settwoangle(false);
        setthreeangle(false);
        setfourangle(true);
      }
      else if(fourangle==true){
        var a=`-i ${videopath} -c copy -metadata:s:v:0 rotate=360 -y ${videopath}_angle.mp4`;
        var res=await RNFFmpeg.execute(a);
        setvideoPath(`${videopath}_angle.mp4`);
        setoneangle(true);
        settwoangle(false);
        setthreeangle(false);
        setfourangle(false);
      }
      setLoad(false);
    }
    async function reverseme(){
      if(reverse==true){
        setLoad(true);
        setshowprogress("1/1");
        setreversemecheck(true);
        var a=` -i ${videopath} -vf reverse -af areverse -preset ultrafast -y ${videopath}_reverse.mp4`;
        var res=await RNFFmpeg.execute(a);
        setvideoPath(`${videopath}_reverse.mp4`);
        setreverse(false);
        setLoad(false);
      }
      else{
        setLoad(true);
        setshowprogress("1/1");
        setreversemecheck(true);
        var a=` -i ${videopath} -vf reverse -af areverse -preset ultrafast -y ${videopath}_reverse.mp4`;
        var res=await RNFFmpeg.execute(a);
        setvideoPath(`${videopath}_reverse.mp4`);
        setreverse(true);
        setLoad(false);
      }
    }
    async function downtext(){
      if(textchange && (downstatetext<=218)){
        setdownstatetext(downstatetext+20);
      }
    }
    async function righttext(){
      if(textchange){
      setrightstatetext(rightstatetext+20);
      }
    }
    async function applytext(){
      setLoad(true);
      setshowprogress("1/1");
      if((rightstatetext==0 && downstatetext==0)){
        var a=`-i ${videopath} -vf "drawtext=fontfile=/system/fonts/DroidSans.ttf:text='${textchange}':fontcolor=${textcolor}:fontsize=${Number(sizechange)+60}:x=0:y=0:enable='between(t,${time},${Number(time)+Number(textduration)})'" -preset ultrafast -y ${videopath}_text.mp4"`
      }
      else if(textduration==3){
        var a=`-i ${videopath} -vf "drawtext=fontfile=/system/fonts/DroidSans.ttf:text='${textchange}':fontcolor=${textcolor}:fontsize=${Number(sizechange)+60}:x=${Number(rightstatetext)+20}:y=${Number(downstatetext)+20}:enable='between(t,${time},${Number(time)+3})'" -preset ultrafast -y ${videopath}_text.mp4"`
      }
      else{
      var a=`-i ${videopath} -vf "drawtext=fontfile=/system/fonts/DroidSans.ttf:text='${textchange}':fontcolor=${textcolor}:fontsize=${Number(sizechange)+60}:x=${Number(rightstatetext)+20}:y=${Number(downstatetext)+20}:enable='between(t,${time},${Number(time)+Number(textduration)})'" -preset ultrafast -y ${videopath}_text.mp4`;
      }
      var res=await RNFFmpeg.execute(a);
      console.warn(res);
      if(res==0){
        setvideoPath(`${videopath}_text.mp4`);
        settext(false);
        settextchange();
        setsizechange(30);
        setrightstatetext(0);
        setdownstatetext(0);
      }
      setLoad(false);
    }
    async function applyaddtext(){
      setLoad(true);
      setshowprogress("1/1");
      var a=`-i ${videopath} -vf "drawtext=fontfile=/system/fonts/DroidSans.ttf:text='${addtextchange}':fontcolor=${addtextcolor}:fontsize=80:x=(w-text_w)/2:y=h-th-5:enable='between(t,${time},${Number(time)+Number(addtextduration)})'" -crf 30 -preset ultrafast -y ${videopath}_text.mp4"`
      var res=await RNFFmpeg.execute(a);
      console.warn(res);
      if(res==0){
        setvideoPath(`${videopath}_text.mp4`);
        setaddtext(false);
        setaddtextchange();
      }
      setLoad(false);
    }
    async function applyvideoeffect(){
      setLoad(true);
      setshowprogress("1/3");
      var dur=await RNFFprobe.getMediaInformation(`${videopath}`);
      var height=dur.getAllProperties().streams[0].height;
      var width=dur.getAllProperties().streams[0].width;
      
      console.warn(time+" "+effectduration);
      if(myeffect=="blurmotion"){
      setshowprogress("2/3");
      setshowprogress("3/3");
      var a=`-i ${videopath} -vf tmix=frames=8:weights="1 1 1 1 1 1 1 1:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_effect.mp4`;
      var res=await RNFFmpeg.execute(a);
      }
      else if(myeffect=="convolution"){
        setshowprogress("2/3");
        setshowprogress("3/3");
        var a=`-i ${videopath} -vf convolution="-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
      }
      else if(myeffect=="badsignal"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('signal.gif',`${RNFS.DocumentDirectoryPath}/signal.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/signal.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/signal2.gif`;
        var res=await RNFFmpeg.execute(a);
        var a=`-i ${videopath} -vf "hue=s=0:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/signal2.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
      }
      else if(myeffect=="signal2"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('signal2.gif',`${RNFS.DocumentDirectoryPath}/signaltwo.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/signaltwo.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/signaltwoscale.gif`;
        var res=await RNFFmpeg.execute(a);
        var a=`-i ${videopath} -vf "hue=s=0:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/signaltwoscale.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
      }
      else if(myeffect=="signal3"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('signal3.gif',`${RNFS.DocumentDirectoryPath}/signalthree.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/signalthree.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/signalthreescale.gif`;
        var res=await RNFFmpeg.execute(a);
        var a=`-i ${videopath} -vf "hue=s=0:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/signalthreescale.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
      }
      else if(myeffect=="stars"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('stars.gif',`${RNFS.DocumentDirectoryPath}/stars.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/stars.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/stars2.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#d22b2b:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res2"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/stars2.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="stars2"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('stars2.gif',`${RNFS.DocumentDirectoryPath}/starstwo.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/starstwo.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/starstwoscale.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#d22b2b:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res2"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/starstwoscale.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="stars3"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('stars3.gif',`${RNFS.DocumentDirectoryPath}/starsthree.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/starsthree.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/starsthreescale.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#d22b2b:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res2"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/starsthreescale.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="love"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('Love.gif',`${RNFS.DocumentDirectoryPath}/love1.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/love1.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/loveone.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#7DF9FF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res2"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/loveone.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="love2"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('Love2.gif',`${RNFS.DocumentDirectoryPath}/love2.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/love2.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/lovetwo.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#7DF9FF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res2"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/lovetwo.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="love3"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('Love3.gif',`${RNFS.DocumentDirectoryPath}/love3.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/love3.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/lovethree.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#7DF9FF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res2"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/lovethree.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="firework"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('Firework.gif',`${RNFS.DocumentDirectoryPath}/firework1.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/firework1.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/fireworkone.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath} -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/fireworkone.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="firework2"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('Firework2.gif',`${RNFS.DocumentDirectoryPath}/firework2.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/firework2.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/fireworktwo.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath} -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/fireworktwo.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="firework3"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('Firework3.gif',`${RNFS.DocumentDirectoryPath}/firework3.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/firework3.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/fireworkthree.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath} -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/fireworkthree.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="firework4"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('Firework4.gif',`${RNFS.DocumentDirectoryPath}/firework4.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/firework4.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/fireworkfour.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath} -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/fireworkfour.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="bubble"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('bubble.gif',`${RNFS.DocumentDirectoryPath}/bubble.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/bubble.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/bubbleone.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#BF40BF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/bubbleone.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="bubble2"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('bubble2.gif',`${RNFS.DocumentDirectoryPath}/bubble2.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/bubble2.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/bubbletwo.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#BF40BF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/bubbletwo.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="bubble3"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('bubble3.gif',`${RNFS.DocumentDirectoryPath}/bubble3.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/bubble3.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/bubblethree.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#BF40BF:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/bubblethree.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="snow"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('snow.gif',`${RNFS.DocumentDirectoryPath}/snow.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/snow.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/snowone.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#FAF9F6:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/snowone.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="snow2"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('snow2.gif',`${RNFS.DocumentDirectoryPath}/snow2.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/snow2.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/snowtwo.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#FAF9F6:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/snowtwo.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="snow3"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('snow3.gif',`${RNFS.DocumentDirectoryPath}/snow3.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/snow3.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/snowthree.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        var a=`-i ${videopath} -f lavfi -i "color=#FAF9F6:s=${width}x${height}" -filter_complex "blend=shortest=1:all_mode=overlay:all_opacity=0.5:enable='between(t,${time},${Number(time)+Number(effectduration)})'" -preset ultrafast -y ${videopath}_oneeffect.mp4`;
        var res=await RNFFmpeg.execute(a);
        setshowprogress("3/3");
        var a=`-i ${videopath}_oneeffect.mp4 -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/snowthree.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="flowers"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('flowers.gif',`${RNFS.DocumentDirectoryPath}/flowers.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/flowers.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/flowersone.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath} -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/flowersone.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="flowers2"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('flowers2.gif',`${RNFS.DocumentDirectoryPath}/flowers2.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/flowers2.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/flowerstwo.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath} -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/flowerstwo.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="pattern"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('pattern.gif',`${RNFS.DocumentDirectoryPath}/pattern.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/pattern.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/patternone.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath} -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/patternone.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      else if(myeffect=="pattern2"){
        setshowprogress("2/3");
        RNFS.copyFileAssets('pattern2.gif',`${RNFS.DocumentDirectoryPath}/pattern2.gif`);
        var a=`-i ${RNFS.DocumentDirectoryPath}/pattern2.gif -vf scale=${width}:${height} -preset ultrafast -y ${RNFS.DocumentDirectoryPath}/patterntwo.gif`;
        var res=await RNFFmpeg.execute(a);
        console.warn("res1"+res);
        setshowprogress("3/3");
        var a=`-i ${videopath} -stream_loop -1 -i ${RNFS.DocumentDirectoryPath}/patterntwo.gif -filter_complex "[1:v]format=rgba,colorchannelmixer=aa=0.3[fg];[0][fg]overlay=enable='between(t,${time},${Number(time)+Number(effectduration)})':shortest=1" -c:a copy -preset ultrafast -y ${videopath}_effect.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("res3"+res);
      }
      console.warn(res);
      if(res==0){
        setvideoPath(`${videopath}_effect.mp4`);
      }
      setLoad(false);
    }


    async function videoimport(size){


      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );
      if(granted === PermissionsAndroid.RESULTS.GRANTED){
        var res=await RNFS.mkdir("/storage/emulated/0/InstCut");
      }
      var rand=Math.floor(Math.random() * (900000 - 100000 + 1) + 100000);
      console.warn(path);
      setModalVisible(false);
      setLoad(true);
      setshowprogress("1/2");
      var a=`-i ${videopath} -f lavfi -i anullsrc -c:v copy -t ${duration} -preset ultrafast -y ${videopath}_dum.mp4`;
      var res=await RNFFmpeg.execute(a);
      setshowprogress("2/2");
      console.warn("res0:"+res);
      if(path!=0 || path!=""){
        if(musicduration>duration){
        var a=`-i ${videopath}_dum.mp4 -i ${path} -filter_complex "[1:0]volume=${volumeofmusic}[a1];[0:a][a1]amix=inputs=2:duration=first" -map 0:v:0 -preset ultrafast -crf 18 -y ${videopath}_music.mp4`
        var res=await RNFFmpeg.execute(a);
        console.warn("myres1:"+res);
        if(size=="1080p"){
          var a=`-i ${videopath}_music.mp4 -vf scale=1920:1080 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
          }
          else if(size=="720p"){
          var a=`-i ${videopath}_music.mp4 -vf scale=1280:720 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
          }
          else if(size=="4k"){
            var a=`-i ${videopath}_music.mp4 -vf scale=4096:2160 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
          }
          else{
          var a=`-i ${videopath}_music.mp4 -vf scale=720:480 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
          }
          var res=await RNFFmpeg.execute(a);

        }
        else{
          var a=`-i ${videopath}_dum.mp4 -i ${path} -filter_complex "[1:0]volume=${volumeofmusic}[a1];[0:a][a1]amix=inputs=2:duration=longest" -map 0:v:0 -preset ultrafast -crf 18 -y ${videopath}_music.mp4`
          var res=await RNFFmpeg.execute(a);
          console.warn("res1:"+res);
          if(size=="1080p"){
            var a=`-i ${videopath}_music.mp4 -vf scale=1920:1080 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
            }
            else if(size=="720p"){
            var a=`-i ${videopath}_music.mp4 -vf scale=1280:720 -c:a copy -preset ultrafast /storage/emulated/0/InstCutr/InstCut_Video${rand}.mp4`;
            }
            else if(size=="4k"){
              var a=`-i ${videopath}_music.mp4 -vf scale=4096:2160 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
            }
            else{
            var a=`-i ${videopath}_music.mp4 -vf scale=720:480 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
            }
            var res=await RNFFmpeg.execute(a);
        }
      }
      else{
        if(size=="1080p"){
          var a=`-i ${videopath} -vf scale=1920:1080 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
          }
          else if(size=="720p"){
          var a=`-i ${videopath} -vf scale=1280:720 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
          }
          else if(size=="4k"){
            var a=`-i ${videopath} -vf scale=4096:2160 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
          }
          else{
          var a=`-i ${videopath} -vf scale=720:480 -c:a copy -preset ultrafast /storage/emulated/0/InstCut/InstCut_Video${rand}.mp4`;
          }
          var res=await RNFFmpeg.execute(a);
      }
      console.warn("res2:"+res);
      setLoad(false);
      if(res==0){
      var a=alert("Video Successfully export at InstCut Folder");
      }
    }
    return(
            <View style={styles.fullscreen}>
                {(shownot!=true)?<View style={{flex:1}}>
                <VideoPlayer 
    
                video={{uri: videopath}}
                seek={time}
                autoplay
                pauseOnPress
                onPlayPress={playvideo}
                loop
                onStart={startvideo}
                paused={pausevideo}
                hideControlsOnStart
                fullScreenOnLongPress
                style={{marginTop:40}}
                onProgress={progress}
                onEnd={progressend}
                muted={mutevideoaudio}
                />
                <Text style={{textAlign:"center",backgroundColor:"#303030",color:"white"}}>{onetime}</Text>
                {(load)?<View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={load}
      >
        <View style={styles.loadModalView}>
          <ActivityIndicator color="yellow" style={{position:"absolute",top:"45%",marginLeft:"35%",zIndex:2, transform: [{ scaleX: 5 }, { scaleY: 5 }] }}/>
          <Text style={{textAlign:"center",fontSize:20}}>{showprogress}</Text>
        </View>
      </Modal>
    </View>:null
}
                
                <View style={{backgroundColor:"#303030",height:"40%"}}>
                  <View style={{ position: 'relative' ,backgroundColor:"#303030"}}>
                    {position}
                    
                  </View>
                    <Pressable style={[styles.multislide]} onPress={(e)=>checkin(e)}>
                    <MultiSlider sliderLength={Dimensions.get("window").width-40} enableLabel step={1} min={0} max={duration} onValuesChange={(e)=>videoValue(e)}/>
                    </Pressable>
                    <View style={{backgroundColor:"black",position:"absolute",top:45,left:"96%",width:15,height:20,borderRadius:4}}>
                      
                      <Text onPress={()=>addlast()} style={{color:"white",textAlign:"center"}}>+</Text>
                    </View>
    
                    {(wave==false)?<View style={{backgroundColor:"#202020",top:0,width:Dimensions.get("window").width-40,left:20,height:30,borderRadius:4,flexDirection:'row', flexWrap:'wrap'}} onTouchStart={()=>addmusic()}>
                       <Image source={require("./image/music.png")} style={{width:25,height:25,left:5,top:10}}/>
                       <Text style={{left:20,color:"white",top:30}}>Add Music</Text>
                    </View>:
                    <View style={{backgroundColor:"#303030",width:Dimensions.get("window").width-40,left:20}} onTouchStart={()=>setaudiooption(true)}>
                       <Image source={require("./image/audiowave.png")} style={{width:"100%",height:"30%"}}/>
                    </View>}

                    {(effect==true)?<View style={{backgroundColor:"#202020",width:Dimensions.get("window").width-40,top:4,left:20,height:30,borderRadius:4,flexDirection:'row', flexWrap:'wrap'}}>
                       {positioneffect}
                    </View>:null}

            </View>
    {
              (show==false)?<View style={styles.downitem}>
                <ScrollView horizontal>
                    <TouchableOpacity style={{marginLeft:10}}  onPress={(e)=>trim(e)} >
                      <Image source={require("./image/cut.png")} style={{width:30,height:30,marginTop:10,left:10}}/>
                      <Text style={{fontSize:20,color:"black",marginLeft:5}}>Trim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:30,right:10}}  onPress={()=>setvideoeffect(true)} >
                      <Image source={require("./image/videoeffects.png")} style={{width:30,height:30,marginTop:10,left:20}}/>
                      <Text style={{fontSize:20,color:"black",left:7}}>Effects</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:24}}  onPress={()=>setmusicoption(true)} >
                      <Image source={require("./image/music.png")} style={{width:30,height:30,marginTop:10,left:19}}/>
                      <Text style={{fontSize:20,color:"black",marginLeft:10}}>Music</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:24}}  onPress={()=>setaudiovideooption(true)} >
                      <Image source={require("./image/audio.png")} style={{width:30,height:30,marginTop:10,left:19}}/>
                      <Text style={{fontSize:20,color:"black",marginLeft:10}}>Audio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:24}}  onPress={()=>setfilterfull(true)} >
                      <Image source={require("./image/filter.png")} style={{width:30,height:30,marginTop:10,left:15}}/>
                      <Text style={{fontSize:20,color:"black",marginLeft:10}}>Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:24}}  onPress={()=>setformat(true)} >
                      <Image source={require("./image/format.png")} style={{width:30,height:30,marginTop:10,left:19}}/>
                      <Text style={{fontSize:20,color:"black",marginLeft:10}}>Format</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:30,right:10}}  onPress={()=>settext(true)} >
                      <Image source={require("./image/text.png")} style={{width:30,height:30,marginTop:10,left:13}}/>
                      <Text style={{fontSize:20,color:"black",left:7}}>Text</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:30,right:10}}  onPress={()=>setsubtitle(true)} >
                      <Image source={require("./image/subtitle.png")} style={{width:30,height:30,marginTop:10,left:20}}/>
                      <Text style={{fontSize:20,color:"black",left:7}}>Subtitle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:24}}  onPress={()=>setoverlay(true)} >
                      <Image source={require("./image/overlay.png")} style={{width:30,height:30,marginTop:10,left:19}}/>
                      <Text style={{fontSize:20,color:"black",marginLeft:10}}>Overlay</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:24}}  onPress={()=>setchroma(true)} >
                      <Image source={require("./image/chroma.png")} style={{width:30,height:30,marginTop:10,left:25}}/>
                      <Text style={{fontSize:20,color:"black"}}>ChromaKey</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:24,right:4}}  onPress={()=>setspeed(true)} >
                      <Image source={require("./image/speed.png")} style={{width:30,height:30,marginTop:10,left:15}}/>
                      <Text style={{fontSize:20,color:"black"}}>Speed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:30,right:10}}  onPress={()=>flip()} >
                      <Image source={require("./image/flip.png")} style={{width:30,height:30,marginTop:10,left:7}}/>
                      <Text style={{fontSize:20,color:"black",left:7}}>Flip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:30,right:10}}  onPress={()=>angle()} >
                      <Image source={require("./image/angle.png")} style={{width:30,height:30,marginTop:10,left:13}}/>
                      <Text style={{fontSize:20,color:"black",left:7}}>Angle</Text>
                    </TouchableOpacity>
                    
                    {(reverse==false)?<TouchableOpacity style={{marginLeft:30,right:10}}  onPress={()=>reverseme()} >
                      <Image source={require("./image/reverse.png")} style={{width:30,height:30,marginTop:10,left:13}}/>
                      <Text style={{fontSize:20,color:"black",left:2}}>Reverse</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={{marginLeft:30,right:10}}  onPress={()=>reverseme()} >
                      <Image source={require("./image/forward.png")} style={{width:30,height:30,marginTop:10,left:13}}/>
                      <Text style={{fontSize:20,color:"black",left:2}}>Forward</Text>
                    </TouchableOpacity>}

                </ScrollView>
               </View>:
               <View style={styles.downitem}>
             
               <ScrollView horizontal>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>filterpart()} >
                      <Image source={require("./image/filter.png")} style={{width:30,height:30,marginTop:10,left:30}}/>
                      <Text style={{fontSize:16,color:"black",marginLeft:30}}>Filter</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:24,right:4}}  onPress={()=>setspeedpart(true)} >
                      <Image source={require("./image/speed.png")} style={{width:30,height:30,marginTop:10,left:15}}/>
                      <Text style={{fontSize:20,color:"black"}}>Speed</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>replaceparttvideo()} >
                     <Image source={require("./image/replace.png")} style={{width:40,height:40,marginTop:1,left:30}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:20}}>Replace</Text>
                   </TouchableOpacity>    
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>duplicatepartvideo()} >
                     <Image source={require("./image/paste.png")} style={{width:30,height:30,marginTop:10,left:30}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:20}}>Duplicate</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>deletepartvideo()} >
                     <Image source={require("./image/delete.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Delete</Text>
                   </TouchableOpacity>
               </ScrollView>
               <View onTouchStart={()=>goprevious()}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
                </View> 
              </View>
    }
               {tempone}
               {temptwo}
               </View>:
               <View style={styles.fullscreen}>
    
                <VideoPlayer 
                video={{uri: secondpath.path}}
                seek={secondduration}
                autoplay
                disableSeek
                pauseOnPress
                hideControlsOnStart
                loop
                fullScreenOnLongPress
                />
                <View style={{backgroundColor:"#303030",height:"50%"}}>
                <Text style={{textAlign:"center",color:"white",backgroundColor:"#303030"}}>{secondvalue}</Text>
                {(load)?<View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={load}
      >
        <View style={styles.loadModalView}>
          <ActivityIndicator color="yellow" style={{position:"absolute",top:"45%",marginLeft:"35%",zIndex:2, transform: [{ scaleX: 5 }, { scaleY: 5 }] }}/>
          <Text style={{textAlign:"center",fontSize:20}}>{showprogress}</Text>
        </View>
      </Modal>
    </View>:null
}
                <Text style={{textAlign:"center",fontSize:30,backgroundColor:"#303030"}}>{count}</Text>
                {secondposition}
                <Pressable style={[styles.multislide,{backgroundColor:"#303030"}]}>
                    <MultiSlider sliderLength={Dimensions.get("window").width-40} step={1} min={0} max={Math.floor(secondpath.duration/1000)} enableLabel onValuesChange={(e)=>secondvideoValue(e)}/>
                </Pressable>
    
                <TouchableOpacity style={{marginLeft:"45%"}}  onPress={(e)=>trim(e)} >
                      <Image source={require("./image/cut.png")} style={{width:30,height:30,marginTop:10,left:10}}/>
                      <Text style={{fontSize:20,color:"black",marginLeft:5}}>Trim</Text>
                </TouchableOpacity>
                <View style={{marginTop:50,width:"50%",left:"30%"}}>
                <Button title="Select" onPress={()=>replacevideome()} />
                </View>
            </View>
        </View>
               
               }
    
            {(transition)?<View style={styles.downitemtwo}>
             <Text style={{textAlign:"center",fontSize:20,color:"black"}}>Transition</Text>
             <ScrollView horizontal>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("fade")} >
                   <Image source={require("./image/transitions/fade.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:47,top:4}}>Fade</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("fadeblack")} >
                   <Image source={require("./image/transitions/fadeblack.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>fadeblack</Text>
                 </TouchableOpacity>   
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("fadewhite")} >
                   <Image source={require("./image/transitions/fadewhite.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>fadewhite</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("distance")} >
                   <Image source={require("./image/transitions/distance.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>distance</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("wipeleft")} >
                   <Image source={require("./image/transitions/wipeleft.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>wipeleft</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("wiperight")} >
                   <Image source={require("./image/transitions/wiperight.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>wiperight</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("wipeup")} >
                   <Image source={require("./image/transitions/wipeup.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>wipeup</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("wipedown")} >
                   <Image source={require("./image/transitions/wipedown.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>wipedown</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("slideleft")} >
                   <Image source={require("./image/transitions/slideleft.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>slideleft</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("slideright")} >
                   <Image source={require("./image/transitions/slideright.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>slideright</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("slideup")} >
                   <Image source={require("./image/transitions/slideup.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>slideup</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("slidedown")} >
                   <Image source={require("./image/transitions/slidedown.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>slidedown</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("smoothleft")} >
                   <Image source={require("./image/transitions/smoothleft.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>smoothleft</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("smoothright")} >
                   <Image source={require("./image/transitions/smoothright.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>smoothright</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("smoothup")} >
                   <Image source={require("./image/transitions/smoothup.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>smoothup</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("smoothdown")} >
                   <Image source={require("./image/transitions/smoothdown.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>smoothdown</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("rectcrop")} >
                   <Image source={require("./image/transitions/rectcrop.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>rectcrop</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("circlecrop")} >
                   <Image source={require("./image/transitions/circlecrop.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>circlecrop</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("circleclose")} >
                   <Image source={require("./image/transitions/circleclose.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>circleclose</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("circleopen")} >
                   <Image source={require("./image/transitions/circleopen.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>circleopen</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("horzclose")} >
                   <Image source={require("./image/transitions/horzclose.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>horzclose</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("horzopen")} >
                   <Image source={require("./image/transitions/horzopen.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>horzopen</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("vertclose")} >
                   <Image source={require("./image/transitions/vertclose.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>vertclose</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("vertopen")} >
                   <Image source={require("./image/transitions/vertopen.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>vertopen</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("diagbl")} >
                   <Image source={require("./image/transitions/diagbl.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>diagbl</Text>
                 </TouchableOpacity>
    
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("diagbr")} >
                   <Image source={require("./image/transitions/diagbr.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>diagbr</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("diagtl")} >
                   <Image source={require("./image/transitions/diagtl.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>diagtl</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("diagtr")} >
                   <Image source={require("./image/transitions/diagtr.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>diagtr</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("hlslice")} >
                   <Image source={require("./image/transitions/hlslice.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>hlslice</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("hrslice")} >
                   <Image source={require("./image/transitions/hrslice.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>hrslice</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("vuslice")} >
                   <Image source={require("./image/transitions/vdslice.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>vuslice</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("dissolve")} >
                   <Image source={require("./image/transitions/dissolve.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>dissolve</Text>
                 </TouchableOpacity>
    
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("pixelize")} >
                   <Image source={require("./image/transitions/pixelize.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>pixelize</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>gotransition("radial")} >
                   <Image source={require("./image/transitions/radial.gif")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:37,top:4}}>radial</Text>
                 </TouchableOpacity>
             </ScrollView>
    
    
             <View onTouchStart={()=>goprevioustransition()}>
                   <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
              </View> 
            </View>:null}
    
    
    
            {(filterfull)?<View style={styles.downitem}>
             
               <ScrollView horizontal>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("antique")}>
                     <Image source={require("./image/filters/antique.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Antique</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:0}}  onPress={()=>antique("aqua")}>
                     <Image source={require("./image/filters/aqua.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Aqua</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:0}}   onPress={()=>antique("baw")}>
                     <Image source={require("./image/filters/baw.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:47}}>B&W</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:5}}  onPress={()=>antique("cocoa")}>
                     <Image source={require("./image/filters/cocoa.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Cocoa</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:5}}  onPress={()=>antique("cyan")}>
                     <Image source={require("./image/filters/cyan.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:46}}>Cyan</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("ghostwhite")}>
                     <Image source={require("./image/filters/ghostwhite.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:30}}>GhostWhite</Text>
                   </TouchableOpacity>
    
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("hotpink")}>
                     <Image source={require("./image/filters/hotpink.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>HotPink</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}   onPress={()=>antique("maroon")}>
                     <Image source={require("./image/filters/maroon.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Maroon</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("navy")}>
                     <Image source={require("./image/filters/navy.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:47}}>Navy</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("silver")}>
                     <Image source={require("./image/filters/silver.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:47}}>Silver</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("blueish")}>
                     <Image source={require("./image/filters/blueish.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Blueish</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}   onPress={()=>antique("cold")}>
                     <Image source={require("./image/filters/cold.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:50}}>Cold</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}   onPress={()=>antique("congopink")}>
                     <Image source={require("./image/filters/congopink.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:35}}>CongoPink</Text>
                   </TouchableOpacity>
    
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("foggy")}>
                     <Image source={require("./image/filters/foggy.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Foggy</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}   onPress={()=>antique("gold")}>
                     <Image source={require("./image/filters/gold.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Gold</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}   onPress={()=>antique("green")}>
                     <Image source={require("./image/filters/green.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Green</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("underwater")}>
                     <Image source={require("./image/filters/underwater.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:35}}>UnderWater</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}} onPress={()=>antique("warmtea")}>
                     <Image source={require("./image/filters/warmtea.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:35}}>WarmTea</Text>
                   </TouchableOpacity>
    
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("bluenature")}>
                     <Image source={require("./image/filters/bluenature.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:35}}>BlueNature</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("coffee")}>
                     <Image source={require("./image/filters/coffee.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Coffee</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("diamond")}>
                     <Image source={require("./image/filters/diamond.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Diamond</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}} onPress={()=>antique("pink")}>
                     <Image source={require("./image/filters/pink.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Pink</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("purplehaze")}>
                     <Image source={require("./image/filters/purplehaze.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:30}}>PurpleHaze</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("rainy")}>
                     <Image source={require("./image/filters/rainy.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Rainy</Text>
                   </TouchableOpacity>
    
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("sky")}>
                     <Image source={require("./image/filters/sky.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:50}}>Sky</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("grey")}>
                     <Image source={require("./image/filters/grey.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:48}}>Grey</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>antique("ragingmist")}>
                     <Image source={require("./image/filters/ragingmist.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:35}}>RagingMist</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}   onPress={()=>antique("sepia")}>
                     <Image source={require("./image/filters/sepia.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Sepia</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}}   onPress={()=>antique("vignette")}>
                     <Image source={require("./image/filters/vignette.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Vignette</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10,marginRight:10}}  onPress={()=>antique("vintage")}>
                     <Image source={require("./image/filters/vintage.jpg")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Vintage</Text>
                   </TouchableOpacity>
               </ScrollView>
               <View onTouchStart={()=>{
                setfilterfull(false) 
                setfilterpart(false)
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
                </View> 
              </View>:null}
    
    
    
              {(musicoption)?<View style={styles.downitem}>
             
               <ScrollView horizontal>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>localmusic()}>
                     <Image source={require("./image/local.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Local</Text>
                   </TouchableOpacity>
                   
                   <TouchableOpacity style={{marginLeft:0}}  onPress={()=>seteffect(true)}>
                     <Image source={require("./image/effect.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Effect</Text>
                   </TouchableOpacity>
    
                   <TouchableOpacity style={{marginLeft:0}}  onPress={()=>extractmusic()}>
                     <Image source={require("./image/extract.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Extract</Text>
                   </TouchableOpacity>
               </ScrollView>
               <View onTouchStart={()=>{
                setmusicoption(false);
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
                </View> 
              </View>:null}
    
              {(audiooption)?<View style={styles.downitem}>
             
               <ScrollView horizontal>
                   <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmusicvolume(true)}>
                     <Image source={require("./image/volumev.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Volume</Text>
                   </TouchableOpacity>
    
                   <TouchableOpacity style={{marginLeft:0}}  onPress={()=>setmusicfade(true)}>
                     <Image source={require("./image/fadev.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Fade</Text>
                   </TouchableOpacity>
    
                   <TouchableOpacity style={{marginLeft:0}}  onPress={()=>duplicatemusic()}>
                     <Image source={require("./image/duplicatev.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Duplicate</Text>
                   </TouchableOpacity>
    
                   <TouchableOpacity style={{marginLeft:0,marginRight:3}}  onPress={()=>deletemusic()}>
                     <Image source={require("./image/deletev.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Delete</Text>
                   </TouchableOpacity>
               </ScrollView>
               <View onTouchStart={()=>{
                setaudiooption(false);
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
                </View> 
              </View>:null}
    
              {(musicvolume)?<View style={styles.musicvolume}>
                <View style={styles.musicmultislide}>
    
                <MultiSlider sliderLength={Dimensions.get("window").width-40} step={1} min={1} max={10} onValuesChange={(e)=>getmusicvolume(e)}/>
                </View>
                <View onTouchStart={()=>{
                setmusicvolume(false)
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-48,position:"absolute"}}/>
              </View>
              </View>:null}
    
              {(musicfade)?<View style={styles.musicfade}>
                <TouchableOpacity style={{left:"92%",top:"8%"}} onPress={()=>applyfade()}>
                  <Image source={require("./image/tick.png")} style={{width:30,height:30}}/>
                </TouchableOpacity>
                <View style={styles.musicfadein}>
                  <Text>Fade In {fadein.toFixed(1)}</Text>
                <MultiSlider sliderLength={Dimensions.get("window").width-40} step={0.1} min={0} max={Math.floor(musicduration/2)} onValuesChange={(e)=>setfadein(Number(e))}/>
                </View>
                <View style={styles.musicfadeout}>
                <Text>Fade Out {fadeout.toFixed(1)}</Text>
                <MultiSlider sliderLength={Dimensions.get("window").width-40} step={0.1} min={0} max={Math.floor(musicduration/2)} onValuesChange={(e)=>setfadeout(Number(e))}/>
                </View>
                <View onTouchStart={()=>{
                setmusicfade(false)
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-77,position:"absolute"}}/>
              </View>
              </View>:null}



              {(effect)?<View style={styles.downitemeffect}>
             
               <ScrollView horizontal>

                   <View style={{marginLeft:10}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("alarm","wav")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("alarm","wav")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Alarm(2s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("alert","wav")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("alert","wav")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Alert(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("applause","wav")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("applause","wav")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Applause(5s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("beep","wav")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("beep","wav")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Beep(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("bell","wav")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("bell","wav")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Bell(2s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("bird","wav")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("bird","wav")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Bird(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("bomb","wav")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("bomb","wav")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Bomb(5s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("boom","wav")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("boom","wav")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Boom(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("car_horn","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("car_horn","mp3")}>
                     <Text style={{fontSize:16,marginLeft:25,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>CarHorn(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("cat","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("cat","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Cat(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("cry","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("cry","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Cry(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("guitar","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("guitar","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Guitar(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("helicopter","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("helicopter","mp3")}>
                     <Text style={{fontSize:16,marginLeft:25,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Helicopter(2s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("laugh","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("laugh","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Laugh(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("lava","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("lava","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Lava(2s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("motorcycle","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("motorcycle","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Motorcycle(3s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("night","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("night","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Night(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("party","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("party","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Party(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("phone","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("phone","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Phone(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("roar","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("roar","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Roar(2s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("sword","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("sword","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Sword(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("train","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("train","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Train(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("walk","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("walk","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Walk(5s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("water","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("water","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Water(2s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("wave","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("wave","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Wave(2s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("zombie","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("zombie","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Zombie(1s)</Text>
                     </TouchableOpacity>
                   </View>

                   <View style={{marginLeft:1}}>
                     <View style={{width:50,left:30}}>
                     <Button title="USE" onPress={()=>applyeffect("zoom","mp3")}/>
                     </View>
                     <TouchableOpacity onPress={()=>playeffect("zoom","mp3")}>
                     <Text style={{fontSize:16,marginLeft:30,backgroundColor:"#841584",top:8,padding:3,color:"white"}}>Zoom(1s)</Text>
                     </TouchableOpacity>
                   </View>
               </ScrollView>
               <View onTouchStart={()=>{
                seteffect(false)
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
                </View> 
              </View>:null}


              {(audiovideooption)?<View style={styles.downitem}>
             
               <ScrollView horizontal>
                   {(mutevideoaudio==false)?<TouchableOpacity style={{marginLeft:10}}  onPress={()=>muteaudio()}>
                     <Image source={require("./image/mute.png")} style={{width:30,height:30,marginTop:10,left:40}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:40}}>Mute</Text>
                   </TouchableOpacity>:<TouchableOpacity style={{marginLeft:0}}  onPress={()=>unmuteaudio()}>
                     <Image source={require("./image/unmute.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Unmute</Text>
                   </TouchableOpacity>}
    
                   <TouchableOpacity style={{marginLeft:0}}  onPress={()=>deleteaudio()}>
                     <Image source={require("./image/delete.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                     <Text style={{fontSize:16,color:"black",marginLeft:45}}>Delete</Text>
                   </TouchableOpacity>

               </ScrollView>
               <View onTouchStart={()=>{
                setaudiovideooption(false);
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
                </View> 
              </View>:null}



              {(format)?<View style={styles.downitem}>
             
               <ScrollView horizontal>

                   <TouchableOpacity style={{marginLeft:40,backgroundColor:"#708090",width:50,height:50,borderRadius:4,top:15}}  onPress={()=>formatvideo("original")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:10}}>Original</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:30,backgroundColor:"#708090",width:40,height:60,borderRadius:4,top:7}}  onPress={()=>formatvideo("9:16")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:15}}>9:16</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:30,backgroundColor:"#708090",width:50,height:45,borderRadius:4,top:15}}  onPress={()=>formatvideo("16:9")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:10}}>16:9</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:30,backgroundColor:"#708090",width:60,height:55,borderRadius:4,top:15}}  onPress={()=>formatvideo("1:1")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:15}}>1:1</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:30,backgroundColor:"#708090",width:65,height:35,borderRadius:4,top:25}}  onPress={()=>formatvideo("5:4")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:7}}>5:4</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:30,backgroundColor:"#708090",width:40,height:60,borderRadius:4,top:7}}  onPress={()=>formatvideo("4:5")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:15}}>4:5</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:30,backgroundColor:"#708090",width:35,height:50,borderRadius:4,top:15}}  onPress={()=>formatvideo("3:4")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:15}}>3:4</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:30,backgroundColor:"#708090",width:50,height:40,borderRadius:4,top:20}}  onPress={()=>formatvideo("3:2")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:10}}>3:2</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:30,backgroundColor:"#708090",width:40,height:60,borderRadius:4,top:7}}  onPress={()=>formatvideo("2:3")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:20}}>2:3</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:30,backgroundColor:"#708090",width:50,height:40,borderRadius:4,top:20}}  onPress={()=>formatvideo("2:1")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:7}}>2:1</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:30,backgroundColor:"#708090",width:40,height:65,borderRadius:4,top:7,right:10}}  onPress={()=>formatvideo("1:2")}>
                     <Text style={{textAlign:"center",color:"black",marginTop:20}}>1:2</Text>
                   </TouchableOpacity>

               </ScrollView>
               <View onTouchStart={()=>{
                setformat(false);
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
                </View> 
              </View>:null}

              {(overlay)?<View style={styles.downitem}>
             
               <ScrollView horizontal>
                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"blue",width:50,height:50}}  onPress={()=>funoverlay("TopLeft")}>
                     <View style={{backgroundColor:"red",width:20,height:20}}></View>
                   </TouchableOpacity>
                   <Text style={{left:40,top:6,color:"black"}}>TopLeft</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"blue",width:50,height:50}}  onPress={()=>funoverlay("TopRight")}>
                     <View style={{backgroundColor:"red",width:20,height:20,left:"60%"}}></View>
                   </TouchableOpacity>
                   <Text style={{left:40,top:6,color:"black"}}>TopRight</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"blue",width:50,height:50}}  onPress={()=>funoverlay("BottomLeft")}>
                     <View style={{backgroundColor:"red",width:20,height:20,top:"60%"}}></View>
                   </TouchableOpacity>
                   <Text style={{left:35,top:6,color:"black"}}>BottomLeft</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"blue",width:50,height:50}}  onPress={()=>funoverlay("BottomRight")}>
                     <View style={{backgroundColor:"red",width:20,height:20,top:"60%",left:"60%"}}></View>
                   </TouchableOpacity>
                   <Text style={{left:35,top:6,color:"black"}}>BottomRight</Text>
                </View>

                <View style={{right:10}}>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"blue",width:50,height:50}}  onPress={()=>funoverlay("Center")}>
                     <View style={{backgroundColor:"red",width:20,height:20,left:"30%",top:"30%"}}></View>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Center</Text>
                </View>
               </ScrollView>
               <View onTouchStart={()=>{
                setoverlay(false);
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
                </View> 
              </View>:null}

              {(chroma)?<View style={styles.downitem}>
             
             <ScrollView horizontal>
             <TouchableOpacity style={{marginLeft:0}}  onPress={()=>setcolorpicker(true)}>
                <Image source={require("./image/colorpicker.png")} style={{width:30,height:30,marginTop:10,left:60}}/>
                <Text style={{fontSize:16,color:"black",marginLeft:45}}>Color Picker</Text>
             </TouchableOpacity>
             </ScrollView>
             <View onTouchStart={()=>{
              setchroma(false);
              }}>
                   <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
              </View> 
            </View>:null}



            {(colorpicker)?<View style={styles.downitem}>
             
               <ScrollView horizontal>
                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"green",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0x00ff00")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Green</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"blue",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0x0000ff")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Blue</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"red",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0xff0000")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Red</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"black",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0x000000")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Black</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"white",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0xffffff")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>White</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"cyan",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0x00ffff")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Cyan</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"yellow",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0xffff00")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Yellow</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"magenta",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0xff00ff")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Magenta</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"brown",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0xa52a2a")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Brown</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"maroon",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0x800000")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Maroon</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"gray",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0x808080")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Gray</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"orange",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0xffa500")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Orange</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"olive",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0x808000")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Olive</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"silver",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0xc0c0c0")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Silver</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"purple",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0x800080")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>Purple</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"darkblue",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0x00008b")}>
                   </TouchableOpacity>
                   <Text style={{left:45,top:6,color:"black"}}>DarkBlue</Text>
                </View>

                <View>
                   <TouchableOpacity style={{top:8,marginLeft:40,backgroundColor:"lightblue",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0xadd8e6")}>
                   </TouchableOpacity>
                   <Text style={{left:50,top:6,color:"black"}}>LightBlue</Text>
                </View>

                <View style={{right:30}}>
                   <TouchableOpacity style={{top:8,marginLeft:45,backgroundColor:"limegreen",width:50,height:50,borderRadius:10}}  onPress={()=>chromapick("0x32cd32")}>
                   </TouchableOpacity>
                   <Text style={{left:50,top:6,color:"black"}}>LimeGreen</Text>
                </View>
               </ScrollView>
               <View onTouchStart={()=>{
                setcolorpicker(false);
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
                </View> 
              </View>:null}


              {(speed)?<View style={styles.musicvolume}>
              <TouchableOpacity style={{left:"92%",top:"8%"}} onPress={()=>videospeed()}>
                  <Image source={require("./image/tick.png")} style={{width:30,height:30}}/>
              </TouchableOpacity>
              <Text style={{left:50}}>{speedvalue}</Text>
                <View style={styles.musicmultislide}>
                <MultiSlider sliderLength={Dimensions.get("window").width-40} step={0.1} min={0.5} max={3} onValuesChange={(e)=>setspeedvalue(Number(e).toFixed(1))}/>
                </View>
                <View onTouchStart={()=>{
                setspeed(false)
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-48,position:"absolute"}}/>
              </View>
              </View>:null}



              {(speedpart)?<View style={styles.musicvolume}>
              <TouchableOpacity style={{left:"92%",top:"8%"}} onPress={()=>videopartspeed()}>
                  <Image source={require("./image/tick.png")} style={{width:30,height:30}}/>
              </TouchableOpacity>
              <Text style={{left:50}}>{speedvalue}</Text>
                <View style={styles.musicmultislide}>
                <MultiSlider sliderLength={Dimensions.get("window").width-40} step={0.1} min={0.5} max={3} onValuesChange={(e)=>setspeedvalue(Number(e).toFixed(1))}/>
                </View>
                <View onTouchStart={()=>{
                setspeedpart(false)
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-48,position:"absolute"}}/>
              </View>
              </View>:null}

              {(text)?<View style={styles.inputtext}>
              <TouchableOpacity style={{left:"92%",top:"8%",position:"absolute"}} onPress={()=>applytext()}>
                  <Image source={require("./image/tick.png")} style={{width:30,height:30}}/>
              </TouchableOpacity>
              <View style={{left:"10%",borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderBottomWidth:2,borderRadius:4,width:170}}>
                  <TextInput placeholder="Enter Text" onChangeText={(text)=>settextchange(text)}/>
              </View>
              <View style={{position:"absolute",top:40,left:"60%"}} onTouchStart={()=>downtext()}>
                  <Image source={require("./image/downward.png")} style={{width:30,height:30}}/>
              </View>
              <View style={{position:"absolute",top:20,left:"65%"}} onTouchStart={()=>righttext()}>
                  <Image source={require("./image/rightward.png")} style={{width:30,height:30}}/>
              </View>
              <View style={{left:"10%",borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderBottomWidth:2,borderRadius:4,width:40,top:6}}>
                  <TextInput placeholder="Size" onChangeText={(text)=>setsizechange(text)}/>
              </View>
              
              <View style={{width:"10%",position:"absolute",left:"45%"}}>
              <ColorPicker
              thumbSize={20}
              sliderSize={20}
              onColorChangeComplete={(color)=>settextcolor(color)}
              onColorChange={(color)=>settemptextcolor(color)}
              />
              </View>

              <View style={{position:"absolute",left:"23%",borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderBottomWidth:2,borderRadius:4,width:65,top:"55%"}}>
                  <TextInput placeholder="Duration" onChangeText={(text)=>settextduration(text)}/>
              </View>

              <View onTouchStart={()=>{
                settext(false)
                setdownstatetext(0);
                setrightstatetext(0);
                settextchange();
                settextduration(3);
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-48,position:"absolute"}}/>
              </View>
              </View>:null}

              <View style={{position:"absolute"}}>
                <Text style={{fontSize:Number(sizechange),color:(temptextcolor!=0)?temptextcolor:"yellow",top:Number(downstatetext),left:Number(rightstatetext)}}>{textchange}</Text>
              </View>

              {(Subtitle)?<View style={styles.downitem}>
             
             <ScrollView horizontal>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setaddtext(true)}>
                   <Image source={require("./image/addtext.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:30}}>Add Text</Text>
                 </TouchableOpacity>
             </ScrollView>
             <View onTouchStart={()=>{
              setsubtitle(false);
              }}>
                   <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
              </View> 
            </View>:null}


            {(addtext)?<View style={styles.addinputtext}>
              <TouchableOpacity style={{left:"92%",top:"5%",position:"absolute"}} onPress={()=>applyaddtext()}>
                  <Image source={require("./image/tick.png")} style={{width:30,height:30}}/>
              </TouchableOpacity>
              <View style={{left:"10%",borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderBottomWidth:2,borderRadius:4,width:170}}>
                  <TextInput placeholder="Enter Text" onChangeText={(text)=>setaddtextchange(text)}/>
              </View>
              
              <View style={{width:"10%",position:"absolute",left:"65%",top:-20}}>
              <ColorPicker
              thumbSize={20}
              sliderSize={20}
              onColorChangeComplete={(color)=>setaddtextcolor(color)}
              onColorChange={(color)=>setaddtemptextcolor(color)}
              />
              </View>

              <View style={{position:"absolute",left:"10%",borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderBottomWidth:2,borderRadius:4,width:65,top:"60%"}}>
                  <TextInput placeholder="Duration" onChangeText={(text)=>setaddtextduration(text)}/>
              </View>

              <View onTouchStart={()=>{
                setaddtext(false)
                setaddtextchange();
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-48,position:"absolute"}}/>
              </View>
              </View>:null}

              <View style={{position:"absolute",top:"30%"}}>
                <Text style={{fontSize:25,color:(addtemptextcolor!=0)?addtemptextcolor:"yellow",textAlign:"center"}}>{addtextchange}</Text>
              </View>

              {(videoeffect)?<View style={styles.downitem}>
             
             <ScrollView horizontal>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("blurmotion")}>
                   <Image source={require("./image/effects/running.png")} style={{width:30,height:30,marginTop:10,left:50}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:30}}>BlurMotion</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("convolution")}>
                   <Image source={require("./image/effects/beat.png")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:30}}>Convolution</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("badsignal")}>
                   <Image source={require("./android/app/src/main/assets/signal.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:30}}>BadSignal</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("signal2")}>
                   <Image source={require("./android/app/src/main/assets/signal2.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:30}}>Signal2</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("signal3")}>
                   <Image source={require("./android/app/src/main/assets/signal3.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:30}}>Signal3</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("stars")}>
                   <Image source={require("./android/app/src/main/assets/stars.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Stars</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("stars2")}>
                   <Image source={require("./android/app/src/main/assets/stars2.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:41}}>Stars2</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("stars3")}>
                   <Image source={require("./android/app/src/main/assets/stars3.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Stars3</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("love")}>
                   <Image source={require("./android/app/src/main/assets/Love.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Love</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("love2")}>
                   <Image source={require("./android/app/src/main/assets/Love2.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Love2</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("love3")}>
                   <Image source={require("./android/app/src/main/assets/Love3.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Love3</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("firework")}>
                   <Image source={require("./android/app/src/main/assets/Firework.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Firework</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("firework2")}>
                   <Image source={require("./android/app/src/main/assets/Firework2.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Firework2</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("firework3")}>
                   <Image source={require("./android/app/src/main/assets/Firework3.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Firework3</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("firework4")}>
                   <Image source={require("./android/app/src/main/assets/Firework4.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Firework4</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("bubble")}>
                   <Image source={require("./android/app/src/main/assets/bubble.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Bubble</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("bubble2")}>
                   <Image source={require("./android/app/src/main/assets/bubble2.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Bubble2</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("bubble3")}>
                   <Image source={require("./android/app/src/main/assets/bubble3.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Bubble3</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("snow")}>
                   <Image source={require("./android/app/src/main/assets/snow.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Snow</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("snow2")}>
                   <Image source={require("./android/app/src/main/assets/snow2.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Snow2</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("snow3")}>
                   <Image source={require("./android/app/src/main/assets/snow3.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Snow3</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("pattern")}>
                   <Image source={require("./android/app/src/main/assets/pattern.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Pattern</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("pattern2")}>
                   <Image source={require("./android/app/src/main/assets/pattern2.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Pattern2</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("flowers")}>
                   <Image source={require("./android/app/src/main/assets/flowers.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Flowers</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={{marginLeft:10}}  onPress={()=>setmyeffect("flowers2")}>
                   <Image source={require("./android/app/src/main/assets/flowers2.gif")} style={{width:30,height:30,marginTop:10,left:45}}/>
                   <Text style={{fontSize:16,color:"black",marginLeft:42}}>Flowers2</Text>
                 </TouchableOpacity>
             </ScrollView>
             <View onTouchStart={()=>{
              setvideoeffect(false);
              }}>
                   <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-55,position:"absolute"}}/>
              </View> 
            </View>:null}

            


            {(myeffect!=false)?<View style={styles.effectinputtext}>
              <TouchableOpacity style={{left:"92%",top:"5%",position:"absolute"}} onPress={()=>applyvideoeffect()}>
                  <Image source={require("./image/tick.png")} style={{width:30,height:30}}/>
              </TouchableOpacity>
              <View style={{position:"absolute",left:"10%",borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderBottomWidth:2,borderRadius:4,width:65,top:"20%"}}>
                  <TextInput placeholder="Duration" onChangeText={(text)=>seteffectduration(text)}/>
              </View>
              <View onTouchStart={()=>{
                setmyeffect(false)
                seteffectduration(3);
                }}>
                     <Image source={require("./image/backarrow.png")} style={{width:30,height:30,marginTop:-16,position:"absolute"}}/>
              </View>
              </View>:null}


    <View style={styles.upperview}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>×</Text>
          </Pressable>
            <Text style={styles.modalText} onPress={()=>videoimport("4k")}>4K</Text>
            <Text style={styles.modalText} onPress={()=>videoimport("1080p")}>1080p</Text>
            <Text style={styles.modalText} onPress={()=>videoimport("720p")}>720p</Text>
            <Text style={styles.modalText} onPress={()=>videoimport("480p")}>480p</Text>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.uppertext}>Export</Text>
      </Pressable>
    </View>
</View>
        )
}


var styles = StyleSheet.create({
        fullscreen:{
            flex:1,
            backgroundColor:"black",
        },
        thumbimg:{
            position:"absolute",
            top:"25%"
        },
        multislide:{
            marginLeft:20,
            marginTop:30,
        },
        musicfadein:{
          marginLeft:35,
          marginTop:3
        },
        musicfadeout:{
          marginLeft:35,
         
        },
        musicmultislide:{
          marginLeft:35,
          marginTop:15,
        },
        musicvolume:{
            position:"absolute",
            top:"77%",
            backgroundColor:"#696969",
            width:"100%",
            height:"12%",
            justifyContent:"space-evenly"
        },
        musicfade:{
            position:"absolute",
            top:"77%",
            backgroundColor:"#696969",
            width:"100%",
            height:"20%",
            justifyContent:"space-evenly"
        },
        downitem:{
            position:"absolute",
            top:"77%",
            backgroundColor:"#696969",
            width:"100%",
            height:"12%",
            justifyContent:"space-evenly"
        },
        downitemeffect:{
            position:"absolute",
            top:"77%",
            backgroundColor:"#696969",
            width:"100%",
            height:"12%",
            justifyContent:"space-evenly"
        },
        downitemtwo:{
            position:"absolute",
            top:"77%",
            backgroundColor:"#696969",
            width:"100%",
            height:"15%",
            justifyContent:"space-evenly"
        },
        Label: {
            position: 'absolute',
            minWidth: 1,
            backgroundColor: 'black',
            top:20,
          },
          Labeleffect:{
            position: 'absolute',
            minWidth: 5,
            minHeight:25,
            backgroundColor: 'white',
          },
          LabelText: {
            alignItems: 'center',
            textAlign: 'center',
            fontStyle: 'normal',
            fontSize: 15,
            color:"white"
          },
          Labeltwo: {
            position: 'absolute',
            width: 5,
            backgroundColor: 'black',
            top:70,
          },
          LabelTexttwo: {
            alignItems: 'center',
            textAlign: 'center',
            fontStyle: 'normal',
            fontSize: 15,
            color:"white"
          },
          mystyle:{
            backgroundColor:"black",
            height:30,
            marginTop:40,
            width:282
          },
          nothing:{
            
          },
          partwidth:{
            backgroundColor:"black",
            width:mywidth,
            left:prev,
            right:next
          },
          input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          },
          inputtext:{
            position:"absolute",
            top:"70%",
            backgroundColor:"#696969",
            width:"100%",
            height:"20%",
            justifyContent:"space-evenly"
          },
          addinputtext:{
            position:"absolute",
            top:"70%",
            backgroundColor:"#696969",
            width:"100%",
            height:"17%",
            justifyContent:"space-evenly"
          },
          effectinputtext:{
            position:"absolute",
            top:"77%",
            backgroundColor:"#696969",
            width:"100%",
            height:"12%",
            justifyContent:"space-evenly"
          },
          centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
          shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },
          button: {
            borderRadius: 4,
            padding: 10,
            elevation: 2
          },
          buttonOpen: {
            backgroundColor: "#2196F3",
          },
          buttonClose: {
            backgroundColor: "#2196F3",
          },
          textStyle: {
            fontWeight: "bold",
            right:0,
            top:0,
            fontSize:30
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center",
            borderRadius: 4,
            padding: 10,
            elevation: 2,
            backgroundColor: "#2196F3"
          },
          uppertext:{
            color: "white",
            fontWeight: "bold",

          },
          upperview:{
            position:"absolute",
            right:0,
          },
          loadModalView:{
            margin: 20,
            marginTop:"105%",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
          shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          }
    });
    export default Edit;