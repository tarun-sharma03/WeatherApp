import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import MyHeader from "./header";
import { TextInput, Button } from "react-native-paper";

class SearchScreen extends React.Component {
  state = {
    city: "",
  };

  fetchCity(city) {
    this.setState({
      city: city,
    });
  }

  async buttonPressHandler() {
    this.props.navigation.navigate("Home", {
      city: this.state.city,
    });

    await AsyncStorage.setItem("MyCity", this.state.city);
  }

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Search the City" />
        <View style={styles.body}>
          <TextInput
            label="Enter City"
            value={this.state.city}
            onChangeText={(city) => this.fetchCity(city)}
            style={{ alignContent: "center", margin: 10 }}
          />
          <Button
            icon="check"
            mode="contained"
            onPress={() => this.buttonPressHandler()}
            style={{
              margin: 10,
              backgroundColor: "rgb(0, 0, 0)",
            }}
          >
            Submit
          </Button>
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
}
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    backgroundColor: "rgb(38, 38, 38)",
    justifyContent: "center",
  },
});
