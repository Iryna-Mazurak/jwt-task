import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";

import { Colors } from "./utils/styles";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import IconButton from "./components/ui/IconButton";
import { authActions } from "./store/authSlice";
import store from "./store";
import { logout as logoutUser } from "./utils/authDataService";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function EnteredStack() {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.login);
  const refreshToken = useSelector((state) => state.auth.refreshToken);

  async function logoutHandler() {
    try {
      await logoutUser(refreshToken);
    } catch (error) {
      Alert.alert(
        "Logout",
        "Could not notify the server about logout. Your local session will be cleared."
      );
    } finally {
      dispatch(authActions.logout());
    }
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name={`Welcome to posts, ${username}!`}
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={logoutHandler}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function InnerNavigation() {
  const token = useSelector((state) => state.auth.token);

  return token ? <EnteredStack /> : <AuthStack />;
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <InnerNavigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
