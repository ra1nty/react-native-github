import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getUserFollowers, getUserFollowing, getUserRepos } from '../../redux/actions/user';
class Profile extends Component {
  render() {
    const info = this.props.user;
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
          <View style={{flex:1 ,flexDirection: 'column'}}>
          <Button
            onPress={() => {
              this.props.getUserRepos(info.login);
              this.props.navigation.navigate('Repos');
            }}
            buttonStyle={styles.buttons}
            title={`${info.public_repos}  repos`}
            titleStyle={{ fontWeight: "700" }}
            containerStyle={{padding : 10}}
          />
          <Button
            onPress={() => {
              this.props.getUserFollowing(info.login);
              this.props.navigation.navigate('Users');
            }}
            buttonStyle={styles.buttons}
            title={`${info.following}  following`}
            titleStyle={{ fontWeight: "700" }}
            containerStyle={{padding : 10}}
          />
          <Button
            onPress={() => {
              this.props.getUserFollowers(info.login);
              this.props.navigation.navigate('Users');
            }}
            buttonStyle={styles.buttons}
            title={`${info.followers}  followers`}
            titleStyle={{ fontWeight: "700" }}
            containerStyle={{padding : 10}}
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
      repos : { flex: 1, paddingTop: 10 },
      buttons : {
        width: 200,
        height: 65,
        padding : 10
      }
})

const mapStateToProps = (state) => ({
  user : state.view.data,
})

const mapDispatchToProps = dispatch => ({
  getUserFollowers : (id) => dispatch(getUserFollowers(id)),
  getUserFollowing : (id) => dispatch(getUserFollowing(id)),
  getUserRepos : (id) => dispatch(getUserRepos(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);