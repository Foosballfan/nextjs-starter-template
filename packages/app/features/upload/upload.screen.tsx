import React, { useState } from 'react'
import { Button, Image, XStack, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { observer } from 'mobx-react-lite'
import { useStores } from 'app/stores/StoreProvider'
import { useRouter } from 'solito/navigation'
import * as ImagePicker from 'expo-image-picker'
import { ICatImageUpload } from 'app/gateways/cat.gateway'

export const UploadScreen = observer(function UploadScreen() {
  const router = useRouter()
  const { uploadImage } = useStores().uploadPresenter
  const [selectedImage, setSelectedImage] = useState<ICatImageUpload | null>(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (!result.canceled) {
      const file = result.assets[0]
      setSelectedImage({
        uri: file.uri,
        name: file.fileName ?? '',
        type: file.mimeType ?? 'image/jpeg',
      })
    }
  }

  return (
    <YStack f={1} jc="center" ai="center" gap="$8" bg="$background">
      {selectedImage && (
        <YStack gap="$4">
          <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200 }} />
          <Button
            onPress={async () => {
              const result = await uploadImage(selectedImage)
              if (result) router.push('/')
            }}
          >
            Upload Image
          </Button>
        </YStack>
      )}
      <XStack gap="$4">
        <Button icon={ChevronLeft} onPress={() => router.back()}>
          Go Home
        </Button>
        <Button onPress={pickImage}>Pick an Image</Button>
      </XStack>
    </YStack>
  )
})
