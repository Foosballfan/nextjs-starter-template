import { ReactNode, createContext, useContext } from 'react'
import MainStore from './Main.store'
import { useToastController } from '@my/ui'

type TStores = {
  mainStore: MainStore
}

// holds a reference to the store (singleton)
let mainStore: MainStore

// create the context
const StoreContext = createContext<TStores | undefined>(undefined)

// create the provider component
export function StoresProvider({ children }: { children: ReactNode }) {
  //only create the store once ( store is a singleton)
  const toast: ReturnType<typeof useToastController> = useToastController()
  mainStore = mainStore ?? new MainStore(toast)

  const root: TStores = {
    mainStore,
  }

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
}

// create the hook
export function useStores() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStores must be used within StoresProvider')
  }

  return context
}
