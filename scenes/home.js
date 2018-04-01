/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  NativeModules,
  LayoutAnimation,
  TouchableWithoutFeedback,
  BackHandler
} from 'react-native';

var {height, width} = Dimensions.get('window');
const { UIManager } = NativeModules;


UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

import RNShakeEvent from 'react-native-shake-event';

import {
  Router,
  Scene,
  Actions
} from 'react-native-router-flux';

//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Retro from '../utilities/map.json';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';




const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const ASPECT_RATIO = width / height;
const LATITUDE = 47.49801;
const LONGITUDE = 19.03991;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state={ 
      error: null,
      w:width,
      h:height/3,
      lvl:this.props.lvl,
      loading: 1,
      fadeAnim: new Animated.Value(100),
      opacity:1,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,

      },
    }    
  }
  componentDidMount(){
    if (this.state.lvl == undefined){
      this.setState({lvl:1})
    }
            setTimeout(() => {this.setState({loading:0})}, 2500)

    BackHandler.addEventListener('hardwareBackPress', function() {
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.
  console.log(Actions.state.index)
  Actions.button()
  return true;
});

  }

  componentWillMount() {
    RNShakeEvent.addEventListener('shake', () => {
     this.shake();
  this.setState({opacity: this.state.opacity-0.05})

    });
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  /* <MapView
      customMapStyle={Retro}
      showsUserLocation={ true }
      showsMyLocationButton={true}
      style={{zIndex:-1,
  width: this.state.w, 
  height: this.state.h,
    ...StyleSheet.absoluteFillObject}}

        region={ this.state.region }
        //onRegionChange={ region => this.setState({region}) }
        //onRegionChangeComplete={ region => this.setState({region}) }
        initialRegion={this.state.region}
  >

  <MapView.Marker.Animated
            coordinate={this.state.region}

          />
      </MapView>
*/

lvl(){
  if (this.state.lvl == 1){
    Actions.home({lvl:2})
  } else {
    Actions.button()

  }
}

color(){
  var opacity = Number(this.state.opacity);
  var color = 'rgba(187, 238, 153,'+opacity+')'
  console.log(color)
  return color
}
  
  onMap(){
    color = this.color();
    console.log(this.state.loading)
    console.log(this.state.w)
    if (this.state.loading === 0){
    if (this.state.lvl === 1) {  
      if (this.state.w >= 250 ) {
        return(
          <View style={{borderRadius:10, marginTop:10, justifyContent:'center', alignItems:'center', backgroundColor:color, height:this.state.h, width:this.state.w}}>
                 <Text style={{fontSize:30, textAlign:'center', fontWeight:'bold', color:'white'}}>LVL {this.state.lvl}</Text>
            <Text style={{fontSize:10, textAlign:'center', top:-50, fontWeight:'bold', color:'white'}}>{this.state.w}</Text>
            <Text style={{fontSize:10, textAlign:'center', fontWeight:'bold', color:'white'}}>Shake!</Text>
          </View>
        )
      }

      if (this.state.w < 250 && this.state.w >= 200   ) {
    return(
      <TouchableWithoutFeedback onPress={ () => this.lvl() }>
       <View style={{borderRadius:10, marginTop:10, justifyContent:'center', alignItems:'center', backgroundColor:color, height:this.state.h, width:this.state.w}}>
       <Text style={{fontSize:10, textAlign:'center', fontWeight:'bold', color:'white'}}>{this.state.w}</Text>
       <Text style={{fontSize:30, textAlign:'center', fontWeight:'bold', color:'white'}}>LVL {this.state.lvl}</Text>
       <Text style={{fontSize:10, textAlign:'center', fontWeight:'bold', color:'white'}}>Shake!</Text>


      </View>
      </TouchableWithoutFeedback>

      )
      } 

      if (this.state.w < 200 ) {
        return(
      <TouchableWithoutFeedback onPress={ () => Actions.button() }>

       <Animated.View style={{borderRadius:10, marginTop:10, backgroundColor:'#ff6666', height:200, justifyContent:'center', alignItems:'center', width:200}}>
         <Text style={{fontSize:30, textAlign:'center', color:'white', fontWeight:'bold'}}>GAME OVER</Text>

      </Animated.View>
      </TouchableWithoutFeedback>

      

      )
      }

  } else {
    if (this.state.w >= 250 ) {
        return(
          <View style={{borderRadius:10, marginTop:10, justifyContent:'center', alignItems:'center', backgroundColor:color, height:this.state.h+70, width:this.state.w-2}}>
            <Text style={{fontSize:30, textAlign:'center', fontWeight:'bold', color:'white'}}>LVL {this.state.lvl}</Text>
            <Text style={{fontSize:10, textAlign:'center', top:-50, fontWeight:'bold', color:'white'}}>{this.state.w}</Text>
            <Text style={{fontSize:10, textAlign:'center', fontWeight:'bold', color:'white'}}>Shake!</Text>
          </View>
        )
      }

      if (this.state.w < 250 && this.state.w >= 200   ) {
    return(
      <TouchableWithoutFeedback onPress={ () => this.lvl() }>
       <View style={{borderRadius:10, marginTop:10, justifyContent:'center', alignItems:'center', backgroundColor:color, height:this.state.h-10, width:this.state.w+30}}>
       <Text style={{fontSize:10, textAlign:'center', fontWeight:'bold', color:'white'}}>{this.state.w}</Text>
       <Text style={{fontSize:30, textAlign:'center', fontWeight:'bold', color:'white'}}>LVL {this.state.lvl}</Text>
       <Text style={{fontSize:10, textAlign:'center', fontWeight:'bold', color:'white'}}>Shake!</Text>


      </View>
      </TouchableWithoutFeedback>

      )
      } 

      if (this.state.w < 200 ) {
        return(
      <TouchableWithoutFeedback onPress={ () => Actions.button() }>

       <Animated.View style={{borderRadius:10, marginTop:10, backgroundColor:'#ff6666', height:200, justifyContent:'center', alignItems:'center', width:200}}>
         <Text style={{fontSize:30, textAlign:'center', color:'white', fontWeight:'bold'}}>GAME OVER</Text>

      </Animated.View>
      </TouchableWithoutFeedback>

      

      )
      }
      }






  } else {
    return(
      <DotIndicator color='black' />
      )

  }
  }
  
  shake(){

    LayoutAnimation.spring();
    this.setState({w: this.state.w-10, h: this.state.h+15})
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();    

  }




  render() {
    console.log(this.state.region)
    console.log('this.state.region')

    return (
      <View style={styles.container}>
         <Text style={{fontSize:10, marginTop:20, textAlign:'center', color:'gray'}}>When can u touch?</Text>

      
      
     {this.onMap()}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
  
  }
});
