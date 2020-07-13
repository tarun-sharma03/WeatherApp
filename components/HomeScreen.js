import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import MyHeader from "./header";
import { Card, Title } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

// http://openweathermap.org/img/w/

export default class HomeScreen extends React.Component {
  state = {
    name: "",
    temperature: "",
    humidity: "",
    description: "",
    feelsLike: "",
    icon: "",
  };

  async fetchWeather() {
    myCity = await AsyncStorage.getItem("MyCity");
    if (!myCity) {
      myCity = "Karnal";

      if (this.props.route.params?.city) {
        myCity = this.props.route.params.city;
      }
    }
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${myCity}&units=metric&appid=<YOUR API KEY>`
    )
      .then((res) => res.json())
      .then((data2) => {
        this.setState({
          name: data2.name,
          temperature: data2.main.temp,
          humidity: data2.main.humidity,
          description: data2.weather[0].description,
          feelsLike: data2.main.feels_like,
          icon: data2.weather[0].icon,
        });
        // console.log(data2);
      })

      .catch((err) => {
        alert(
          "Some Error Occured!! Either the city does not exist or your internet is not connected!!"
        );
        this.props.navigation.navigate("Search");
      });
  }

  componentDidMount() {
    this.fetchWeather();
  }

  render() {
    if (this.props.route.params?.city) {
      this.fetchWeather();
    }

    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Current Weather" />
        <View
          style={{
            backgroundColor: "rgb(38, 38, 38)",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              margin: 20,
              alignContent: "center",
              // padding: 10,
            }}
          >
            <LinearGradient
              colors={["rgb(128, 128, 128)", "rgb(242, 242, 242)"]}
            >
              <View style={{ alignItems: "center", padding: 10 }}>
                <Title style={{ ...styles.text, fontSize: 40 }}>
                  {this.state.name}
                </Title>
                <Image
                  style={{
                    width: 150,
                    height: 150,
                  }}
                  source={{
                    uri: `http://openweathermap.org/img/w/${this.state.icon}.png`,
                  }}
                />
                <Title style={styles.text}>
                  Description : {this.state.description}
                </Title>
                <Title style={styles.text}>
                  Temperature : {this.state.temperature} Celcius
                </Title>
                <Title style={styles.text}>
                  Feels Like : {this.state.feelsLike} Celcius
                </Title>
                <Title style={styles.text}>
                  Humidity : {this.state.humidity} %
                </Title>
              </View>
            </LinearGradient>
          </Card>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(0, 128, 255)",
    justifyContent: "center",
  },

  text: {
    margin: 10,
    padding: 10,
    alignContent: "center",
    textAlign: "center",
  },
});
