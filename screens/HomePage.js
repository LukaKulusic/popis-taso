import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';

import wall from '../assets/wall22.png'
import user from '../assets/user.png'
import company from '../assets/company.png'
import shop from '../assets/shop.png'
import { getLoggedUser_request } from '../rootAction';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          user: ""
        }
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem('token')
        if(token !== null) {
            this.props.getLoggedUser(token)
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.user !== state.user) {
          return {
            user: props.user
          }
        }
        return null
    }   

    logout = () => {
       AsyncStorage.removeItem('token')
       this.props.navigation.navigate('Login')
    }


    render() {
        return (
            <View style={styles.container}>
            <Image source={wall} style={styles.backgroundImage} />

            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={user} />
              <TextInput style={styles.inputs}
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  value={this.state.user.name || ""}
                  editable={false}/>
            </View>

            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={company} />
              <TextInput style={styles.inputs}
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  // value={this.state.user.company_id === 1 ? "Remedia 1" : (this.state.user.company_id === 2 ? "Remedia 2" : (this.state.user.company_id === 5 ? "Remedia 5" : (this.state.user.company_id === 6 ? "Uniprom Pharm" : ""))) }
                  value={this.state.user.company_id === 3 ? "Remedia 3" : (this.state.user.company_id === 4 ? "Remedia 4" : (this.state.user.company_id === 5 ? "Remedia 5" : (this.state.user.company_id === 6 ? "Uniprom Pharm" : ""))) }
                  editable={false}/>
            </View>


            {/* <TouchableHighlight style={[styles.buttonContainer, styles.loginButton, styles.paddingButton]} onPress={() => this.props.navigation.navigate('Item')}>
              <Text style={styles.loginText}>Pregled upisa</Text>
            </TouchableHighlight> */}

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton, styles.paddingButton]} onPress={() => this.props.navigation.navigate('Code')}>
              <Text style={styles.loginText}>Počnite popis - šifra</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('Main')}>
              <Text style={styles.loginText}>Počnite popis - barkod</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.buttonContainerLogout, styles.logoutButton]} onPress={this.logout}>
              <Text style={styles.loginText}>Logout</Text>
            </TouchableHighlight>
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
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  getLoggedUser: (token) => dispatch(getLoggedUser_request(token)),
  setIsAddedItemToFalse: () => dispatch(setAddedItem_success())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)