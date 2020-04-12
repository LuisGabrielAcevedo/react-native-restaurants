import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import RestaurantsScreenStacks from "./restaurants-stacks";
import TopRestaurantsScreenStacks from "./top-restaurants-stacks";
import SearchScreenStacks from "./search-stacks";
import MyAccountScreenStacks from "./my-account-stacks";

const NavigationStacks = createBottomTabNavigator(
  {
    Restaurants: {
      screen: RestaurantsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Restaurantes",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            size={22}
            name="compass-outline"
            color={tintColor}
          />
        ),
      }),
    },
    TopRestaurants: {
      screen: TopRestaurantsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Top Restaurantes",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            size={22}
            name="star-outline"
            color={tintColor}
          />
        ),
      }),
    },
    Search: {
      screen: SearchScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            size={22}
            name="magnify"
            color={tintColor}
          />
        ),
      }),
    },
    MyAccount: {
      screen: MyAccountScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            size={22}
            name="home-outline"
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Search",
    order: ["Restaurants", "TopRestaurants", "Search", "MyAccount"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680",
    },
  }
);

export default createAppContainer(NavigationStacks);
