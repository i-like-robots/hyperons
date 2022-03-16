import { describe, expect, it } from 'vitest'
import { h, render, createContext, useContext, Component } from '../src'

describe('context', () => {
  it('accepts a default value', () => {
    const Ctx = createContext({ text: 'Hello, World!' })

    const result = render(<Ctx.Consumer>{(ctx) => <p>{ctx.text}</p>}</Ctx.Consumer>)

    expect(result).toBe('<p>Hello, World!</p>')
  })

  it('accepts a value passed to a provider', () => {
    const Ctx = createContext()

    const result = render(
      <Ctx.Provider value={{ text: 'Hello, World!' }}>
        <Ctx.Consumer>{(ctx) => <p>{ctx.text}</p>}</Ctx.Consumer>
      </Ctx.Provider>
    )

    expect(result).toBe('<p>Hello, World!</p>')
  })

  it('enables access to context value via a hook', () => {
    const Ctx = createContext({ text: 'Hello, World!' })

    const Subject = () => {
      const ctx = useContext(Ctx)
      return <p>{ctx.text}</p>
    }

    const result = render(<Subject />)

    expect(result).toBe('<p>Hello, World!</p>')
  })

  it('enables access to context value via class contextType', () => {
    const Ctx = createContext({ text: 'Hello, World!' })

    class Subject extends Component {
      render() {
        return <p>{this.context.text}</p>
      }
    }

    Subject.contextType = Ctx

    const result = render(<Subject />)

    expect(result).toBe('<p>Hello, World!</p>')
  })

  it('enables nesting context values with providers and consumers', () => {
    const Ctx = createContext({ number: 1 })

    const List = () => {
      return (
        <ul>
          <Ctx.Consumer>{(ctx) => <li>{ctx.number}</li>}</Ctx.Consumer>
          <Ctx.Provider value={{ number: 2 }}>
            <Ctx.Consumer>{(ctx) => <li>{ctx.number}</li>}</Ctx.Consumer>
            <Ctx.Provider value={{ number: 3 }}>
              <Ctx.Consumer>{(ctx) => <li>{ctx.number}</li>}</Ctx.Consumer>
            </Ctx.Provider>
            <Ctx.Consumer>{(ctx) => <li>{ctx.number}</li>}</Ctx.Consumer>
          </Ctx.Provider>
          <Ctx.Consumer>{(ctx) => <li>{ctx.number}</li>}</Ctx.Consumer>
        </ul>
      )
    }

    const result = render(<List />)

    expect(result).toBe('<ul><li>1</li><li>2</li><li>3</li><li>2</li><li>1</li></ul>')
  })

  it('enables nesting context values with providers and hooks', () => {
    const Ctx = createContext({ number: 1 })

    const ListItem = () => {
      const ctx = useContext(Ctx)
      return <li>{ctx.number}</li>
    }

    const List = () => {
      return (
        <ul>
          <ListItem />
          <Ctx.Provider value={{ number: 2 }}>
            <ListItem />
            <Ctx.Provider value={{ number: 3 }}>
              <ListItem />
            </Ctx.Provider>
            <ListItem />
          </Ctx.Provider>
          <ListItem />
        </ul>
      )
    }

    const result = render(<List />)

    expect(result).toBe('<ul><li>1</li><li>2</li><li>3</li><li>2</li><li>1</li></ul>')
  })

  it('throws if a consumer is not given a single render function', () => {
    const Ctx = createContext()

    expect(() => render(<Ctx.Consumer></Ctx.Consumer>)).toThrowError()

    expect(() => render(<Ctx.Consumer>{123}</Ctx.Consumer>)).toThrowError()

    expect(() =>
      render(
        <Ctx.Consumer>
          {() => {}}
          {() => {}}
        </Ctx.Consumer>
      )
    ).toThrowError()
  })
})
