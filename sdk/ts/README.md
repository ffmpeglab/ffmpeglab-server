## ffmpeglab-sdk

Welcome to ffmpeglab typescript sdk.


### Usage

This simple code allows you to render a small project 

```ts

import * as ffmpeglab from 'ffmpeglab-sdk'

const clientConfig = new ffmpeglab.Configuration({
    accessToken:"API_KEY", 
    basePath:"https://api.ffmpeglab.com"
})

const client = new ffmpeglab.RendersApi(clientConfig)

const project:ffmpeglab.EditorProject = {
  id: "myproject", 
  editor: {
    code: "-i $MEDIA_1 -movflags +faststart myproject.mp4",
    selectedCode: "custom"
  }
}
const media1:ffmpeglab.EncoderProject = {
  id:"media1",
  url:"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
}

const layer1:ffmpeglab.EditorLayer = {
  id:'layer1',
  editor:{muted:true, videoDisabled:false, isCommentLayer:false},
  media:[media1]
}

const renderDto:ffmpeglab.RenderDto = {
  project,
  layers:[layer1]
}

const newRender = await client.rendersControllerCreate({renderDto})

const renderId = newRender.id

await client.rendersControllerRunRender({runDto:{id:renderId}})

const render = await client.rendersControllerFindOne({id:renderId})


```


see [docs](https://api.ffmpeglab.com/api) for more