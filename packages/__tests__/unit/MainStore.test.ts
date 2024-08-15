import MainStore from 'app/stores/Main.store'
import { ToastMock } from '../mocks/toastMock'
import { describe, expect, it } from '@jest/globals'

describe('MainStore', () => {
  describe('user', () => {
    it('can be null', () => {
      const store = new MainStore(ToastMock)
      expect(store.user).toBeFalsy()
    })

    it('can be set', () => {
      const store = new MainStore(ToastMock)
      store.user = { name: 'charles', email: 'contact@ckiller.co.uk' }
      expect(store.user?.name).toBe('charles')
    })

    it('user can login and logout', () => {
      const store = new MainStore(ToastMock)
      expect(store.user).toBeFalsy()
      store.login()
      expect(store.user?.name).toBeTruthy()
      expect(ToastMock.show).toHaveBeenCalledTimes(1)
      store.logout()
      // don't call the toast on logout
      expect(ToastMock.show).toHaveBeenCalledTimes(1)
      expect(store.user).toBeFalsy()
    })
  })
})
