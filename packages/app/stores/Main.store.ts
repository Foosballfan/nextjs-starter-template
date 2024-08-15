import { useToastController } from '@my/ui'
import { makeAutoObservable } from 'mobx'

export default class MainStore {
  initialized = false

  constructor(private toast: ReturnType<typeof useToastController>) {
    makeAutoObservable(this)
  }

  user: { name: string; email: string } | null = null

  login = () => {
    this.user = { name: 'charles', email: 'contact@ckiller.co.uk' }
    this.toast.show('Logged in')
  }

  logout = () => {
    this.user = null
  }
}
