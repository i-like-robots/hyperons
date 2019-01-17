const { expect } = require('chai')
const { h, render, Fragment, Component } = require('../')

describe('Hyperons', () => {
  describe('elements', () => {
    it('renders simple elements', () => {
      const result = h('div')
      expect(render(result)).to.equal('<div></div>')
    })

    it('renders void elements', () => {
      const result = h('br')
      expect(render(result)).to.equal('<br/>')
    })

    it('does not render fragments', () => {
      const result = h(Fragment)
      expect(render(result)).to.equal('')
    })

    it('invokes functional components', () => {
      const component = (props) => h('span', { className: 'hoc' }, props.text)
      const result = h(component, { text: 'Hello World' })
      expect(render(result)).to.equal('<span class="hoc">Hello World</span>')
    })

    it('does not render null', () => {
      expect(render(null)).to.equal('')
    })

    it('creates new instances of class-based components', () => {
      class TestComponent extends Component {
        render() {
          return h('span', null, this.props.text)
        }
      }

      const result = h(TestComponent, { text: 'Hello World' })
      expect(render(result)).to.equal('<span>Hello World</span>')
    })
  })

  describe('properties', () => {
    it('renders HTML attribute names and values', () => {
      const result = h('form', { action: '/submit', method: 'post' })
      expect(render(result)).to.equal('<form action="/submit" method="post"></form>')
    })

    it('does not render null or undefined HTML attributes', () => {
      const result = h('div', { itemtype: null, itemprop: undefined })
      expect(render(result)).to.equal('<div></div>')
    })

    it('ignores framework specific properties', () => {
      const result = h('div', { key: 'item', children: [] })
      expect(render(result)).to.equal('<div></div>')
    })

    it('aliases conflicting JS keywords', () => {
      const result = h('label', { className: 'label', htmlFor: 'id' })
      expect(render(result)).to.equal('<label class="label" for="id"></label>')
    })

    it('lowercases camelCase attribute names', () => {
      const result = h('input', { tabIndex: -1, defaultValue: 'Hello' })
      expect(render(result)).to.equal('<input tabindex="-1" value="Hello"/>')
    })

    it('escapes HTML attribute values', () => {
      const result = h('img', { alt: '"Mac & Cheese"' })
      expect(render(result)).to.equal('<img alt="&quot;Mac &amp; Cheese&quot;"/>')
    })

    context('boolean attributes', () => {
      it('does not append boolean attributes with a falsy value', () => {
        const result = h('details', { hidden: false, open: 0 })
        expect(render(result)).to.equal('<details></details>')
      })

      it('appends boolean attributes with a truthy value', () => {
        const result = h('details', { hidden: true, open: 1 })
        expect(render(result)).to.equal('<details hidden open></details>')
      })

      it('renders boolean values for enumerable attributes', () => {
        const result = h('div', { contenteditable: true, spellcheck: false })
        expect(render(result)).to.equal('<div contenteditable="true" spellcheck="false"></div>')
      })
    })

    context('styles', () => {
      it('stringifies style attributes', () => {
        const result = h('div', { style: { padding: '0.5em 1em', margin: '1em 0' } })
        expect(render(result)).to.equal('<div style="padding:0.5em 1em;margin:1em 0;"></div>')
      })

      it('hyphenates style properties', () => {
        const result = h('div', { style: { paddingTop: '0.5em', marginBottom: '1em' } })
        expect(render(result)).to.equal('<div style="padding-top:0.5em;margin-bottom:1em;"></div>')
      })

      it('hyphenates vendor prefixed properties', () => {
        const result = h('div', { style: { MozHyphens: 'auto', msHyphens: 'auto' } })
        expect(render(result)).to.equal('<div style="-moz-hyphens:auto;-ms-hyphens:auto;"></div>')
      })

      it('applies pixel units to number values', () => {
        const result = h('div', { style: { padding: 10, margin: 20 } })
        expect(render(result)).to.equal('<div style="padding:10px;margin:20px;"></div>')
      })

      it('does not apply pixel values to unitless properties', () => {
        const result = h('div', { style: { flexShrink: 1, order: 2 } })
        expect(render(result)).to.equal('<div style="flex-shrink:1;order:2;"></div>')
      })

      it('ignores null or undefined properties', () => {
        const result = h('div', { style: { width: null, height: undefined, border: 0 } })
        expect(render(result)).to.equal('<div style="border:0;"></div>')
      })
    })
  })

  describe('children', () => {
    it('ignores empty children', () => {
      const result = h('div', {}, undefined, null)
      expect(render(result)).to.equal('<div></div>')
    })

    it('renders text children', () => {
      const result = h('div', null, 'Hello World')
      expect(render(result)).to.equal('<div>Hello World</div>')
    })

    it('renders numeric children', () => {
      const result = h('div', null, 123)
      expect(render(result)).to.equal('<div>123</div>')
    })

    it('renders numeric children even if they are zero', () => {
      const result = h('div', null, 0)
      expect(render(result)).to.equal('<div>0</div>')
    })

    it('does not render boolean children', () => {
      const a = h('div', null, true)
      expect(render(a)).to.equal('<div></div>')

      const b = h('div', null, false)
      expect(render(b)).to.equal('<div></div>')
    })

    it('escapes text children', () => {
      const result = h('div', null, '"Mac & Cheese"')
      expect(render(result)).to.equal('<div>&quot;Mac &amp; Cheese&quot;</div>')
    })

    it('renders multiple children', () => {
      const result = h('div', null, h('i', null, 'Hello'), ' ', h('i', null, 'World'), '!')
      expect(render(result)).to.equal('<div><i>Hello</i> <i>World</i>!</div>')
    })

    it('renders nested children', () => {
      const result = h('div', null, [h('i', null, 'Hello'), [' ', [h('i', null, 'World'), '!']]])
      expect(render(result)).to.equal('<div><i>Hello</i> <i>World</i>!</div>')
    })

    it('passes children to compositional components', () => {
      const hoc = (props) => h('ul', null, props.children)
      const result = h(hoc, null, h('li', null, 'one'), h('li', null, 'two'))
      expect(render(result)).to.equal('<ul><li>one</li><li>two</li></ul>')
    })

    it('favours children provided as arguments over props', () => {
      const hoc = (props) => h('ul', null, props.children)
      const result = h(
        hoc,
        { children: [h('li', null, 'one'), h('li', null, 'two')] },
        h('li', null, 'three')
      )
      expect(render(result)).to.equal('<ul><li>three</li></ul>')
    })

    it('it allows children provided as props if no children arguments were provided', () => {
      const hoc = (props) => h('ul', null, props.children)
      const result = h(hoc, { children: [h('li', null, 'one'), h('li', null, 'two')] })
      expect(render(result)).to.equal('<ul><li>one</li><li>two</li></ul>')
    })

    it('supports setting inner HTML', () => {
      const result = h('div', { dangerouslySetInnerHTML: { __html: '<i>Hello</i>' } })
      expect(render(result)).to.equal('<div><i>Hello</i></div>')
    })

    it('renders the children of fragments', () => {
      const result = h('dl', {}, h(Fragment, {}, h('dt', {}, 'Title'), h('dd', {}, 'Description')))
      expect(render(result)).to.equal('<dl><dt>Title</dt><dd>Description</dd></dl>')
    })
  })
})
