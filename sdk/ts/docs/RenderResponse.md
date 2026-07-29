
# RenderResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`title` | string
`project` | string
`status` | string
`_public` | boolean
`userId` | string
`progress` | number
`logs` | string
`data` | [RenderData](RenderData.md)
`result` | [Media](Media.md)

## Example

```typescript
import type { RenderResponse } from 'ffmpeglab-sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "title": null,
  "project": null,
  "status": null,
  "_public": null,
  "userId": null,
  "progress": null,
  "logs": null,
  "data": null,
  "result": null,
} satisfies RenderResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RenderResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


