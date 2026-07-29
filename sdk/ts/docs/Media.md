
# Media


## Properties

Name | Type
------------ | -------------
`id` | string
`uri` | string
`url` | string
`date` | number
`folderId` | string
`title` | string
`description` | string
`filename` | string
`fileType` | string
`userId` | string
`size` | number
`type` | string
`hasCloud` | boolean
`hasAudio` | boolean
`width` | number
`height` | number
`orderId` | number
`duration` | number
`isCopy` | string
`isVideo` | boolean
`isAudio` | boolean
`isTextFile` | string
`isReplace` | boolean

## Example

```typescript
import type { Media } from 'ffmpeglab-sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uri": null,
  "url": null,
  "date": null,
  "folderId": null,
  "title": null,
  "description": null,
  "filename": null,
  "fileType": null,
  "userId": null,
  "size": null,
  "type": null,
  "hasCloud": null,
  "hasAudio": null,
  "width": null,
  "height": null,
  "orderId": null,
  "duration": null,
  "isCopy": null,
  "isVideo": null,
  "isAudio": null,
  "isTextFile": null,
  "isReplace": null,
} satisfies Media

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Media
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


