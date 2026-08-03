import * as ffmpeglab from 'ffmpeglab-sdk';

const mediaUrl = 'https://www.ffmpeglab.com/media/zoompan.mp4'
const clientConfig = new ffmpeglab.Configuration({
  accessToken: 'API_KEY',
  basePath: 'https://api.ffmpeglab.com',
});

const client = new ffmpeglab.RendersApi(clientConfig);

client.rendersControllerCreate({renderDto:{
  project: { 
      id:'myproject',
      editor: {
        code: '-i $MEDIA_1 -movflags +faststart myproject.mp4',
        selectedCode: 'custom'
      }
  },
  layers: [
    {
      id: 'layer1',
      media: [
        {
          id: 'media1',
          url: mediaUrl
        }
      ]
    }
  ]
}})
.then((render)=>client.rendersControllerRunRender({
  runDto:{
    id:render.id
  }
}))
          