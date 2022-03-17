import { describe, expect, it, fn } from 'vitest'
import { useCallback, useMemo, useReducer, useRef, useState } from '../src'

describe('hooks', () => {
  describe('.useCallback()', () => {
    it('returns the given function', () => {
      const callback = () => {}
      expect(useCallback(callback)).toBe(callback)
    })
  })

  describe('.useMemo()', () => {
    it('calls the given function and returns the value', () => {
      const callback = () => 123
      expect(useMemo(callback)).toBe(123)
    })
  })

  describe('.useReducer()', () => {
    it('returns the given state and an empty function', () => {
      const callback = () => {}
      const state = { number: 123 }

      expect(useReducer(callback, state)).toEqual([state, expect.any(Function)])
    })

    it('calls init function if provided with given state', () => {
      const callback = () => 123
      const state = { number: 123 }
      const init = fn((s) => s)

      expect(useReducer(callback, state, init)).toEqual([state, expect.any(Function)])
      expect(init).toHaveBeenCalledWith(state)
    })
  })

  describe('.useRef()', () => {
    it('returns given value in a ref-like object', () => {
      expect(useRef(123)).toEqual({ current: 123 })
    })
  })

  describe('.useState()', () => {
    it('returns given value and an empty function', () => {
      expect(useState(123)).toEqual([123, expect.any(Function)])
    })
  })
})
