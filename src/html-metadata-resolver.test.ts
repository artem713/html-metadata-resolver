import { resolveMetadata as sut } from './html-metadata-resolver'

describe('html metadata attributes resolver', () => {

  const getHtmlWithMetaTag = (tag: string) => `
    <!doctype html>
    <html>
      <head>
        ${tag}
      </head>
    </html>
  `

  it('should return meta attributes array w/o values when no values provided', () => {
    const metaWithoutInfo = getHtmlWithMetaTag(`<meta without values>`)
    expect(sut(metaWithoutInfo)).toEqual([{
      without: '',
      values: '',
    }])
  })

  it('should resolve meta attribute array with value', () => {
    const metaWithSingleAttr = getHtmlWithMetaTag(`<meta key="value">`)
    expect(sut(metaWithSingleAttr)).toEqual([{key: 'value'}])
  })

  it('should resolve meta attributes for all meta tags', () => {
    const severalMetaWithSingleAttr = getHtmlWithMetaTag(`
      <meta key1="val1">
      <meta key2="val2">
    `)
    expect(sut(severalMetaWithSingleAttr)).toEqual([{
      key1: 'val1'
    }, {
      key2: 'val2',
    }])
  })

  it('should resolve meta attributes for all meta tags', () => {
    const severalMetaWithSingleAttr = getHtmlWithMetaTag(`
      <meta content='https://assets.devhints.io/previews/react.jpg?t=20171127115911' property='og:image'>
      <meta content='https://assets.devhints.io/previews/react.jpg?t=20171127115911' property='twitter:image'>
    `)
    expect(sut(severalMetaWithSingleAttr)).toEqual([{
      property: 'og:image',
      content: 'https://assets.devhints.io/previews/react.jpg?t=20171127115911',
    }, {
      property: 'twitter:image',
      content: 'https://assets.devhints.io/previews/react.jpg?t=20171127115911',
    }])
  })
  
  it('should resolve meta attributes array with values when several attributes provided', () => {
    const metaWithSeveralAttrs = getHtmlWithMetaTag(`<meta key1="val1" key2='val2'>`)
    expect(sut(metaWithSeveralAttrs)).toEqual([{
      key1: 'val1',
      key2: 'val2',
    }])
  })
  
  it('should return empty array when no meta tags provided', () => {
    expect(sut(`
      <!doctype html>
      <html>
      </html>
    `)).toEqual([])
  })
})
