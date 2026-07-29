# RendersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**rendersControllerCreate**](RendersApi.md#renderscontrollercreate) | **POST** /renders |  |
| [**rendersControllerFindAll**](RendersApi.md#renderscontrollerfindall) | **GET** /renders |  |
| [**rendersControllerFindOne**](RendersApi.md#renderscontrollerfindone) | **GET** /renders/{id} |  |
| [**rendersControllerRunRender**](RendersApi.md#renderscontrollerrunrender) | **PUT** /renders/run |  |



## rendersControllerCreate

> RenderResponse rendersControllerCreate(renderDto)



### Example

```ts
import {
  Configuration,
  RendersApi,
} from 'ffmpeglab-sdk';
import type { RendersControllerCreateRequest } from 'ffmpeglab-sdk';

async function example() {
  console.log("🚀 Testing ffmpeglab-sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RendersApi(config);

  const body = {
    // RenderDto
    renderDto: ...,
  } satisfies RendersControllerCreateRequest;

  try {
    const data = await api.rendersControllerCreate(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **renderDto** | [RenderDto](RenderDto.md) |  | |

### Return type

[**RenderResponse**](RenderResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## rendersControllerFindAll

> Array&lt;RenderResponse&gt; rendersControllerFindAll()



### Example

```ts
import {
  Configuration,
  RendersApi,
} from 'ffmpeglab-sdk';
import type { RendersControllerFindAllRequest } from 'ffmpeglab-sdk';

async function example() {
  console.log("🚀 Testing ffmpeglab-sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RendersApi(config);

  try {
    const data = await api.rendersControllerFindAll();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;RenderResponse&gt;**](RenderResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## rendersControllerFindOne

> RenderResponse rendersControllerFindOne(id)



### Example

```ts
import {
  Configuration,
  RendersApi,
} from 'ffmpeglab-sdk';
import type { RendersControllerFindOneRequest } from 'ffmpeglab-sdk';

async function example() {
  console.log("🚀 Testing ffmpeglab-sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RendersApi(config);

  const body = {
    // string | The ID of the render
    id: id_example,
  } satisfies RendersControllerFindOneRequest;

  try {
    const data = await api.rendersControllerFindOne(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | The ID of the render | [Defaults to `undefined`] |

### Return type

[**RenderResponse**](RenderResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## rendersControllerRunRender

> rendersControllerRunRender(runDto)



### Example

```ts
import {
  Configuration,
  RendersApi,
} from 'ffmpeglab-sdk';
import type { RendersControllerRunRenderRequest } from 'ffmpeglab-sdk';

async function example() {
  console.log("🚀 Testing ffmpeglab-sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RendersApi(config);

  const body = {
    // RunDto
    runDto: ...,
  } satisfies RendersControllerRunRenderRequest;

  try {
    const data = await api.rendersControllerRunRender(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **runDto** | [RunDto](RunDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

