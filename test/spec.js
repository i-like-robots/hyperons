const { expect } = require('chai')
const subject = require('../dist/cjs')

describe('Hyperons', () => {
  describe('elements', () => {
    it('renders simple elements', () => {
      const result = '' + subject('div')
      expect(result).to.equal('<div></div>')
    })

    it('renders void elements', () => {
      const result = '' + subject('br')
      expect(result).to.equal('<br/>')
    })

    it('does not render null elements', () => {
      const result = '' + subject(null)
      expect(result).to.equal('')
    })

    it('invokes higher-order components', () => {
      const hoc = (attrs) => subject('span', attrs)
      const result = '' + subject(hoc, { className: 'hoc' })
      expect(result).to.equal('<span class="hoc"></span>')
    })
  })

  describe('properties', () => {
    it('renders HTML attribute names and values', () => {
      const result = '' + subject('form', { action: '/submit', method: 'post' })
      expect(result).to.equal('<form action="/submit" method="post"></form>')
    })

    it('does not render null or undefined HTML attributes', () => {
      const result = '' + subject('div', { itemtype: null, itemprop: undefined })
      expect(result).to.equal('<div></div>')
    })

    it('ignores framework specific properties', () => {
      const result = '' + subject('div', { key: 'item', children: [] })
      expect(result).to.equal('<div></div>')
    })

    it('aliases conflicting JS keywords', () => {
      const result = '' + subject('label', { className: 'label', htmlFor: 'id' })
      expect(result).to.equal('<label class="label" for="id"></label>')
    })

    it('escapes HTML attribute values', () => {
      const result = '' + subject('img', { alt: '"Mac & Cheese"' })
      expect(result).to.equal('<img alt="&quot;Mac &amp; Cheese&quot;"/>')
    })

    context('boolean attributes', () => {
      it('does not append boolean attributes with a falsy value', () => {
        const result = '' + subject('details', { hidden: false, open: 0 })
        expect(result).to.equal('<details></details>')
      })

      it('appends boolean attributes with a truthy value', () => {
        const result = '' + subject('details', { hidden: true, open: 1 })
        expect(result).to.equal('<details hidden open></details>')
      })

      it('renders boolean values for enumerable attributes', () => {
        const result = '' + subject('div', { contenteditable: true, spellcheck: false })
        expect(result).to.equal('<div contenteditable="true" spellcheck="false"></div>')
      })
    })

    context('styles', () => {
      it('stringifies style attributes', () => {
        const result = '' + subject('div', { style: { padding: '0.5em 1em', margin: '1em 0' } })
        expect(result).to.equal('<div style="padding:0.5em 1em;margin:1em 0;"></div>')
      })

      it('hyphenates style properties', () => {
        const result = '' + subject('div', { style: { paddingTop: '0.5em', marginBottom: '1em' } })
        expect(result).to.equal('<div style="padding-top:0.5em;margin-bottom:1em;"></div>')
      })

      it('hyphenates vendor prefixed properties', () => {
        const result = '' + subject('div', { style: { MozHyphens: 'auto', msHyphens: 'auto' } })
        expect(result).to.equal('<div style="-moz-hyphens:auto;-ms-hyphens:auto;"></div>')
      })

      it('applies pixel units to number values', () => {
        const result = '' + subject('div', { style: { padding: 10, margin: 20 } })
        expect(result).to.equal('<div style="padding:10px;margin:20px;"></div>')
      })

      it('does not apply pixel values to unitless properties', () => {
        const result = '' + subject('div', { style: { flexShrink: 1, order: 2 } })
        expect(result).to.equal('<div style="flex-shrink:1;order:2;"></div>')
      })

      it('ignores null or undefined properties', () => {
        const result = '' + subject('div', { style: { width: null, height: undefined, border: 0 } })
        expect(result).to.equal('<div style="border:0;"></div>')
      })
    })
  })

  describe('children', () => {
    it('ignores falsy children', () => {
      const result = '' + subject('div', {}, undefined, null, false)
      expect(result).to.equal('<div></div>')
    })

    it('renders text children', () => {
      const result = '' + subject('div', null, 'Hello World')
      expect(result).to.equal('<div>Hello World</div>')
    })

    it('renders numeric children', () => {
      const result = '' + subject('div', null, 123)
      expect(result).to.equal('<div>123</div>')
    })

    it('escapes text children', () => {
      const result = '' + subject('div', null, '"Mac & Cheese"')
      expect(result).to.equal('<div>&quot;Mac &amp; Cheese&quot;</div>')
    })

    it('does not escape HTML children', () => {
      const result = '' + subject('div', null, subject('i', null, 'Hello World'))
      expect(result).to.equal('<div><i>Hello World</i></div>')
    })

    it('renders multiple children', () => {
      const result =
        '' +
        subject('div', null, subject('i', null, 'Hello'), ' ', subject('i', null, 'World'), '!')

      expect(result).to.equal('<div><i>Hello</i> <i>World</i>!</div>')
    })

    it('renders nested children', () => {
      const result =
        '' +
        subject('div', null, [
          subject('i', null, 'Hello'),
          [' ', [subject('i', null, 'World'), '!']]
        ])

      expect(result).to.equal('<div><i>Hello</i> <i>World</i>!</div>')
    })

    it('passes children to higher-order components', () => {
      const hoc = (props) => subject('ul', null, props.children)
      const result = '' + subject(hoc, null, subject('li', null, 'one'), subject('li', null, 'two'))
      expect(result).to.equal('<ul><li>one</li><li>two</li></ul>')
    })

    it('allows setting inner HTML', () => {
      const result = '' + subject('div', { dangerouslySetInnerHTML: { __html: '<i>Hello</i>' } })
      expect(result).to.equal('<div><i>Hello</i></div>')
    })
  })
})
