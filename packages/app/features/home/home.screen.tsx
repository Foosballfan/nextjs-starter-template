import { Button, XStack, YStack, useWindowDimensions } from '@my/ui'
import { MasonryFlashList } from '@shopify/flash-list'
import { useStores } from 'app/stores/StoreProvider'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useLink } from 'solito/navigation'
import CatItem from './CatItem'

export const HomeScreen = observer(function HomeScreen() {
  const linkProps = useLink({ href: `/upload` })
  const { cats, getCats, favouriteCat, unfavouriteCat, voteForCat } = useStores().homePresenter
  const { width } = useWindowDimensions()
  const columns = Math.min(Math.round(width / 200), 4)
  useEffect(() => {
    getCats()
  }, [])

  const calculateItemHeight = (sourceData: (typeof cats)[0]) => {
    return ((sourceData.height / sourceData.width) * width) / columns
  }

  return (
    <YStack f={1} ai="center" gap="$4" p="$4" bg="$background">
      <YStack w="100%" f={1}>
        <MasonryFlashList<(typeof cats)[0]>
          optimizeItemArrangement={true}
          data={cats}
          numColumns={columns}
          renderItem={({ item }) => (
            <CatItem
              item={item}
              calculateItemHeight={calculateItemHeight}
              favouriteCat={favouriteCat}
              unfavouriteCat={unfavouriteCat}
              voteForCat={voteForCat}
            />
          )}
          estimatedItemSize={200}
          overrideItemLayout={(layoutObject, sourceData) => {
            layoutObject.size = calculateItemHeight(sourceData)
          }}
        />
      </YStack>

      <XStack ai="center" jc="center" gap="$4" w="100%">
        <Button onPress={getCats}>Refresh Cats</Button>
        <Button {...linkProps}>Upload a cat</Button>
      </XStack>
    </YStack>
  )
})
