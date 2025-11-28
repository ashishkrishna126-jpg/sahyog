import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateEducationalContentData {
  educationalContent_insert: EducationalContent_Key;
}

export interface CreateEducationalContentVariables {
  categoryId?: UUIDString | null;
  content: string;
  imageUrl?: string | null;
  publishDate: DateString;
  title: string;
}

export interface EducationalContent_Key {
  id: UUIDString;
  __typename?: 'EducationalContent_Key';
}

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

export interface ListStoriesByTagVariables {
  tag: string;
}

export interface Podcast_Key {
  id: UUIDString;
  __typename?: 'Podcast_Key';
}

export interface Story_Key {
  id: UUIDString;
  __typename?: 'Story_Key';
}

export interface UpdatePodcastData {
  podcast_update?: Podcast_Key | null;
}

export interface UpdatePodcastVariables {
  id: UUIDString;
  description?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateEducationalContentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEducationalContentVariables): MutationRef<CreateEducationalContentData, CreateEducationalContentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateEducationalContentVariables): MutationRef<CreateEducationalContentData, CreateEducationalContentVariables>;
  operationName: string;
}
export const createEducationalContentRef: CreateEducationalContentRef;

export function createEducationalContent(vars: CreateEducationalContentVariables): MutationPromise<CreateEducationalContentData, CreateEducationalContentVariables>;
export function createEducationalContent(dc: DataConnect, vars: CreateEducationalContentVariables): MutationPromise<CreateEducationalContentData, CreateEducationalContentVariables>;

interface ListEducationalContentRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListEducationalContentData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListEducationalContentData, undefined>;
  operationName: string;
}
export const listEducationalContentRef: ListEducationalContentRef;

export function listEducationalContent(): QueryPromise<ListEducationalContentData, undefined>;
export function listEducationalContent(dc: DataConnect): QueryPromise<ListEducationalContentData, undefined>;

interface UpdatePodcastRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePodcastVariables): MutationRef<UpdatePodcastData, UpdatePodcastVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePodcastVariables): MutationRef<UpdatePodcastData, UpdatePodcastVariables>;
  operationName: string;
}
export const updatePodcastRef: UpdatePodcastRef;

export function updatePodcast(vars: UpdatePodcastVariables): MutationPromise<UpdatePodcastData, UpdatePodcastVariables>;
export function updatePodcast(dc: DataConnect, vars: UpdatePodcastVariables): MutationPromise<UpdatePodcastData, UpdatePodcastVariables>;

interface ListStoriesByTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListStoriesByTagVariables): QueryRef<ListStoriesByTagData, ListStoriesByTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListStoriesByTagVariables): QueryRef<ListStoriesByTagData, ListStoriesByTagVariables>;
  operationName: string;
}
export const listStoriesByTagRef: ListStoriesByTagRef;

export function listStoriesByTag(vars: ListStoriesByTagVariables): QueryPromise<ListStoriesByTagData, ListStoriesByTagVariables>;
export function listStoriesByTag(dc: DataConnect, vars: ListStoriesByTagVariables): QueryPromise<ListStoriesByTagData, ListStoriesByTagVariables>;

