import { describe, expect, it } from 'vitest'
import { h, render, Fragment, Component } from '../src'

describe('Hyperons', () => {
  describe('elements', () => {
    it('renders simple elements', () => {
      const result = render(<div></div>)
      expect(result).toBe('<div></div>')
    })

    it('renders void elements', () => {
      const result = render(<br />)
      expect(result).toBe('<br/>')
    })

    it('does not render fragments', () => {
      const result = render(<Fragment />)
      expect(result).toBe('')
    })

    it('invokes functional components', () => {
      const Component = (props) => <span className="c">{props.text}</span>
      const result = render(<Component text="Hello World" />)
      expect(result).toBe('<span class="c">Hello World</span>')
    })

    it('does not render null', () => {
      expect(render(null)).toBe('')
    })

    it('does not render booleans', () => {
      expect(render(true)).toBe('')
      expect(render(false)).toBe('')
    })

    it('creates new instances of class-based components', () => {
      class ClassComponent extends Component {
        render() {
          return <span>{this.props.text}</span>
        }
      }

      const result = render(<ClassComponent text="Hello World" />)
      expect(result).toBe('<span>Hello World</span>')
    })

    it('supports default props', () => {
      class ClassComponent extends Component {
        static get defaultProps() {
          return { text: 'Hello World' }
        }
      }

      function StatelessComponent() {}

      StatelessComponent.defaultProps = { text: 'Hello World' }

      const a = <ClassComponent />
      const b = <StatelessComponent />

      expect(a.props.text).toBe('Hello World')
      expect(b.props.text).toBe('Hello World')
    })
  })

  describe('properties', () => {
    it('renders HTML attribute names and values', () => {
      const result = render(<form action="/submit" method="post" />)
      expect(result).toBe('<form action="/submit" method="post"></form>')
    })

    it('does not render null or undefined HTML attributes', () => {
      const result = render(<div itemtype={null} itemprop={undefined} className={undefined} />)
      expect(result).toBe('<div></div>')
    })

    it('ignores framework specific properties', () => {
      const result = render(<div key="item" children={[]} />)
      expect(result).toBe('<div></div>')
    })

    it('aliases conflicting JS keywords', () => {
      const result = render(<label className="label" htmlFor="id" />)
      expect(result).toBe('<label class="label" for="id"></label>')
    })

    it('lowercases camelCase attribute names', () => {
      const result = render(<input tabIndex={-1} defaultValue="Hello" />)
      expect(result).toBe('<input tabindex="-1" value="Hello"/>')
    })

    it('escapes HTML attribute values', () => {
      const result = render(<img alt='"Mac & Cheese"' />)
      expect(result).toBe('<img alt="&quot;Mac &amp; Cheese&quot;"/>')
    })

    describe('boolean attributes', () => {
      it('does not append boolean attributes with a falsy value', () => {
        const result = render(<details hidden={false} open={0} />)
        expect(result).toBe('<details></details>')
      })

      it('appends boolean attributes with a truthy value', () => {
        const result = render(<details hidden={true} open={1} />)
        expect(result).toBe('<details hidden open></details>')
      })

      it('renders boolean values for enumerable attributes', () => {
        const result = render(<div contenteditable={true} spellcheck={false} />)
        expect(result).toBe('<div contenteditable="true" spellcheck="false"></div>')
      })
    })

    describe('styles', () => {
      it('stringifies style attributes', () => {
        const result = render(<div style={{ padding: '0.5em 1em', margin: '1em 0' }} />)
        expect(result).toBe('<div style="padding:0.5em 1em;margin:1em 0;"></div>')
      })

      it('hyphenates style properties', () => {
        const result = render(<div style={{ paddingTop: '0.5em', marginBottom: '1em' }} />)
        expect(result).toBe('<div style="padding-top:0.5em;margin-bottom:1em;"></div>')
      })

      it('hyphenates vendor prefixed properties', () => {
        const result = render(<div style={{ MozHyphens: 'auto', msHyphens: 'auto' }} />)
        expect(result).toBe('<div style="-moz-hyphens:auto;-ms-hyphens:auto;"></div>')
      })

      it('applies pixel units to number values', () => {
        const result = render(<div style={{ padding: 10, margin: 20 }} />)
        expect(result).toBe('<div style="padding:10px;margin:20px;"></div>')
      })

      it('does not apply pixel values to unitless properties', () => {
        const result = render(<div style={{ flexShrink: 1, order: 2 }} />)
        expect(result).toBe('<div style="flex-shrink:1;order:2;"></div>')
      })

      it('ignores null or undefined properties', () => {
        const result = render(<div style={{ width: null, height: undefined, border: 0 }} />)
        expect(result).toBe('<div style="border:0;"></div>')
      })
    })
  })

  describe('children', () => {
    it('ignores empty children', () => {
      const result = render(
        <div>
          {undefined}
          {null}
        </div>
      )
      expect(result).toBe('<div></div>')
    })

    it('renders text children', () => {
      const result = render(<div>Hello World</div>)
      expect(result).toBe('<div>Hello World</div>')
    })

    it('renders numeric children', () => {
      const result = render(<div>{123}</div>)
      expect(result).toBe('<div>123</div>')
    })

    it('renders numeric children even if they are zero', () => {
      const result = render(<div>{0}</div>)
      expect(result).toBe('<div>0</div>')
    })

    it('does not render boolean children', () => {
      const a = render(<div>{true}</div>)
      expect(a).toBe('<div></div>')

      const b = render(<div>{false}</div>)
      expect(b).toBe('<div></div>')
    })

    it('escapes text children', () => {
      const result = render(<div>"Mac & Cheese"</div>)
      expect(result).toBe('<div>&quot;Mac &amp; Cheese&quot;</div>')
    })

    it('renders multiple children', () => {
      const result = render(
        <div>
          <i>Hello</i> <i>World</i>!
        </div>
      )
      expect(result).toBe('<div><i>Hello</i> <i>World</i>!</div>')
    })

    it('renders nested children', () => {
      const result = render(<div>{[<i>Hello</i>, [' ', [<i>World</i>, '!']]]}</div>)
      expect(result).toBe('<div><i>Hello</i> <i>World</i>!</div>')
    })

    it('passes children to compositional components', () => {
      const Parent = (props) => <ul>{props.children}</ul>
      const result = render(
        <Parent>
          <li>one</li>
          <li>two</li>
        </Parent>
      )

      expect(result).toBe('<ul><li>one</li><li>two</li></ul>')
    })

    it('it allows children provided as props', () => {
      const Parent = (props) => <ul>{props.children}</ul>
      const result = render(<Parent children={[<li>one</li>, <li>two</li>]} />)

      expect(result).toBe('<ul><li>one</li><li>two</li></ul>')
    })

    it('favours children provided as arguments over props', () => {
      const Parent = (props) => <ul>{props.children}</ul>
      const result = render(
        <Parent children={[<li>one</li>, <li>two</li>]}>
          <li>three</li>
        </Parent>
      )

      expect(result).toBe('<ul><li>three</li></ul>')
    })

    it('supports setting inner HTML', () => {
      const result = render(<div dangerouslySetInnerHTML={{ __html: '<i>Hello</i>' }} />)
      expect(result).toBe('<div><i>Hello</i></div>')
    })

    it('renders the children of fragments', () => {
      const result = render(
        <dl>
          <Fragment>
            <dt>Title</dt>
            <dd>Description</dd>
          </Fragment>
        </dl>
      )
      expect(result).toBe('<dl><dt>Title</dt><dd>Description</dd></dl>')
    })
  })
})
