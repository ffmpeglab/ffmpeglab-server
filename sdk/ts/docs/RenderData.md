
# RenderData


## Properties

Name | Type
------------ | -------------
`project` | [EditorProject](EditorProject.md)
`layers` | [Array&lt;EditorLayer&gt;](EditorLayer.md)

## Example

```typescript
import type { RenderData } from 'ffmpeglab-sdk'

// TODO: Update the object below with actual values
const example = {
  "project": null,
  "layers": null,
} satisfies RenderData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RenderData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


