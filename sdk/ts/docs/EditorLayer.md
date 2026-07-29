
# EditorLayer


## Properties

Name | Type
------------ | -------------
`id` | string
`userId` | string
`title` | string
`date` | number
`folderId` | string
`orderId` | number
`isEditorLayer` | boolean
`editor` | [EditorLayerParams](EditorLayerParams.md)
`media` | [Array&lt;EncoderProject&gt;](EncoderProject.md)

## Example

```typescript
import type { EditorLayer } from 'ffmpeglab-sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "title": null,
  "date": null,
  "folderId": null,
  "orderId": null,
  "isEditorLayer": null,
  "editor": null,
  "media": null,
} satisfies EditorLayer

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EditorLayer
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


