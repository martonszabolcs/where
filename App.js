import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Text,
  View
} from 'react-native';


import {
  Router,
  Scene,
  Actions
} from 'react-native-router-flux';

import home from './scenes/home';
import button from './scenes/button';

export default class Flux extends Component {
  constructor(props) {
    super(props);
    console.log('component created');
    this.state={
    }
  }

  render() {
    // Lekerekitett sarkok pozicioja
        var {height, width} = Dimensions.get('window');
        var cornerLeft = width - 10;  // 10 is the width/height of the corner
        var cornerTop = height - 10;

        return (
          <View style={{backgroundColor: 'black', flex:1, paddingTop: 0, flexDirection: 'column'}}>

            <View style={[styles.roundedCorner, {top: 0, left: 0}]}>
                <Image style={styles.roundedCornerImage} source={require('./src/images/style/corner-top-left.png')} />
            </View>
            <View style={[styles.roundedCorner, {top: 0, left: cornerLeft}]}>
                <Image style={styles.roundedCornerImage} source={require('./src/images/style/corner-top-right.png')} />
            </View>
            <View style={[styles.roundedCorner, {top: cornerTop, left: 0}]}>
                <Image style={styles.roundedCornerImage} source={require('./src/images/style/corner-bottom-left.png')} />
            </View>
            <View style={[styles.roundedCorner, {top: cornerTop, left: cornerLeft}]}>
                <Image style={styles.roundedCornerImage} source={require('./src/images/style/corner-bottom-right.png')} />
            </View>

          <StatusBar hidden={true} transparent={true}/>

        <Router>
          <Scene key="root" hideNavBar={true} duration={10}>
            <Scene key="home" hideNavBar={true} component={home}  />
            <Scene key="button" hideNavBar={true} component={button} initial={true} />
          </Scene>
        </Router>

      </View>
    );
  }
}

const styles = StyleSheet.create({

    // lekerekitett sarkok
    roundedCorner: {
        width: 10,
        height: 10,
        position: 'absolute',
        zIndex: 10
    },

    roundedCornerImage: {
        width: 10,
        height: 10
    }
});
