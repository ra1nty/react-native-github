import { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
class Following extends Component {
  render() {
    const following = this.props.following.res;
    const content = (
      <ScrollView>
      <List containerStyle={{marginTop: 0}}>
      {
        following.map((item) => (
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
  following : state.following,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Following);