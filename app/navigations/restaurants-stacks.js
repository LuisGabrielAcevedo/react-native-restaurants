import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../screens/restaurants/restaurants";
import AddRestaurant from "../screens/restaurants/add-restaurant";

const RestaurantsScreenStack = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: () => ({
      title: "Restaurantes",
    }),
  },
  AddRestaurant: {
    screen: AddRestaurant,
    navigationOptions: () => ({
      title: "Nuevo restaurante",
    }),
  },
});

export default RestaurantsScreenStack;
