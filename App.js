import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

// Dimensions으로 해당 기기의 사이즈를 얻을 수 있다.
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    // View는 컨테이너 즉, div와 같은 것이다.
    // react native에 있는 모든 text는 text component에 들어가야 한다.
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      {/* ScrollView에서 css를 하려면 style이 아닌 contentContainerStyle을 이용해야 css 작성을 할 수 있다. */}
      {/* ScrollView는 스크린보다 더 나아가야 하기 때문에 flex가 필요없다. */}
      {/* horizontal: 수평, pagingEnabled: 스크롤을 자유롭게 하지 못하게 한다. 즉, 스크롤이 이어지지 않고 끊김 */}
      {/* showsHorizontalScrollIndicator를 false로 설정하면 아래에 표시되는 scroll indicator를 숨겨준다. */}
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// StyleSheet.create를 사용하는 이유는 css의 컴포넌트화와 자동 완성 기능 때문에 사용한다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 60,
    fontWeight: "bold",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 170,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
