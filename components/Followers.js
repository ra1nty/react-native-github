import { Component } from 'react';
import { ScrollView  } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';

class Followers extends Component {
  render() {
    const followers = this.props.followers.res;
    const content = (
      <ScrollView>
      <List containerStyle={{marginTop: 0}}>
      {
        followers.map((item) => (
          <ListItem
          key={item.login}
          title={item.login}
          hideChevron={true}
          />
        ))
      }
      </List>
      </ScrollView>
    );
    return content
  }
}
    
const mapStateToProps = (state) => ({
  followers : state.followers,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Followers);