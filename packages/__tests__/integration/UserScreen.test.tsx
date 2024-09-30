import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CatStore from 'app/stores/Cat.store'
import { UserDetailScreen } from 'app/features/upload/detail-screen'
import { ToastMock } from '../mocks/toastMock'
import { describe, expect, it } from '@jest/globals'

describe('TodoList.functional', async () => {
  it('filters todos', async () => {
    const store = new CatStore(ToastMock)

    render(<UserDetailScreen />)

    await screen.findByRole('heading')
    // expect user not logged in message
    expect(screen.getByRole('heading')).toContain('User not logged in')

    // login
    store.login()

    // expect user logged in message
    expect(screen.getByRole('heading')).toContain('User logged in with ID: 1 and name: charles')

    // logout
    store.logout()

    // expect user not logged in message
    expect(screen.getByRole('heading')).toContain('User not logged in')
  })
})
