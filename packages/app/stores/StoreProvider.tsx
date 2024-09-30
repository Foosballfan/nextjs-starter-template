import { ReactNode, createContext, useContext } from 'react'
import { useToastController } from '@my/ui'
import UploadPresenter from '../features/upload/upload.presenter'
import HomePresenter from '../features/home/home.presenter'
import CatStore from './Cat.store'

type TStores = {
  catStore: CatStore
  uploadPresenter: UploadPresenter
  homePresenter: HomePresenter
}

// holds a reference to the store (singleton)
let catStore: CatStore
let uploadPresenter: UploadPresenter
let homePresenter: HomePresenter

// create the context
const StoreContext = createContext<TStores | undefined>(undefined)

// create the provider component
export function StoresProvider({ children }: { children: ReactNode }) {
  //only create the store once ( store is a singleton)
  const toast: ReturnType<typeof useToastController> = useToastController()
  catStore = catStore ?? new CatStore(toast)
  uploadPresenter = uploadPresenter ?? new UploadPresenter(toast)
  homePresenter = homePresenter ?? new HomePresenter(toast, catStore)

  const root: TStores = {
    catStore,
    uploadPresenter,
    homePresenter,
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
