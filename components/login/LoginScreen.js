import React from "react";
import { connect } from "react-redux";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { logIn } from '../../redux/actions/login'
import { Button, Input } from 'react-native-elements'


class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this._onLogin = this._onLogin.bind(this);
    }
    
    _onLogin() {
        this.props.logIn(this.state.username, this.state.password);
    }

    render () {
        return (
            <View style = {styles.loginView}>
                <Input
                    placeholder='Username'
                    onChangeText={(text) => this.setState({username : text})}
                />
                <Input
                    placeholder='Password'
                    onChangeText={(text) => this.setState({password : text})}
                />
                <Button title='Login' onPress={this._onLogin}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginView: {
        margin : 'auto',
        marginTop: 150,
        backgroundColor: 'transparent',
        width: 250,
        height: 400,
    },
})

const mapStateToProps = (state) => ({
    isLoggedIn : state.user.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
    logIn : (u,p) => dispatch(logIn(u,p)),
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);