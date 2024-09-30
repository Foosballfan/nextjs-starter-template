import React, { useState } from 'react'
import { Button, Image, YStack } from '@my/ui'
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
    <YStack f={1} jc="center" ai="center" gap="$4" bg="$background">
      <Button icon={ChevronLeft} onPress={() => router.back()}>
        Go Home
      </Button>
      <Button onPress={pickImage}>Pick an Image</Button>
      {selectedImage && (
        <YStack>
          <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200 }} />
          <Button onPress={() => uploadImage(selectedImage)}>Upload Image</Button>
        </YStack>
      )}
    </YStack>
  )
})
