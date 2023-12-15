import { NativeBaseProvider } from 'native-base'

import { StatusBar } from 'react-native'
import Router from './src/routes/index'

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content" translucent />
      <Router />
    </NativeBaseProvider>
  )
}
