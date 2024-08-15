import { TToast } from 'app/stores/storeTypes'
import { jest } from '@jest/globals'

export const ToastMock = {
  show: jest.fn(),
} as unknown as TToast
