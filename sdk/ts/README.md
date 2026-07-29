## ffmpeglab-sdk

Welcome to ffmpeglab typescript sdk.


### Usage

Below code snippet shows exemplary usage of the configuration and the API based 
on the typical `FFmpegLab` example used for OpenAPI. 

```
import ffmpeglab from 'ffmpeglab-sdk'

// Covers all auth methods included in your OpenAPI yaml definition
const authConfig: your_api.AuthMethodsConfiguration = {
    "api_key": "YOUR_API_KEY"
}

// Implements a simple middleware to modify requests before (`pre`) they are sent
// and after (`post`) they have been received 
class Test implements your_api.Middleware {
    pre(context: your_api.RequestContext): Promise<your_api.RequestContext> {
        // Modify context here and return
        return Promise.resolve(context);
    }

    post(context: your_api.ResponseContext): Promise<your_api.ResponseContext> {
        return Promise.resolve(context);
    }

}

// Create configuration parameter object
const configurationParameters = {
    httpApi: new your_api.JQueryHttpLibrary(), // Can also be ignored - default is usually fine
    baseServer: your_api.servers[0], // First server is default
    authMethods: authConfig, // No auth is default
    promiseMiddleware: [new Test()],
}

// Convert to actual configuration
const config = your_api.createConfiguration(configurationParameters);


```
