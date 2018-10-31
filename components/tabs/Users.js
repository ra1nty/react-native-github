import React, { Component } from 'react';
import { ScrollView} from 'react-native';
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { getUserInfo } from '../../redux/actions/user'
class Users extends Component {
    render() {
        if(!this.props.isReady) return (<ScrollView />);
        const users = this.props.users;
        console.log(users);
        const content = (
            <ScrollView>
                {
                    users.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={l.login}
                            hideChevron={false}
                            onPress={() => {
                                this.props.getUserInfo(l.login);
                                this.props.navigation.navigate('Profile');
                            }} 
                        />
                    ))
                }
            </ScrollView>
        );
        return this.props.isReady ? content : (<ScrollView />)
    }
}

const mapStateToProps = (state) => ({
    isReady : state.view.currentView == 'Users',
    users : state.view.data,
})

const mapDispatchToProps = dispatch => ({
    getUserInfo : (id) => dispatch(getUserInfo(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Users);