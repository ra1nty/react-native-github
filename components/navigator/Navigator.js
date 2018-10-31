import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { store } from '../../redux/store';
import LoginScreen from '../login/LoginScreen';
import { Ionicons } from '@expo/vector-icons';

import { getUserInfo, getUserStarredRepos } from '../../redux/actions/user';


import Profile from '../tabs/Profile';
import Users from '../tabs/Users';
import Repos from '../tabs/Repos';
const HomeStack = createStackNavigator({
  Profile : Profile,
  Users : Users,
  Repos : Repos
});

const RepoStack = createStackNavigator({
  Repos : Repos
});

const Main = createBottomTabNavigator(
  {
    Home : HomeStack,
    Repos : RepoStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-folder${focused ? '' : '-open'}`;
        } else if (routeName === 'Repos') {
          iconName = `ios-star${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
      tabBarOnPress: ({ navigation, defaultHandler }) =>{
        console.log(navigation.state);
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          store.dispatch(getUserInfo(store.getState().user.id))
          defaultHandler()
        } else if (routeName === 'Repos') {
          store.dispatch(getUserStarredRepos(store.getState().user.id))
          defaultHandler()
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
const mapStateToProps = state => ({
  appUserId : state.user.id,
});

const mapDispatchToProps = dispatch => ({
  getUserInfo : (id) => dispatch(getUserInfo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)