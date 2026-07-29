## ffmpeglab-sdk

Welcome to ffmpeglab typescript sdk.


### Usage

This simple code allows you to render a small project 

```ts
import * as ffmpeglab from 'ffmpeglab-sdk';

const clientConfig = new ffmpeglab.Configuration({
  accessToken: 'API_KEY',
  basePath: 'https://api.ffmpeglab.com',
});

const client = new ffmpeglab.RendersApi(clientConfig);

const render = await client.rendersControllerCreate({
  project: 'myproject',
  editor: {
    code: '-i $MEDIA_1 -movflags +faststart myproject.mp4',
    selectedCode: 'custom',
  },
  layers: [
    {
      id: 'layer1',
      media: [
        {
          id: 'media1',
          url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
        },
      ],
    },
  ],
});

await client.rendersControllerRunRender({runDto:{id:render.id}})
```


see [docs](https://api.ffmpeglab.com/api) for more