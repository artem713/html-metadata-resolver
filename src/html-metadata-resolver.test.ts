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

  it('should return meta attributes w/o values when no values provided', () => {
    const metaWithoutInfo = getHtmlWithMetaTag(`<meta without values>`)
    expect(sut(metaWithoutInfo)).toEqual({
      without: '',
      values: '',
    })
  })

  it('should resolve meta attribute with value', () => {
    const metaWithSingleAttr = getHtmlWithMetaTag(`<meta key="value">`)
    expect(sut(metaWithSingleAttr)).toEqual({key: 'value'})
  })

  it('should resolve meta attributes for all meta tags', () => {
    const severalMetaWithSingleAttr = getHtmlWithMetaTag(`
      <meta key1="val1">
      <meta key2="val2">
    `)
    expect(sut(severalMetaWithSingleAttr)).toEqual({
      key1: 'val1',
      key2: 'val2',
    })
  })
  
  it('should resolve meta attributes with values when several attributes provided', () => {
    const metaWithSeveralAttrs = getHtmlWithMetaTag(`<meta key1="val1" key2='val2'>`)
    expect(sut(metaWithSeveralAttrs)).toEqual({
      key1: 'val1',
      key2: 'val2',
    })
  })
  
  it('should return empty object when no meta tags provided', () => {
    expect(sut(`
      <!doctype html>
      <html>
      </html>
    `)).toEqual({})
  })
})
