import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    // View는 컨테이너 즉, div와 같은 것이다.
    // react native에 있는 모든 text는 text component에 들어가야 한다.
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 3, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
    </View>
  );
}

// StyleSheet.create를 사용하는 이유는 css의 컴포넌트화와 자동 완성 기능 때문에 사용한다.
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 50,
//     color: "tomato",
//   },
// });
