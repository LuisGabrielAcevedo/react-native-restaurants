import { createStackNavigator } from "react-navigation-stack";
import TopRestaurantsScreen from "../screens/top-restaurants";

const TopRestaurantsScreenStacks = createStackNavigator({
  TopRestaurants: {
    screen: TopRestaurantsScreen,
    navigationOptions: () => ({
      title: "Top restaurants",
    }),
  },
});

export default TopRestaurantsScreenStacks;
