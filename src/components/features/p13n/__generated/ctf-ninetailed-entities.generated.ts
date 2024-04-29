import * as Types from '../../../../lib/__generated/graphql.types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@src/lib/fetchConfig';
export type NtExperienceBasicFieldsFragment = { __typename: 'NtExperience', ntName?: string | null, ntDescription?: string | null, ntType?: string | null, ntConfig?: any | null, sys: { __typename?: 'Sys', id: string }, ntAudience?: { __typename?: 'NtAudience', ntAudienceId?: string | null, ntName?: string | null } | null };

export type NtExperienceFieldsFragment = (
  { __typename?: 'NtExperience', ntVariantsCollection?: { __typename?: 'NtExperienceNt_variantsCollection', items: Array<{ __typename: 'ComponentCta', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ComponentDuplex', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ComponentHeroBanner', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ComponentInfoBlock', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ComponentProductTable', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ComponentQuote', sys: { __typename?: 'Sys', id: string } } | { __typename: 'ComponentTextBlock', sys: { __typename?: 'Sys', id: string } } | { __typename: 'FooterMenu', sys: { __typename?: 'Sys', id: string } } | { __typename: 'MenuGroup', sys: { __typename?: 'Sys', id: string } } | { __typename: 'NavigationMenu', sys: { __typename?: 'Sys', id: string } } | { __typename: 'NtAudience', sys: { __typename?: 'Sys', id: string } } | { __typename: 'NtExperience', sys: { __typename?: 'Sys', id: string } } | { __typename: 'NtMergetag', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Page', sys: { __typename?: 'Sys', id: string } } | { __typename: 'Seo', sys: { __typename?: 'Sys', id: string } } | { __typename: 'TopicBusinessInfo', sys: { __typename?: 'Sys', id: string } } | { __typename: 'TopicPerson', sys: { __typename?: 'Sys', id: string } } | { __typename: 'TopicProduct', sys: { __typename?: 'Sys', id: string } } | { __typename: 'TopicProductFeature', sys: { __typename?: 'Sys', id: string } } | null> } | null }
  & NtExperienceBasicFieldsFragment
);

export type NtAudienceFieldsFragment = { __typename: 'NtAudience', ntName?: string | null, ntDescription?: string | null, ntAudienceId?: string | null, sys: { __typename?: 'Sys', id: string } };

export type CtfNinetailedPreviewDataQueryVariables = Types.Exact<{
  locale?: Types.InputMaybe<Types.Scalars['String']>;
  preview?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CtfNinetailedPreviewDataQuery = { __typename?: 'Query', ntExperienceCollection?: { __typename?: 'NtExperienceCollection', items: Array<(
      { __typename?: 'NtExperience' }
      & NtExperienceFieldsFragment
    ) | null> } | null, ntAudienceCollection?: { __typename?: 'NtAudienceCollection', items: Array<(
      { __typename?: 'NtAudience' }
      & NtAudienceFieldsFragment
    ) | null> } | null };

export const NtExperienceBasicFieldsFragmentDoc = `
    fragment NtExperienceBasicFields on NtExperience {
  __typename
  sys {
    id
  }
  ntName
  ntDescription
  ntType
  ntConfig
  ntAudience {
    ntAudienceId
    ntName
  }
}
    `;
export const NtExperienceFieldsFragmentDoc = `
    fragment NtExperienceFields on NtExperience {
  ...NtExperienceBasicFields
  ntVariantsCollection {
    items {
      __typename
      sys {
        id
      }
    }
  }
}
    `;
export const NtAudienceFieldsFragmentDoc = `
    fragment NtAudienceFields on NtAudience {
  __typename
  sys {
    id
  }
  ntName
  ntDescription
  ntAudienceId
}
    `;
export const CtfNinetailedPreviewDataDocument = `
    query CtfNinetailedPreviewData($locale: String, $preview: Boolean) {
  ntExperienceCollection(locale: $locale, preview: $preview) {
    items {
      ...NtExperienceFields
    }
  }
  ntAudienceCollection(locale: $locale, preview: $preview) {
    items {
      ...NtAudienceFields
    }
  }
}
    ${NtExperienceFieldsFragmentDoc}
${NtExperienceBasicFieldsFragmentDoc}
${NtAudienceFieldsFragmentDoc}`;
export const useCtfNinetailedPreviewDataQuery = <
      TData = CtfNinetailedPreviewDataQuery,
      TError = unknown
    >(
      variables?: CtfNinetailedPreviewDataQueryVariables,
      options?: UseQueryOptions<CtfNinetailedPreviewDataQuery, TError, TData>
    ) =>
    useQuery<CtfNinetailedPreviewDataQuery, TError, TData>(
      variables === undefined ? ['CtfNinetailedPreviewData'] : ['CtfNinetailedPreviewData', variables],
      customFetcher<CtfNinetailedPreviewDataQuery, CtfNinetailedPreviewDataQueryVariables>(CtfNinetailedPreviewDataDocument, variables),
      options
    );

useCtfNinetailedPreviewDataQuery.getKey = (variables?: CtfNinetailedPreviewDataQueryVariables) => variables === undefined ? ['CtfNinetailedPreviewData'] : ['CtfNinetailedPreviewData', variables];
;

useCtfNinetailedPreviewDataQuery.fetcher = (variables?: CtfNinetailedPreviewDataQueryVariables, options?: RequestInit['headers']) => customFetcher<CtfNinetailedPreviewDataQuery, CtfNinetailedPreviewDataQueryVariables>(CtfNinetailedPreviewDataDocument, variables, options);