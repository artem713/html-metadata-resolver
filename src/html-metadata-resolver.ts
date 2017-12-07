import {Parser} from 'htmlparser2'

export interface IWebpageMetadataItem {
  [key: string]: string
}

export function resolveMetadata(html: string) {
  const metadata: IWebpageMetadataItem[] = []
  const parser = new Parser({
    onopentag(name: string, attrs: object) {
      if(name === 'meta') {
        metadata.push(attrs as IWebpageMetadataItem)
      }
    }
  }, {decodeEntities: true})

  parser.write(html)
  parser.end()

  return metadata
}