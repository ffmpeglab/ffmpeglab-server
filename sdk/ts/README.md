## ffmpeglab-sdk

Welcome to ffmpeglab typescript sdk.


### Usage

This simple code allows you to render a small project 

```
import * as ffmpeglab from 'ffmpeglab-sdk'

const clientConfig = new ffmpeglab.Configuration({
    accessToken:"API_KEY", 
    basePath:"https://api.ffmpeglab.com"
})

const client = new ffmpeglab.RendersApi(clientConfig)

const renderDto = renderData as ffmpeglab.RenderDto

const newRender = await client.rendersControllerCreate({renderDto})

await client.rendersControllerRunRender({runDto:{id:newRender.id}})

```


see [docs](https://api.ffmpeglab.com/api) for more