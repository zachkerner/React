/** @jest-environment jsdom */

import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders homepage', () => {
  render(<App />)

  const heading = screen.getByText("welcome to the primes calculator!")
  expect(heading).toBeDefined()
})