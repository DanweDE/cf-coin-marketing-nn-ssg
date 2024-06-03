import * as Types from '../../__generated/graphql.types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@src/lib/fetchConfig';
export type CtfPagesQueryVariables = Types.Exact<{
  locale?: Types.InputMaybe<Types.Scalars['String']>;
  preview?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CtfPagesQuery = { __typename?: 'Query', pageCollection?: { __typename?: 'PageCollection', items: Array<{ __typename?: 'Page', slug?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };


export const CtfPagesDocument = `
    query CtfPages($locale: String, $preview: Boolean) {
  pageCollection(preview: $preview, locale: $locale) {
    items {
      sys {
        id
      }
      slug
    }
  }
}
    `;
export const useCtfPagesQuery = <
      TData = CtfPagesQuery,
      TError = unknown
    >(
      variables?: CtfPagesQueryVariables,
      options?: UseQueryOptions<CtfPagesQuery, TError, TData>
    ) =>
    useQuery<CtfPagesQuery, TError, TData>(
      variables === undefined ? ['CtfPages'] : ['CtfPages', variables],
      customFetcher<CtfPagesQuery, CtfPagesQueryVariables>(CtfPagesDocument, variables),
      options
    );

useCtfPagesQuery.getKey = (variables?: CtfPagesQueryVariables) => variables === undefined ? ['CtfPages'] : ['CtfPages', variables];
;

useCtfPagesQuery.fetcher = (variables?: CtfPagesQueryVariables, options?: RequestInit['headers']) => customFetcher<CtfPagesQuery, CtfPagesQueryVariables>(CtfPagesDocument, variables, options);