import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { addProduct_request, setAddedItem_success } from "../rootAction";

import wall from "../assets/wall22.png";
import quantity from "../assets/quantity.png";
import pill from "../assets/pills2.png";
import Spinner from "react-native-loading-spinner-overlay";

// var json = require('../assets/remedia3.json')

var json = require("../assets/remedia3.json");

class CodePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      productName: "",
      quantity: "",
      isAddedItem: false,
      check: false,
      error: "",
      spinner: false,
    };
    this.inputCode = React.createRef();
  }

  componentDidMount() {
    this.props.setIsAddedItemToFalse();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isAddedItem !== state.isAddedItem) {
      return {
        isAddedItem: props.isAddedItem,
        spinner: false,
        //added
        error: "",
      };
    }
    if (props.error !== state.error) {
      return {
        error: props.error,
        check: false,
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.isAddedItem === true) {
      if (this.state.check === true) {
        Alert.alert("Uspješno ste dodali proizvod!");
      }
    }
    if (this.state.error !== undefined) {
      if (this.state.error.length > 0) {
        // if(this.state.check === true) {
        Alert.alert(
          "Greška! Proizvod nije upisan! Provjerite internet konekciju!"
        );
        // }
      }
    }
  }

  sumbit = () => {
    if (this.state.code.length > 0 && this.state.quantity.length > 0) {
      if (this.state.productName !== undefined) {
        let product = {
          company_id: this.props.user.company_id,
          // shop: this.props.user.shop,
          user_id: this.props.user.id,
          barcode: this.state.code,
          quantity: this.state.quantity,
          product_name: this.state.productName,
          // year: new Date().getFullYear(),
          // date: new Date(),
          // nbr: 1
        };
        // this.props.setIsAddedItemToFalse()

        this.props.addProduct(product);
        //set is added item to false

        this.inputCode.focus();

        this.setState({
          code: "",
          productName: "",
          quantity: "",
          isAddedItem: false,
          check: true,
          spinner: true,
          // error: ""
        });
      } else {
        Alert.alert("Greška!", "Šifra ne postoji u bazi!");
      }
    } else {
      Alert.alert("Greška!", "Unesite podatke!");
    }
  };

  changeCode = (e) => {
    this.props.setIsAddedItemToFalse();

    let name;
    if (e.length == 6) {
      let product = json.find((item) => {
        // return item.barcode === e
        //promjeniti da trazi sifru a ne barkod
        return item.sifra === e;
      });
      if (product) {
        name = product.name;
        Alert.alert("Lijek: ", name);
      } else {
        Alert.alert("Greška!", "Sifra  ne postoji u bazi");
      }
    }
    this.setState({
      code: e,
      productName: name,
      isAddedItem: false,
      check: false,
      error: "",
    });
  };

  changeQuantity = (e) => {
    this.props.setIsAddedItemToFalse();

    this.setState({
      quantity: e,
      isAddedItem: false,
      check: false,
      error: "",
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={wall} style={styles.backgroundImage} />

        <Spinner visible={this.state.spinner} />

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={pill} />
          {/* BROJ */}
          <TextInput
            style={styles.inputs}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            // onChangeText={(code) => this.changeText({code})}
            onChangeText={(text) => this.changeCode(text)}
            value={this.state.code}
            maxLength={6}
            keyboardType="numeric"
            ref={(input) => {
              this.inputCode = input;
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={quantity} />
          <TextInput
            style={styles.inputs}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.changeQuantity(text)}
            value={this.state.quantity}
            keyboardType="numeric"
          />
        </View>
        <TouchableHighlight
          style={[
            styles.buttonContainer,
            styles.loginButton,
            styles.paddingButton,
          ]}
          onPress={this.sumbit}
        >
          <Text style={styles.loginText}>Pošalji</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.3,
  },
  inputContainer: {
    backgroundColor: "#F1F1F1",
    borderRadius: 30,
    width: 250,
    height: 45,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "rgba(38, 34, 98, 0.8)",
  },
  paddingButton: {
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  isAddedItem: {
    marginBottom: 10,
    color: "rgba(38, 34, 98, 0.8))",
  },
});

const mapStateToProps = (state) => ({
  isAddedItem: state.isAddedItem,
  user: state.user,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (details) => dispatch(addProduct_request(details)),
  setIsAddedItemToFalse: () => dispatch(setAddedItem_success()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodePage);
