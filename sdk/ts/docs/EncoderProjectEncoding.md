
# EncoderProjectEncoding


## Properties

Name | Type
------------ | -------------
`outputFilePath` | string
`compressionLevel` | number
`width` | number
`height` | number
`crf` | number
`preset` | string
`output` | string
`code` | Array&lt;string&gt;
`lastUpdated` | number
`start` | number
`end` | number
`soundVolume` | number
`opacity` | number
`reverse` | boolean
`speed` | number
`transitionIn` | string
`transitionOut` | string
`transitionInDuration` | number
`transitionOutDuration` | number
`pan` | [PositionParams](PositionParams.md)
`crop` | [PositionParams](PositionParams.md)
`resize` | [Resize](Resize.md)
`color` | [RGB](RGB.md)
`scale` | number

## Example

```typescript
import type { EncoderProjectEncoding } from 'ffmpeglab-sdk'

// TODO: Update the object below with actual values
const example = {
  "outputFilePath": null,
  "compressionLevel": null,
  "width": null,
  "height": null,
  "crf": null,
  "preset": null,
  "output": null,
  "code": null,
  "lastUpdated": null,
  "start": null,
  "end": null,
  "soundVolume": null,
  "opacity": null,
  "reverse": null,
  "speed": null,
  "transitionIn": null,
  "transitionOut": null,
  "transitionInDuration": null,
  "transitionOutDuration": null,
  "pan": null,
  "crop": null,
  "resize": null,
  "color": null,
  "scale": null,
} satisfies EncoderProjectEncoding

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EncoderProjectEncoding
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


