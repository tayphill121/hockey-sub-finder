"use client"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"

// Auth Screens
import LoginScreen from "./screens/auth/LoginScreen"
import SignupScreen from "./screens/auth/SignupScreen"
import PaymentScreen from "./screens/auth/PaymentScreen"

// Main Screens
import DashboardScreen from "./screens/main/DashboardScreen"
import ProfileScreen from "./screens/main/ProfileScreen"
import RequestSubScreen from "./screens/main/RequestSubScreen"
import TeamsScreen from "./screens/main/TeamsScreen"
import MessagesScreen from "./screens/main/MessagesScreen"
import LeagueIntegrationScreen from "./screens/main/LeagueIntegrationScreen"
import TeamDetailsScreen from "./screens/main/TeamDetailsScreen"

// Context
import { AuthProvider, useAuth } from "./context/AuthContext"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Teams") {
            iconName = focused ? "people" : "people-outline"
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbubble" : "chatbubble-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          } else if (route.name === "Leagues") {
            iconName = focused ? "trophy" : "trophy-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
        headerShown: true,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Teams" component={TeamsScreen} />
      <Tab.Screen name="Leagues" component={LeagueIntegrationScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

function AppNavigator() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
              name="RequestSub"
              component={RequestSubScreen}
              options={{
                headerShown: true,
                title: "Request Substitute",
              }}
            />
            <Stack.Screen
              name="TeamDetails"
              component={TeamDetailsScreen}
              options={{
                headerShown: true,
                title: "Team Details",
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  )
}
