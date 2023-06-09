import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

// Dimensions으로 해당 기기의 사이즈를 얻을 수 있다.
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "f9064ebc5176a5a80b8a0136c5a122a5";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    // requestForegroundPermissionsAsync 함수는 위도와 경도를 주소로 변환해준다.
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // reverseGeocodeAsync 함수는 주소를 위도, 경도 숫자로 변환해준다.
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setDays(data.list))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    // View는 컨테이너 즉, div와 같은 것이다.
    // react native에 있는 모든 text는 text component에 들어가야 한다.
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
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
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator size="large" style={{ marginTop: 10 }} />
          </View>
        ) : (
          days.map((day, index) => {
            const time = day.dt_txt.split(" ");
            return (
              <View key={index} style={styles.day}>
                <Text style={styles.date}>{time[0]}</Text>
                <Text style={styles.time}>{time[1]}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
                  <Fontisto name={icons[day.weather[0].main]} size={68} color="white" />
                </View>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

// StyleSheet.create를 사용하는 이유는 css의 컴포넌트화와 자동 완성 기능 때문에 사용한다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#437299",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  date: {
    marginTop: 50,
    fontSize: 20,
    color: "white",
  },
  time: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  temp: {
    fontSize: 100,
    color: "white",
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});
