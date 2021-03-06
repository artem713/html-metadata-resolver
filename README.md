[![Build Status](https://travis-ci.org/artem713/html-metadata-resolver.svg?branch=master)](https://travis-ci.org/artem713/html-metadata-resolver)
[![codecov](https://codecov.io/gh/artem713/html-metadata-resolver/branch/master/graph/badge.svg)](https://codecov.io/gh/artem713/html-metadata-resolver)

# html-metadata-resolver
A service for resolving meta tags attributes

```javascript
import {resolveMetadata} from 'html-metadata-resolver'

const html = `
    <!doctype html>
    <html>
      <head>
        <meta key="val">
        <meta val>
        <meta content='https://assets.somehost.com/resource.jpg' property='og:image'>
      </head>
    </html>
  `

console.log(resolveMetadata(html))
```

The result is: 

```javascript
[{
  key: 'val'
}, {
  val: ''
}, {
  content: 'https://assets.somehost.com/resource.jpg',
  property: 'og:image'
}]
```
