import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  NativeModules,
  LayoutAnimation,
} from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

var {height, width} = Dimensions.get('window');

import {
  Router,
  Scene,
  Actions
} from 'react-native-router-flux';




type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state={ 
      latitude: null,
      longitude: null,
      error: null,
      w: width-60,
      h: 100,
      fadeAnim: new Animated.Value(100),
      
    }   
  }
 

  onPress(){
    LayoutAnimation.spring();
    this.setState({w: width, h: height})
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();    

            setTimeout(() => {Actions.home()}, 1000)



  }
  
  render() {

    return (
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress={ () => this.onPress() }>

       <Animated.View  style={{paddingLeft:30, paddingRight:30, borderRadius:20, backgroundColor:'#BBEE99', width: this.state.w, height: this.state.h, justifyContent:'center', alignItems:'center'}}>
         <Text style={{fontSize:30, textAlign:'center', color:'white'}}>Where is my place?</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

    
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
 
});
