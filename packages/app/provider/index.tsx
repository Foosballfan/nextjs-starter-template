import { useColorScheme } from 'react-native'
import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider, config } from '@my/ui'
import { ToastViewport } from './ToastViewport'
import { StoresProvider } from '../stores/StoreProvider'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      <ToastProvider swipeDirection="horizontal" duration={6000}>
        <StoresProvider>{children}</StoresProvider>
        <CustomToast />
        <ToastViewport />
      </ToastProvider>
    </TamaguiProvider>
  )
}
