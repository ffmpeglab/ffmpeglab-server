## ffmpeglab-sdk

Welcome to ffmpeglab typescript sdk.


### Usage

This simple code allows you to render a small project 

```ts
import * as ffmpeglab from 'ffmpeglab-sdk';

const mediaUrl = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'
const clientConfig = new ffmpeglab.Configuration({
  accessToken: 'API_KEY',
  basePath: 'https://api.ffmpeglab.com',
});

const client = new ffmpeglab.RendersApi(clientConfig);

client.rendersControllerCreate({renderDto:{
  project: { 
      id: 'myproject',
      title: 'myproject',
      editor: {
        code: '-i $MEDIA_1 -movflags +faststart -y $OUTPUT_PATH',
        selectedCode: 'custom'
      }
  },
  layers: [
    {
      id: 'layer1',
      media: [
        {
          id: 'media1',
          url: mediaUrl,
          folderId: "myfolder",
          filename: "zoompan.mp4",
          encoding: {}
        }
      ],
      "editor":{}
    }
  ]
}})
.then((render)=>client.rendersControllerRunRender({
  runDto:{
    id:render.id
  }
}))
```


see [docs](https://github.com/ffmpeglab/server/blob/main/sdk/ts/docs/RendersApi.md) for more