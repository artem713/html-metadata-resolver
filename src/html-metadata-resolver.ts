import {Parser} from 'htmlparser2'

export interface IWebpageMetadata {
  [key: string]: string
}

export function resolveMetadata(html: string) {
  let metadata: IWebpageMetadata = {}
  
  const parser = new Parser({
    onopentag(name: string, attrs: object) {
      if(name === 'meta') {
        metadata = {
          ...metadata,
          ...attrs
        } as IWebpageMetadata
      }
    }
  }, {decodeEntities: true})

  parser.write(html)
  parser.end()

  return metadata
}