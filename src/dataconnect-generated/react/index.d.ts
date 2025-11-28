import { CreateEducationalContentData, CreateEducationalContentVariables, ListEducationalContentData, UpdatePodcastData, UpdatePodcastVariables, ListStoriesByTagData, ListStoriesByTagVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateEducationalContent(options?: useDataConnectMutationOptions<CreateEducationalContentData, FirebaseError, CreateEducationalContentVariables>): UseDataConnectMutationResult<CreateEducationalContentData, CreateEducationalContentVariables>;
export function useCreateEducationalContent(dc: DataConnect, options?: useDataConnectMutationOptions<CreateEducationalContentData, FirebaseError, CreateEducationalContentVariables>): UseDataConnectMutationResult<CreateEducationalContentData, CreateEducationalContentVariables>;

export function useListEducationalContent(options?: useDataConnectQueryOptions<ListEducationalContentData>): UseDataConnectQueryResult<ListEducationalContentData, undefined>;
export function useListEducationalContent(dc: DataConnect, options?: useDataConnectQueryOptions<ListEducationalContentData>): UseDataConnectQueryResult<ListEducationalContentData, undefined>;

export function useUpdatePodcast(options?: useDataConnectMutationOptions<UpdatePodcastData, FirebaseError, UpdatePodcastVariables>): UseDataConnectMutationResult<UpdatePodcastData, UpdatePodcastVariables>;
export function useUpdatePodcast(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePodcastData, FirebaseError, UpdatePodcastVariables>): UseDataConnectMutationResult<UpdatePodcastData, UpdatePodcastVariables>;

export function useListStoriesByTag(vars: ListStoriesByTagVariables, options?: useDataConnectQueryOptions<ListStoriesByTagData>): UseDataConnectQueryResult<ListStoriesByTagData, ListStoriesByTagVariables>;
export function useListStoriesByTag(dc: DataConnect, vars: ListStoriesByTagVariables, options?: useDataConnectQueryOptions<ListStoriesByTagData>): UseDataConnectQueryResult<ListStoriesByTagData, ListStoriesByTagVariables>;
