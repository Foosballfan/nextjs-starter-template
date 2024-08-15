import { makeAutoObservable } from 'mobx'
import { TToast } from './storeTypes'

export default class MainStore {
  initialized = false

  constructor(private toast: TToast) {
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
