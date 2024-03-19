import { describe, expect, it } from 'vitest'
import { h, render, Suspense } from '../src'

describe('async', () => {
  it('renders the provided fallback component', () => {
    const result = render(
      <Suspense fallback={<p>Yes</p>}>
        <p>No</p>
      </Suspense>
    )
    expect(result).toBe('<p>Yes</p>')
  })
})
