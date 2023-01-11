import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, FlatList } from 'react-native';

import wall from '../assets/wall22.png'
import { connect } from 'react-redux';
import { getProducts_request } from '../rootAction';

import Pagination,{Icon,Dot} from 'react-native-pagination';

import SingleItem from './SingleItem';

class ItemPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            current_page: 1,
            total: 0,

            viewableItems: []
        }
    }

    async componentDidMount() {
        let details = {
            company_id: this.props.user.company_id,
            user_id: this.props.user.id
        }
        this.props.getProducts(details)
    }

    static getDerivedStateFromProps(props, state) {
        // console.log('propssssssssssssssss = ', props);
        let _items, _current_page, _total
        if(props.items !== state.items) {
            if(props.items !== undefined) {
                _items = props.items.data
                _current_page = props.items.current_page
                _total = props.items.total
            }
          return {
            items: _items,
            current_page:_current_page,
            total: _total,
          }
        }
        return null
    }   
    
    _renderItem = ({item}) => {
        console.log('render item------------------ ', item.barcode);
        return (<SingleItem index={item.id}
            // onPressItem={this.onPressItem}
            barcode={item.barcode}
            product_name={item.product_name}
            quantity={item.quantity}
            // avatar={item.avatar}
            // description={item.email}
            // tag={item.group}
            createTagColor
          />)
        };

        //pressed an item
//   onPressItem = (item) => console.log("onPressItem:item ",item);

  //map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
  _keyExtractor = (item, index) => item.id.toString();

  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) => {
      console.log('onViewableItemsChanged viewableItems ===== ', viewableItems);
    this.setState({viewableItems})
  }
  

  

    render() {
        const color = 'black';

        return (
            <View style={styles.container}>
                <Image source={wall} style={styles.backgroundImage} />

                <FlatList
                    data={this.state.items}
                    ref={r=>this.refs=r}//create refrence point to enable scrolling
                    keyExtractor={this._keyExtractor}//map your keys to whatever unique ids the have (mine is a "id" prop)
                    renderItem={this._renderItem}//render each item
                    onViewableItemsChanged={this.onViewableItemsChanged}//need this
                />

                <Pagination
                    // dotThemeLight //<--use with backgroundColor:"grey"
                    listRef={this.refs}//to allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list)
                    paginationVisibleItems={this.state.viewableItems}//needs to track what the user sees
                    paginationItems={this.state.items}//pass the same list as data
                    paginationItemPadSize={3} //num of items to pad above and below your visable items
                />

          </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: -180,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundImage:{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      opacity: 0.3
    },
      inputContainer: {
        backgroundColor: '#F1F1F1',
        borderRadius:30,
        width:250,
        height:45,
        marginBottom:10,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
      height:45,
      marginLeft:16,
      flex:1,
      color: 'rgb(105,105,105)'
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      justifyContent: 'center',
      alignItems: 'center',
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: 'rgba(38, 34, 98, 0.8)'
    },
    buttonContainerLogout: {
      height:45,
      justifyContent: 'center',
      alignItems: 'center',
      width: 250,
      borderRadius:30,
      marginTop:10,

    },
    logoutButton: {
      backgroundColor: 'rgba(187, 37, 5, 0.8)'
    },
    paddingButton: {
      marginBottom: 10,
    },
    loginText: {
      color: 'white',
    }
  });
  

const mapStateToProps = state => ({
  user: state.user,
  items: state.items
})

const mapDispatchToProps = dispatch => ({
    getProducts: (details) => dispatch(getProducts_request(details))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage)