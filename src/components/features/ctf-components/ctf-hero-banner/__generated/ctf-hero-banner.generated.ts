import * as Types from '../../../../../lib/__generated/graphql.types';

import { PageLinkFieldsFragment } from '../../../page-link/__generated/page-link.generated';
import { AssetFieldsFragment } from '../../ctf-asset/__generated/ctf-asset.generated';
import { NtExperienceBasicFieldsFragment } from '../../../p13n/__generated/ctf-ninetailed-entities.generated';
import { PageLinkFieldsFragmentDoc } from '../../../page-link/__generated/page-link.generated';
import { AssetFieldsFragmentDoc } from '../../ctf-asset/__generated/ctf-asset.generated';
import { NtExperienceBasicFieldsFragmentDoc } from '../../../p13n/__generated/ctf-ninetailed-entities.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@src/lib/fetchConfig';
export type HeroBannerFieldsFragment = { __typename: 'ComponentHeroBanner', headline?: string | null, ctaText?: string | null, imageStyle?: boolean | null, heroSize?: boolean | null, colorPalette?: string | null, sys: { __typename?: 'Sys', id: string }, bodyText?: { __typename?: 'ComponentHeroBannerBodyText', json: any } | null, targetPage?: (
    { __typename?: 'Page' }
    & PageLinkFieldsFragment
  ) | null, image?: (
    { __typename?: 'Asset' }
    & AssetFieldsFragment
  ) | null };

export type HeroBannerFieldsWithP13nFragment = (
  { __typename?: 'ComponentHeroBanner', ntExperiencesCollection?: { __typename?: 'ComponentHeroBannerNt_experiencesCollection', items: Array<(
      { __typename?: 'NtExperience', ntVariantsCollection?: { __typename?: 'NtExperienceNt_variantsCollection', items: Array<{ __typename?: 'ComponentCta' } | { __typename?: 'ComponentDuplex' } | (
          { __typename?: 'ComponentHeroBanner' }
          & HeroBannerFieldsFragment
        ) | { __typename?: 'ComponentInfoBlock' } | { __typename?: 'ComponentProductTable' } | { __typename?: 'ComponentQuote' } | { __typename?: 'ComponentTextBlock' } | { __typename?: 'FooterMenu' } | { __typename?: 'MenuGroup' } | { __typename?: 'NavigationMenu' } | { __typename?: 'NtAudience' } | { __typename?: 'NtExperience' } | { __typename?: 'NtMergetag' } | { __typename?: 'Page' } | { __typename?: 'Seo' } | { __typename?: 'TopicBusinessInfo' } | { __typename?: 'TopicPerson' } | { __typename?: 'TopicProduct' } | { __typename?: 'TopicProductFeature' } | null> } | null }
      & NtExperienceBasicFieldsFragment
    ) | null> } | null }
  & HeroBannerFieldsFragment
);

export type CtfHeroBannerQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  locale?: Types.InputMaybe<Types.Scalars['String']>;
  preview?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CtfHeroBannerQuery = { __typename?: 'Query', componentHeroBanner?: (
    { __typename?: 'ComponentHeroBanner' }
    & HeroBannerFieldsWithP13nFragment
  ) | null };

export const HeroBannerFieldsFragmentDoc = `
    fragment HeroBannerFields on ComponentHeroBanner {
  __typename
  sys {
    id
  }
  headline
  bodyText {
    json
  }
  ctaText
  targetPage {
    ...PageLinkFields
  }
  image {
    ...AssetFields
  }
  imageStyle
  heroSize
  colorPalette
}
    `;
export const HeroBannerFieldsWithP13nFragmentDoc = `
    fragment HeroBannerFieldsWithP13n on ComponentHeroBanner {
  ...HeroBannerFields
  ntExperiencesCollection(limit: 10) {
    items {
      ... on NtExperience {
        ...NtExperienceBasicFields
        ntVariantsCollection(limit: 10) {
          items {
            ... on ComponentHeroBanner {
              ...HeroBannerFields
            }
          }
        }
      }
    }
  }
}
    `;
export const CtfHeroBannerDocument = `
    query CtfHeroBanner($id: String!, $locale: String, $preview: Boolean) {
  componentHeroBanner(id: $id, locale: $locale, preview: $preview) {
    ...HeroBannerFieldsWithP13n
  }
}
    ${HeroBannerFieldsWithP13nFragmentDoc}
${HeroBannerFieldsFragmentDoc}
${PageLinkFieldsFragmentDoc}
${AssetFieldsFragmentDoc}
${NtExperienceBasicFieldsFragmentDoc}`;
export const useCtfHeroBannerQuery = <
      TData = CtfHeroBannerQuery,
      TError = unknown
    >(
      variables: CtfHeroBannerQueryVariables,
      options?: UseQueryOptions<CtfHeroBannerQuery, TError, TData>
    ) =>
    useQuery<CtfHeroBannerQuery, TError, TData>(
      ['CtfHeroBanner', variables],
      customFetcher<CtfHeroBannerQuery, CtfHeroBannerQueryVariables>(CtfHeroBannerDocument, variables),
      options
    );

useCtfHeroBannerQuery.getKey = (variables: CtfHeroBannerQueryVariables) => ['CtfHeroBanner', variables];
;

useCtfHeroBannerQuery.fetcher = (variables: CtfHeroBannerQueryVariables, options?: RequestInit['headers']) => customFetcher<CtfHeroBannerQuery, CtfHeroBannerQueryVariables>(CtfHeroBannerDocument, variables, options);