import { QueryClient } from '@tanstack/react-query';

import {
  CtfNinetailedPreviewDataQueryVariables,
  useCtfNinetailedPreviewDataQuery,
} from './__generated/ctf-ninetailed-entities.generated';
import P13nProvider from './ninetailed';
import { mapGraphQLNinetailedExperiences } from './util';

export { P13nProvider, mapGraphQLNinetailedExperiences };

export const maybePrefetchP13nPreviewData = async (
  queryClient: QueryClient,
  variables: CtfNinetailedPreviewDataQueryVariables,
) => {
  if (!variables.preview) {
    return; // No reason to prefetch data for Ninetailed preview plugin.
  }
  await queryClient.prefetchQuery(
    useCtfNinetailedPreviewDataQuery.getKey(variables),
    useCtfNinetailedPreviewDataQuery.fetcher(variables),
  );
};
