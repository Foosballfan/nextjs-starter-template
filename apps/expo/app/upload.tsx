import { UploadScreen } from 'app/features/upload/upload.screen'
import { Stack } from 'expo-router'
import { useTheme } from '@my/ui'

export default function Screen() {
  const theme = useTheme()

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Upload',
        }}
      />
      <UploadScreen />
    </>
  )
}
