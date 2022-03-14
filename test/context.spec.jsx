import { describe, expect, it } from 'vitest'
import { h, render, createContext, useContext } from '../src'

describe('context', () => {
  it('accepts a default value', () => {
    const Instance = createContext({ text: 'Hello, World!' })

    const result = render(<Instance.Consumer>{(ctx) => <p>{ctx.text}</p>}</Instance.Consumer>)

    expect(result).toBe('<p>Hello, World!</p>')
  })

  it('accepts a value passed to a provider', () => {
    const Instance = createContext()

    const result = render(
      <Instance.Provider value={{ text: 'Hello, World!' }}>
        <Instance.Consumer>{(ctx) => <p>{ctx.text}</p>}</Instance.Consumer>
      </Instance.Provider>
    )

    expect(result).toBe('<p>Hello, World!</p>')
  })

  it('enables access to context via a hook', () => {
    const Instance = createContext({ text: 'Hello, World!' })

    const Component = () => {
      const ctx = useContext(Instance)
      return <p>{ctx.text}</p>
    }

    const result = render(<Component />)

    expect(result).toBe('<p>Hello, World!</p>')
  })

  it('enables nesting context providers and consumers', () => {
    const Instance = createContext({ number: 1 })

    const List = () => {
      return (
        <ul>
          <Instance.Consumer>{(ctx) => <li>{ctx.number}</li>}</Instance.Consumer>
          <Instance.Provider value={{ number: 2 }}>
            <Instance.Consumer>{(ctx) => <li>{ctx.number}</li>}</Instance.Consumer>
            <Instance.Provider value={{ number: 3 }}>
              <Instance.Consumer>{(ctx) => <li>{ctx.number}</li>}</Instance.Consumer>
            </Instance.Provider>
            <Instance.Consumer>{(ctx) => <li>{ctx.number}</li>}</Instance.Consumer>
          </Instance.Provider>
          <Instance.Consumer>{(ctx) => <li>{ctx.number}</li>}</Instance.Consumer>
        </ul>
      )
    }

    const result = render(<List />)

    expect(result).toBe('<ul><li>1</li><li>2</li><li>3</li><li>2</li><li>1</li></ul>')
  })

  it('enables nesting context providers and hooks', () => {
    const Instance = createContext({ number: 1 })

    const ListItem = () => {
      const ctx = useContext(Instance)
      return <li>{ctx.number}</li>
    }

    const List = () => {
      return (
        <ul>
          <ListItem />
          <Instance.Provider value={{ number: 2 }}>
            <ListItem />
            <Instance.Provider value={{ number: 3 }}>
              <ListItem />
            </Instance.Provider>
            <ListItem />
          </Instance.Provider>
          <ListItem />
        </ul>
      )
    }

    const result = render(<List />)

    expect(result).toBe('<ul><li>1</li><li>2</li><li>3</li><li>2</li><li>1</li></ul>')
  })
})
