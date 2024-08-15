import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { observer } from 'mobx-react-lite'
import { useStores } from 'app/stores/StoreProvider'
import { useParams, useRouter } from 'solito/navigation'

export const UserDetailScreen = observer(function UserDetailScreen() {
  const router = useRouter()
  const { id } = useParams()
  const { login, user, logout } = useStores().mainStore

  return (
    <YStack f={1} jc="center" ai="center" gap="$4" bg="$background">
      <Paragraph ta="center" fow="700" col="$blue10">
        {user?.name ? `User logged in with ID: ${id} and name: ${user.name}` : 'User not logged in'}
      </Paragraph>
      <Button onPress={() => login()}>Login</Button>
      <Button onPress={() => logout()}>Logout</Button>
      <Button icon={ChevronLeft} onPress={() => router.back()}>
        Go Home
      </Button>
    </YStack>
  )
})
