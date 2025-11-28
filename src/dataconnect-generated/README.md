# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListEducationalContent*](#listeducationalcontent)
  - [*ListStoriesByTag*](#liststoriesbytag)
- [**Mutations**](#mutations)
  - [*CreateEducationalContent*](#createeducationalcontent)
  - [*UpdatePodcast*](#updatepodcast)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListEducationalContent
You can execute the `ListEducationalContent` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listEducationalContent(): QueryPromise<ListEducationalContentData, undefined>;

interface ListEducationalContentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListEducationalContentData, undefined>;
}
export const listEducationalContentRef: ListEducationalContentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listEducationalContent(dc: DataConnect): QueryPromise<ListEducationalContentData, undefined>;

interface ListEducationalContentRef {
  ...
  (dc: DataConnect): QueryRef<ListEducationalContentData, undefined>;
}
export const listEducationalContentRef: ListEducationalContentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listEducationalContentRef:
```typescript
const name = listEducationalContentRef.operationName;
console.log(name);
```

### Variables
The `ListEducationalContent` query has no variables.
### Return Type
Recall that executing the `ListEducationalContent` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListEducationalContentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListEducationalContentData {
  educationalContents: ({
    id: UUIDString;
    title: string;
    content: string;
    imageUrl?: string | null;
    publishDate: DateString;
    category?: {
      id: UUIDString;
      name: string;
    } & Category_Key;
  } & EducationalContent_Key)[];
}
```
### Using `ListEducationalContent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listEducationalContent } from '@dataconnect/generated';


// Call the `listEducationalContent()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listEducationalContent();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listEducationalContent(dataConnect);

console.log(data.educationalContents);

// Or, you can use the `Promise` API.
listEducationalContent().then((response) => {
  const data = response.data;
  console.log(data.educationalContents);
});
```

### Using `ListEducationalContent`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listEducationalContentRef } from '@dataconnect/generated';


// Call the `listEducationalContentRef()` function to get a reference to the query.
const ref = listEducationalContentRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listEducationalContentRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.educationalContents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.educationalContents);
});
```

## ListStoriesByTag
You can execute the `ListStoriesByTag` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listStoriesByTag(vars: ListStoriesByTagVariables): QueryPromise<ListStoriesByTagData, ListStoriesByTagVariables>;

interface ListStoriesByTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListStoriesByTagVariables): QueryRef<ListStoriesByTagData, ListStoriesByTagVariables>;
}
export const listStoriesByTagRef: ListStoriesByTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listStoriesByTag(dc: DataConnect, vars: ListStoriesByTagVariables): QueryPromise<ListStoriesByTagData, ListStoriesByTagVariables>;

interface ListStoriesByTagRef {
  ...
  (dc: DataConnect, vars: ListStoriesByTagVariables): QueryRef<ListStoriesByTagData, ListStoriesByTagVariables>;
}
export const listStoriesByTagRef: ListStoriesByTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStoriesByTagRef:
```typescript
const name = listStoriesByTagRef.operationName;
console.log(name);
```

### Variables
The `ListStoriesByTag` query requires an argument of type `ListStoriesByTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListStoriesByTagVariables {
  tag: string;
}
```
### Return Type
Recall that executing the `ListStoriesByTag` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStoriesByTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListStoriesByTagData {
  stories: ({
    id: UUIDString;
    title: string;
    content: string;
    authorName: string;
    publishDate: DateString;
    tags?: string[] | null;
  } & Story_Key)[];
}
```
### Using `ListStoriesByTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listStoriesByTag, ListStoriesByTagVariables } from '@dataconnect/generated';

// The `ListStoriesByTag` query requires an argument of type `ListStoriesByTagVariables`:
const listStoriesByTagVars: ListStoriesByTagVariables = {
  tag: ..., 
};

// Call the `listStoriesByTag()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listStoriesByTag(listStoriesByTagVars);
// Variables can be defined inline as well.
const { data } = await listStoriesByTag({ tag: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listStoriesByTag(dataConnect, listStoriesByTagVars);

console.log(data.stories);

// Or, you can use the `Promise` API.
listStoriesByTag(listStoriesByTagVars).then((response) => {
  const data = response.data;
  console.log(data.stories);
});
```

### Using `ListStoriesByTag`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStoriesByTagRef, ListStoriesByTagVariables } from '@dataconnect/generated';

// The `ListStoriesByTag` query requires an argument of type `ListStoriesByTagVariables`:
const listStoriesByTagVars: ListStoriesByTagVariables = {
  tag: ..., 
};

// Call the `listStoriesByTagRef()` function to get a reference to the query.
const ref = listStoriesByTagRef(listStoriesByTagVars);
// Variables can be defined inline as well.
const ref = listStoriesByTagRef({ tag: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStoriesByTagRef(dataConnect, listStoriesByTagVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.stories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.stories);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateEducationalContent
You can execute the `CreateEducationalContent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEducationalContent(vars: CreateEducationalContentVariables): MutationPromise<CreateEducationalContentData, CreateEducationalContentVariables>;

interface CreateEducationalContentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEducationalContentVariables): MutationRef<CreateEducationalContentData, CreateEducationalContentVariables>;
}
export const createEducationalContentRef: CreateEducationalContentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEducationalContent(dc: DataConnect, vars: CreateEducationalContentVariables): MutationPromise<CreateEducationalContentData, CreateEducationalContentVariables>;

interface CreateEducationalContentRef {
  ...
  (dc: DataConnect, vars: CreateEducationalContentVariables): MutationRef<CreateEducationalContentData, CreateEducationalContentVariables>;
}
export const createEducationalContentRef: CreateEducationalContentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEducationalContentRef:
```typescript
const name = createEducationalContentRef.operationName;
console.log(name);
```

### Variables
The `CreateEducationalContent` mutation requires an argument of type `CreateEducationalContentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateEducationalContentVariables {
  categoryId?: UUIDString | null;
  content: string;
  imageUrl?: string | null;
  publishDate: DateString;
  title: string;
}
```
### Return Type
Recall that executing the `CreateEducationalContent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEducationalContentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEducationalContentData {
  educationalContent_insert: EducationalContent_Key;
}
```
### Using `CreateEducationalContent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEducationalContent, CreateEducationalContentVariables } from '@dataconnect/generated';

// The `CreateEducationalContent` mutation requires an argument of type `CreateEducationalContentVariables`:
const createEducationalContentVars: CreateEducationalContentVariables = {
  categoryId: ..., // optional
  content: ..., 
  imageUrl: ..., // optional
  publishDate: ..., 
  title: ..., 
};

// Call the `createEducationalContent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEducationalContent(createEducationalContentVars);
// Variables can be defined inline as well.
const { data } = await createEducationalContent({ categoryId: ..., content: ..., imageUrl: ..., publishDate: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEducationalContent(dataConnect, createEducationalContentVars);

console.log(data.educationalContent_insert);

// Or, you can use the `Promise` API.
createEducationalContent(createEducationalContentVars).then((response) => {
  const data = response.data;
  console.log(data.educationalContent_insert);
});
```

### Using `CreateEducationalContent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEducationalContentRef, CreateEducationalContentVariables } from '@dataconnect/generated';

// The `CreateEducationalContent` mutation requires an argument of type `CreateEducationalContentVariables`:
const createEducationalContentVars: CreateEducationalContentVariables = {
  categoryId: ..., // optional
  content: ..., 
  imageUrl: ..., // optional
  publishDate: ..., 
  title: ..., 
};

// Call the `createEducationalContentRef()` function to get a reference to the mutation.
const ref = createEducationalContentRef(createEducationalContentVars);
// Variables can be defined inline as well.
const ref = createEducationalContentRef({ categoryId: ..., content: ..., imageUrl: ..., publishDate: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEducationalContentRef(dataConnect, createEducationalContentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.educationalContent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.educationalContent_insert);
});
```

## UpdatePodcast
You can execute the `UpdatePodcast` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePodcast(vars: UpdatePodcastVariables): MutationPromise<UpdatePodcastData, UpdatePodcastVariables>;

interface UpdatePodcastRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePodcastVariables): MutationRef<UpdatePodcastData, UpdatePodcastVariables>;
}
export const updatePodcastRef: UpdatePodcastRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePodcast(dc: DataConnect, vars: UpdatePodcastVariables): MutationPromise<UpdatePodcastData, UpdatePodcastVariables>;

interface UpdatePodcastRef {
  ...
  (dc: DataConnect, vars: UpdatePodcastVariables): MutationRef<UpdatePodcastData, UpdatePodcastVariables>;
}
export const updatePodcastRef: UpdatePodcastRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePodcastRef:
```typescript
const name = updatePodcastRef.operationName;
console.log(name);
```

### Variables
The `UpdatePodcast` mutation requires an argument of type `UpdatePodcastVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePodcastVariables {
  id: UUIDString;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdatePodcast` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePodcastData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePodcastData {
  podcast_update?: Podcast_Key | null;
}
```
### Using `UpdatePodcast`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePodcast, UpdatePodcastVariables } from '@dataconnect/generated';

// The `UpdatePodcast` mutation requires an argument of type `UpdatePodcastVariables`:
const updatePodcastVars: UpdatePodcastVariables = {
  id: ..., 
  description: ..., // optional
};

// Call the `updatePodcast()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePodcast(updatePodcastVars);
// Variables can be defined inline as well.
const { data } = await updatePodcast({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePodcast(dataConnect, updatePodcastVars);

console.log(data.podcast_update);

// Or, you can use the `Promise` API.
updatePodcast(updatePodcastVars).then((response) => {
  const data = response.data;
  console.log(data.podcast_update);
});
```

### Using `UpdatePodcast`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePodcastRef, UpdatePodcastVariables } from '@dataconnect/generated';

// The `UpdatePodcast` mutation requires an argument of type `UpdatePodcastVariables`:
const updatePodcastVars: UpdatePodcastVariables = {
  id: ..., 
  description: ..., // optional
};

// Call the `updatePodcastRef()` function to get a reference to the mutation.
const ref = updatePodcastRef(updatePodcastVars);
// Variables can be defined inline as well.
const ref = updatePodcastRef({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePodcastRef(dataConnect, updatePodcastVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.podcast_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.podcast_update);
});
```

