import { Component } from 'react';
import { ScrollView } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
class Repositories extends Component {
  render() {
    const repos = this.props.repos.res;
    const content = (
      <ScrollView>
        <List containerStyle={{marginTop: 0}}>
          {
            repos.map((item) => (
              <ListItem
                key={item.name}
                title={item.name}
                subtitle={item.description}
                rightIcon={<Icon
                  name='star'
                  color='#517fa4'
                />}
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
  repos : state.repos,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);