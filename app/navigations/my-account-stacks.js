import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/account/my-account";
import LoginScreen from "../screens/account/login";
import RegisterScreen from "../screens/account/register";

const MyAccountScreenStacks = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      title: "My account",
    }),
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Login",
    }),
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Register",
    }),
  },
});

export default MyAccountScreenStacks;
