
# EditorProjectConfiguration


## Properties

Name | Type
------------ | -------------
`length` | number
`width` | number
`height` | number
`lastUpdated` | number
`start` | number
`end` | number
`outputFilePath` | string
`compressionLevel` | number
`framerate` | number
`opacity` | number
`aspectRatio` | string
`preset` | string
`output` | string
`code` | string
`selectedCode` | string

## Example

```typescript
import type { EditorProjectConfiguration } from 'ffmpeglab-sdk'

// TODO: Update the object below with actual values
const example = {
  "length": null,
  "width": null,
  "height": null,
  "lastUpdated": null,
  "start": null,
  "end": null,
  "outputFilePath": null,
  "compressionLevel": null,
  "framerate": null,
  "opacity": null,
  "aspectRatio": null,
  "preset": null,
  "output": null,
  "code": null,
  "selectedCode": null,
} satisfies EditorProjectConfiguration

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EditorProjectConfiguration
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


