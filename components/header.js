import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";

const Header = (props) => {
  return (
    <Appbar.Header style={{ backgroundColor: "rgb(13, 13, 13)" }}>
      <Appbar.Content
        title="My Weather"
        subtitle={props.title}
        style={{ alignItems: "center" }}
      />
    </Appbar.Header>
  );
};

export default Header;
