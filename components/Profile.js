import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import { getLoginUserInfo } from '../redux/reducers/users'
import { initLoginUser, setMain } from '../redux/actions'

import { connect } from 'react-redux';
class Profile extends Component {
  render() {
    const info = getLoginUserInfo(this.props.loginUserId);
    if (info) {
      const content = (
        <ScrollView 
          style={styles.view}
          automaticallyAdjustContentInsets={false}>
          <View style={{flex:1 ,flexDirection: 'row', paddingTop: 100}}>
            <View style={{flex:1 ,flexDirection: 'column', paddingTop: 0}}>
              <Text style={styles.name}>{info.name}</Text>
              <Text style={styles.username}>@{info.login}</Text>
            </View>
            <Image key={info.avatar_url} source={{ uri: info.avatar_url }} style={styles.avatar}></Image>
          </View>
          <View style={{flex:1 ,flexDirection: 'row'}}>
          <Button
            onPress={() => {
              this.props.setMain('repositories');
            }}
            style={styles.repos}
            title={`${info.public_repos}\nrepos`}
          />
          <Button
            onPress={() => {
              this.props.setMain('following');
            }}
            style={styles.repos}
            title={`${info.following}\nfollowing`}
          />
          <Button
            onPress={() => {
            this.props.setMain('followers');
            }}
            style={styles.repos}
            title={`${info.followers}\nfollowers`}
          />
          </View>
        </ScrollView>
      );
      return content
      }else{
        return (
          <ScrollView 
          style={styles.container}
          automaticallyAdjustContentInsets={false}>
          <Text style={{ textAlign: 'center', fontSize: 25, paddingTop: 200 }}>loading</Text>
          </ScrollView>
          )
        }
        
      }
}
const styles = StyleSheet.create({
      view: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
      },
      username : { textAlign: 'center', fontSize: 15, paddingTop: 10 },
      name : { textAlign: 'center', fontSize: 25, paddingTop: 10 },
      avatar : {width: 100, height: 100, borderRadius: 50,},
      repos : { flex: 1, paddingTop: 10 }
})

const mapStateToProps = (state) => ({
  loginUserId : state,
})

const mapDispatchToProps = dispatch => ({
  setMain : (tab) => dispatch(setMain(tab)),
  initLoginUser: () => dispatch(initLoginUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);