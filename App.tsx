import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { AuthProvider } from "./src/context/AuthContext"
import { OrderProvider } from "./src/context/OrderContext"
import RootNavigator from "./src/navigation/RootNavigator"

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <OrderProvider>
          <NavigationContainer>
            <StatusBar style="light" translucent backgroundColor="transparent" />
            <RootNavigator />
          </NavigationContainer>
        </OrderProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
