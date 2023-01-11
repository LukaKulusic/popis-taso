import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableHighlight  } from 'react-native';
import { connect } from 'react-redux';

import logo from '../assets/logo.png'
import wall from '../assets/wall22.png'
import user from '../assets/user.png'
import pass from '../assets/pass.png'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLoggedUser_request, login_request } from '../rootAction';

class Login extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           email: '',
           password: '',
           error: '',
           token: '',
           isLoading: false
       }

    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem('token')
        if(token !== null) {
            this.props.navigation.navigate('Home')
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.token !== state.token) {
            return {
                token: props.token
            }
        }
        if(props.error !== state.error) {
            return {
                error: props.error
            }
        }
        return null
    }   
    

    async componentDidUpdate() {
        let token = await AsyncStorage.getItem('token')
        if(token !== null) {
            this.props.navigation.navigate('Home')
        }
    }


    submit = () => {
        if(this.state.email.length == 0 || this.state.password.length == 0) {
           alert("Polja e-mail i password su obavezna")
         } else {
            if(typeof this.state.email !== 'undefined') {
                if(!this.state.email.match(/[^@]+@[^.]+\..+/)) {
                    alert("E-mail nije ispravnog formata")
                } else {
                    let credentials = {
                        email: this.state.email,
                        password: this.state.password
                    }

                    console.log('cretentialsssssssssssssss = ', credentials);

                    this.props.login(credentials)
                    this.setState({isLoading: true})
                    this.resetFields()
                }
            } 
        }
    }

    resetFields = () => {
        this.setState({
            email : '',
            password: ''
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={logo} />
                <Image source={wall} style={styles.backgroundImage} />
                
                <View style={styles.error}>
                    <Text style={styles.textColor}>{this.state.error}</Text>
                </View>
                
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={user} />
                    <TextInput style={styles.inputs}
                        placeholder="E-mail"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({email})}
                        // onChange={this.changeEmail}
                        value={this.state.email}
                        />
                </View>
            
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={pass}/>
                    <TextInput style={styles.inputs}
                        placeholder="********"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({password})}
                        // onChange={this.changePass}
                        value={this.state.password}
                        />
                </View>
    
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
                    onPress={this.submit}
                >
                <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>
          </View>
        )
    }
} 

const styles = StyleSheet.create({
    img: {
        marginTop: -75,
        marginBottom: 0,
        height: 130,
        width: 200
    },  
    backgroundImage:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.3
    },
    container: {
        paddingTop: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
      },
      inputContainer: {
          backgroundColor: '#F1F1F1',
          borderRadius:30,
          width:250,
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center'
      },
      inputs:{
          height:45,
          marginLeft:16,
          flex:1,
      },
      inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
      },
      loginButton: {
        backgroundColor: 'rgba(38, 34, 98, 0.8)'
      },
      loginText: {
        color: 'white',
      },
      error: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 10,
        paddingTop: 10
      },
      textColor: {
        color: 'rgb(220,20,60)',
      }
  });


const mapStateToProps = state => ({
    token: state.token,
    user: state.user,
    error: state.error
})



const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(login_request(user)),
    getLoggedUser: (token) => dispatch(getLoggedUser_request(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)