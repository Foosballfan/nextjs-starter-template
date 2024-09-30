import { HomeScreen } from 'app/features/home/home.screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Cats of War(acle)',
        }}
      />
      <HomeScreen />
    </>
  )
}
