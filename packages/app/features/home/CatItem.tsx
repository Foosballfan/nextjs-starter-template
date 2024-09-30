import React from 'react'
import { YStack, XStack, Image, Button, Paragraph } from '@my/ui'
import { ArrowDown, ArrowUp, Heart, HeartOff } from '@tamagui/lucide-icons'

interface CatItemProps {
  item: any
  calculateItemHeight: (sourceData: any) => number
  favouriteCat: (id: string) => void
  unfavouriteCat: (id: string) => void
  voteForCat: (id: string, value: number) => void
}

const CatItem: React.FC<CatItemProps> = ({
  item,
  calculateItemHeight,
  favouriteCat,
  unfavouriteCat,
  voteForCat,
}) => {
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
          onPress={() => (item.favourite ? unfavouriteCat(item.id) : favouriteCat(item.id))}
        />
      </YStack>
      <XStack ai="center" gap="$2" p="$2" jc="center">
        <Paragraph>Score: {upvotes - downvotes}</Paragraph>
        <XStack f={1} />
        <Button size="$2" icon={ArrowUp} onPress={() => voteForCat(item.id, 1)} />
        <Button size="$2" icon={ArrowDown} onPress={() => voteForCat(item.id, -1)} />
      </XStack>
    </>
  )
}

export default CatItem
