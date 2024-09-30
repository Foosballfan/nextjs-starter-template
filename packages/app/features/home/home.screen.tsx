import { Anchor, Button, H1, Image, Paragraph, XStack, YStack, useWindowDimensions } from '@my/ui'
import { MasonryFlashList } from '@shopify/flash-list'
import { ArrowDown, ArrowUp, Heart, HeartOff } from '@tamagui/lucide-icons'
import { useStores } from 'app/stores/StoreProvider'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useLink } from 'solito/navigation'

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
          renderItem={({ item }) => {
            const upvotes = item.votes?.filter((vote) => vote.value > 0).length
            const downvotes = item.votes?.filter((vote) => vote.value < 0).length
            return (
              <>
                <YStack>
                  <Image src={item.url} style={{ height: calculateItemHeight(item) }} />
                  <Button
                    pos="absolute"
                    b="$2"
                    r="$2"
                    icon={item.favourite ? <Heart fill="red" /> : <HeartOff />}
                    onPress={() =>
                      item.favourite ? unfavouriteCat(item.id) : favouriteCat(item.id)
                    }
                  />
                </YStack>
                <XStack ai="center" gap="$2" p="$2" jc="center">
                  <Paragraph>Vote: </Paragraph>
                  <Button size="$2" icon={ArrowUp} onPress={() => voteForCat(item.id, 1)} />
                  <Button size="$2" icon={ArrowDown} onPress={() => voteForCat(item.id, -1)} />
                  <XStack f={1} />
                  <Paragraph>Cat score: {upvotes - downvotes}</Paragraph>
                </XStack>
              </>
            )
          }}
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
