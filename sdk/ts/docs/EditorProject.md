
# EditorProject


## Properties

Name | Type
------------ | -------------
`id` | string
`userId` | string
`title` | string
`date` | number
`folderId` | string
`orderId` | number
`editor` | [EditorProjectConfiguration](EditorProjectConfiguration.md)

## Example

```typescript
import type { EditorProject } from 'ffmpeglab-sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "title": null,
  "date": null,
  "folderId": null,
  "orderId": null,
  "editor": null,
} satisfies EditorProject

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EditorProject
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


