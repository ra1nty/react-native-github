import React, { Component } from 'react';
import { ScrollView} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import axios from 'axios';
class Repos extends Component {
    constructor(props) {
        super(props);
        this._isStarred = this._isStarred.bind(this);
        this._changeStar = this._changeStar.bind(this);
    }
    componentDidUpdate(prevProps) {
        if(this.props.repos !== prevProps.repos && this.props.isReady){
            const repos = this.props.repos;
            repos.map((l) => {
                this._isStarred(l.full_name);
            })
        }
    }
    render() {
        if(!this.props.isReady || this.state == null) return (<ScrollView />);
        const repos = this.props.repos;
        const content = (
            <ScrollView>
                {
                    repos.map((l, i) => {
                        let check = this.state[l.full_name];
                        return (<ListItem
                            key={i}
                            title={l.name}
                            subtitle={l.description}
                            checkBox={{
                                checkedIcon : <Icon name='ios-star' type='ionicon'/>,
                                uncheckedIcon : <Icon name='ios-star-outline' type='ionicon'/>,
                                iconType : 'ionicon',
                                checked : check,
                                onPress : () => this._changeStar(l.full_name)
                            }}
                        />)
                    })
                }
            </ScrollView>
        );
        return content;
    }

    _isStarred(fn) {
        const authParams = { params : {access_token : this.props.token}};
        axios.get(`https://api.github.com/user/starred/${fn}`, authParams)
            .then(res => {
                this.setState({[fn]: res.status == 204});
            }).catch(e => {
                if (e.response) {
                    this.setState({[fn]: false});
                }
            });
    }

    _changeStar(fn) {
        const authParams = { params : {access_token : this.props.token}};
        const oldCheck = this.state[fn];
        this.setState({[fn]: !oldCheck});
        if(!oldCheck){
            axios.put(`https://api.github.com/user/starred/${fn}`, authParams)
                .then(res => {
                    this.setState({[fn]: res.status == 204});
                }).catch(e => {
                    if (e.response) {
                        this.setState({[fn]: false});
                    }
                });
        }else {
            axios.delete(`https://api.github.com/user/starred/${fn}`, authParams)
                .then(res => {
                    this.setState({[fn]: !(res.status == 204)});
                }).catch(e => {
                    if (e.response) {
                        this.setState({[fn]: true});
                    }
                });
        }
    }
}

const mapStateToProps = (state) => ({
    isReady : state.view.currentView == 'Repos',
    repos : state.view.data,
    id : state.user.id,
    token : state.user.token
})

const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Repos);