import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image, FlatList } from 'react-native';

export default class SingleItem extends React.Component {

    // componentDidMount() {
    //     console.log('componentDidMount SingleItem --------------------------- ', this.props);
    // }

    render() {
        console.log(123)
        return(
            <View style={styles.container}>
                <Text>
                    {/* {this.props.barcode}  */}
                    test
                </Text>
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
  });
  