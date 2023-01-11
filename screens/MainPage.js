import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Button,
  ClippingRectangle,
} from "react-native";
import { connect } from "react-redux";
import DialogInput from "react-native-dialog-input";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { addProduct_request, setAddedItem_success } from "../rootAction";

// var json = require('../assets/remedia3.json')
var json = require("../assets/remedia3.json");

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: "",
      barCode: "",
      code: "",
      hasCameraPermission: null,
      scanned: false,
      isAlertVisible: false,
      // products: [],
      productName: "",
      isAddedItem: "",

      //added
      error: "",
      spinner: false,
    };
  }

  async componentDidMount() {
    this.getPermissionsAsync();

    //added
    this.props.setIsAddedItem();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isAddedItem !== state.isAddedItem) {
      return {
        isAddedItem: props.isAddedItem,
      };
    }

    //added
    if (props.error !== state.error) {
      return {
        error: props.error,
        check: false,
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.isAddedItem) {
      if (this.state.check) {
        Alert.alert("Uspješno ste dodali proizvod!");
      }
    }

    //
    //added
    //
    if (this.state.error !== undefined) {
      if (this.state.error.length > 0) {
        // if(this.state.check === true) {
        Alert.alert("Greška! Provjerite internet konekciju!");
        // }
      }
    }
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  submitCount = (_count) => {
    this.setState({ count: _count, isAlertVisible: false });
    if (_count.match(/^-?[0-9]\d*(\.\d+)?$/)) {
      //deleted if condition - da bi mogla da se unese kolicina -5
      // if(_count > 0) {
      let product = {
        company_id: this.props.user.company_id,
        // shop: this.props.user.shop,
        user_id: this.props.user.id,
        // barcode: parseInt(this.state.barCode),
        //
        //proslijediti sifru a ne barkod!!!
        //
        //ne radi - ako sifra pocinje sa jednom ili vise 0, ne upise ih
        // barcode: parseInt(this.state.code),

        //poslati SIFRU umjesto bar koda
        barcode: this.state.code,
        product_name: this.state.productName,
        // year: new Date().getFullYear(),
        quantity: parseInt(_count),
        // date: new Date(),
        // nbr: 1
      };
      //
      this.props.addProduct(product);

      this.setState({
        check: true,
      });
      // }

      // else {
      //   Alert.alert('Greška!','Morate unijeti količinu!')
      // }
    } else {
      Alert.alert("Greška!", "Morate unijeti broj kao podatak o količini!");
    }
  };

  closeModal = () => {
    this.props.setIsAddedItem();

    this.setState({ isAlertVisible: false, check: false });
  };

  handleBarCodeScanned = ({ type, data }) => {
    //set props.isAddedItem to ""
    this.props.setIsAddedItem();

    let name, visible, code;
    let product = json.find((item) => {
      return item.barcode == data;
    });
    if (product) {
      name = product.name;
      //dodati sifru i proslijediti je u queriju da se upise u bazu, NE BARKOD
      code = product.sifra;
      visible = true;
    } else {
      visible = false;
      Alert.alert("Greška!", "Bar kod ne postoji u bazi");
    }
    this.setState({
      scanned: true,
      isAlertVisible: visible,
      barCode: data,
      code: code,
      productName: name,
      check: false,

      //added
      error: "",
    });
  };

  scanPress = () => {
    this.props.setIsAddedItem();
    this.setState({
      scanned: false,
      check: false,
      //added
      error: "",
    });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={"Skeniraj ponovo"} onPress={this.scanPress} />
        )}

        <DialogInput
          isDialogVisible={this.state.isAlertVisible}
          title={`Lijek: ${this.state.productName}`}
          message={"Unesite kolicinu:"}
          submitInput={this.submitCount}
          closeDialog={this.closeModal}
          keyboardType="numeric"
        ></DialogInput>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isAddedItem: state.isAddedItem,
  user: state.user,
  //added
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (details) => dispatch(addProduct_request(details)),
  setIsAddedItem: () => dispatch(setAddedItem_success()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
