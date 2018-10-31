import React, { Component } from 'react';
import { connect } from "react-redux";
import Navigator from './navigator/Navigator'
import LoginScreen from './login/LoginScreen'
import { StyleSheet, NavigatorIOS } from 'react-native';

class Main extends Component {
  render() {
    return this.props.isLoggedIn ? (
      <NavigatorIOS
        initialRoute={{
        component : Navigator,
        title : 'Github'
        }}
        style = {{flex : 1}}
      />
    ) : (
      <LoginScreen />
    )
  }
}


const mapStateToProps = (state) => ({
  isLoggedIn : state.user.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Main)