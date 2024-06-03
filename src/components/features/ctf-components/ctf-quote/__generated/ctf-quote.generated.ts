import * as Types from '../../../../../lib/__generated/graphql.types';

import { ComponentReferenceFields_ComponentCta_Fragment, ComponentReferenceFields_ComponentDuplex_Fragment, ComponentReferenceFields_ComponentHeroBanner_Fragment, ComponentReferenceFields_ComponentInfoBlock_Fragment, ComponentReferenceFields_ComponentProductTable_Fragment, ComponentReferenceFields_ComponentQuote_Fragment, ComponentReferenceFields_ComponentTextBlock_Fragment, ComponentReferenceFields_FooterMenu_Fragment, ComponentReferenceFields_MenuGroup_Fragment, ComponentReferenceFields_NavigationMenu_Fragment, ComponentReferenceFields_NtAudience_Fragment, ComponentReferenceFields_NtExperience_Fragment, ComponentReferenceFields_NtMergetag_Fragment, ComponentReferenceFields_Page_Fragment, ComponentReferenceFields_Seo_Fragment, ComponentReferenceFields_TopicBusinessInfo_Fragment, ComponentReferenceFields_TopicPerson_Fragment, ComponentReferenceFields_TopicProduct_Fragment, ComponentReferenceFields_TopicProductFeature_Fragment } from '../../../../../lib/shared-fragments/__generated/ctf-componentMap.generated';
import { AssetFieldsFragment } from '../../ctf-asset/__generated/ctf-asset.generated';
import { NtExperienceBasicFieldsFragment } from '../../../p13n/__generated/ctf-ninetailed-entities.generated';
import { ComponentReferenceFieldsFragmentDoc } from '../../../../../lib/shared-fragments/__generated/ctf-componentMap.generated';
import { AssetFieldsFragmentDoc } from '../../ctf-asset/__generated/ctf-asset.generated';
import { NtExperienceBasicFieldsFragmentDoc } from '../../../p13n/__generated/ctf-ninetailed-entities.generated';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@src/lib/fetchConfig';
export type QuoteFieldsFragment = { __typename: 'ComponentQuote', quoteAlignment?: boolean | null, imagePosition?: boolean | null, colorPalette?: string | null, sys: { __typename?: 'Sys', id: string }, quote?: { __typename?: 'ComponentQuoteQuote', json: any, links: { __typename?: 'ComponentQuoteQuoteLinks', entries: { __typename?: 'ComponentQuoteQuoteEntries', block: Array<(
          { __typename?: 'ComponentCta' }
          & ComponentReferenceFields_ComponentCta_Fragment
        ) | (
          { __typename?: 'ComponentDuplex' }
          & ComponentReferenceFields_ComponentDuplex_Fragment
        ) | (
          { __typename?: 'ComponentHeroBanner' }
          & ComponentReferenceFields_ComponentHeroBanner_Fragment
        ) | (
          { __typename?: 'ComponentInfoBlock' }
          & ComponentReferenceFields_ComponentInfoBlock_Fragment
        ) | (
          { __typename?: 'ComponentProductTable' }
          & ComponentReferenceFields_ComponentProductTable_Fragment
        ) | (
          { __typename?: 'ComponentQuote' }
          & ComponentReferenceFields_ComponentQuote_Fragment
        ) | (
          { __typename?: 'ComponentTextBlock' }
          & ComponentReferenceFields_ComponentTextBlock_Fragment
        ) | (
          { __typename?: 'FooterMenu' }
          & ComponentReferenceFields_FooterMenu_Fragment
        ) | (
          { __typename?: 'MenuGroup' }
          & ComponentReferenceFields_MenuGroup_Fragment
        ) | (
          { __typename?: 'NavigationMenu' }
          & ComponentReferenceFields_NavigationMenu_Fragment
        ) | (
          { __typename?: 'NtAudience' }
          & ComponentReferenceFields_NtAudience_Fragment
        ) | (
          { __typename?: 'NtExperience' }
          & ComponentReferenceFields_NtExperience_Fragment
        ) | (
          { __typename?: 'NtMergetag' }
          & ComponentReferenceFields_NtMergetag_Fragment
        ) | (
          { __typename?: 'Page' }
          & ComponentReferenceFields_Page_Fragment
        ) | (
          { __typename?: 'Seo' }
          & ComponentReferenceFields_Seo_Fragment
        ) | (
          { __typename?: 'TopicBusinessInfo' }
          & ComponentReferenceFields_TopicBusinessInfo_Fragment
        ) | (
          { __typename?: 'TopicPerson' }
          & ComponentReferenceFields_TopicPerson_Fragment
        ) | (
          { __typename?: 'TopicProduct' }
          & ComponentReferenceFields_TopicProduct_Fragment
        ) | (
          { __typename?: 'TopicProductFeature' }
          & ComponentReferenceFields_TopicProductFeature_Fragment
        ) | null> }, assets: { __typename?: 'ComponentQuoteQuoteAssets', block: Array<(
          { __typename?: 'Asset' }
          & AssetFieldsFragment
        ) | null> } } } | null, image?: (
    { __typename?: 'Asset' }
    & AssetFieldsFragment
  ) | null };

export type QuoteFieldsWithP13nFragment = (
  { __typename?: 'ComponentQuote', ntExperiencesCollection?: { __typename?: 'ComponentQuoteNt_experiencesCollection', items: Array<(
      { __typename?: 'NtExperience', ntVariantsCollection?: { __typename?: 'NtExperienceNt_variantsCollection', items: Array<{ __typename?: 'ComponentCta' } | { __typename?: 'ComponentDuplex' } | { __typename?: 'ComponentHeroBanner' } | { __typename?: 'ComponentInfoBlock' } | { __typename?: 'ComponentProductTable' } | (
          { __typename?: 'ComponentQuote' }
          & QuoteFieldsFragment
        ) | { __typename?: 'ComponentTextBlock' } | { __typename?: 'FooterMenu' } | { __typename?: 'MenuGroup' } | { __typename?: 'NavigationMenu' } | { __typename?: 'NtAudience' } | { __typename?: 'NtExperience' } | { __typename?: 'NtMergetag' } | { __typename?: 'Page' } | { __typename?: 'Seo' } | { __typename?: 'TopicBusinessInfo' } | { __typename?: 'TopicPerson' } | { __typename?: 'TopicProduct' } | { __typename?: 'TopicProductFeature' } | null> } | null }
      & NtExperienceBasicFieldsFragment
    ) | null> } | null }
  & QuoteFieldsFragment
);

export type CtfQuoteQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  locale?: Types.InputMaybe<Types.Scalars['String']>;
  preview?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CtfQuoteQuery = { __typename?: 'Query', componentQuote?: (
    { __typename?: 'ComponentQuote' }
    & QuoteFieldsWithP13nFragment
  ) | null };

export const QuoteFieldsFragmentDoc = `
    fragment QuoteFields on ComponentQuote {
  __typename
  sys {
    id
  }
  quote {
    json
    links {
      entries {
        block {
          ...ComponentReferenceFields
        }
      }
      assets {
        block {
          ...AssetFields
        }
      }
    }
  }
  quoteAlignment
  image {
    ...AssetFields
  }
  imagePosition
  colorPalette
}
    `;
export const QuoteFieldsWithP13nFragmentDoc = `
    fragment QuoteFieldsWithP13n on ComponentQuote {
  ...QuoteFields
  ntExperiencesCollection(limit: 10) {
    items {
      ... on NtExperience {
        ...NtExperienceBasicFields
        ntVariantsCollection(limit: 10) {
          items {
            ... on ComponentQuote {
              ...QuoteFields
            }
          }
        }
      }
    }
  }
}
    `;
export const CtfQuoteDocument = `
    query CtfQuote($id: String!, $locale: String, $preview: Boolean) {
  componentQuote(id: $id, locale: $locale, preview: $preview) {
    ...QuoteFieldsWithP13n
  }
}
    ${QuoteFieldsWithP13nFragmentDoc}
${QuoteFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
${AssetFieldsFragmentDoc}
${NtExperienceBasicFieldsFragmentDoc}`;
export const useCtfQuoteQuery = <
      TData = CtfQuoteQuery,
      TError = unknown
    >(
      variables: CtfQuoteQueryVariables,
      options?: UseQueryOptions<CtfQuoteQuery, TError, TData>
    ) =>
    useQuery<CtfQuoteQuery, TError, TData>(
      ['CtfQuote', variables],
      customFetcher<CtfQuoteQuery, CtfQuoteQueryVariables>(CtfQuoteDocument, variables),
      options
    );

useCtfQuoteQuery.getKey = (variables: CtfQuoteQueryVariables) => ['CtfQuote', variables];
;

useCtfQuoteQuery.fetcher = (variables: CtfQuoteQueryVariables, options?: RequestInit['headers']) => customFetcher<CtfQuoteQuery, CtfQuoteQueryVariables>(CtfQuoteDocument, variables, options);