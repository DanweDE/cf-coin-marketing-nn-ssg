import contentfulConfig from 'contentful.config';
import { NinetailedProvider } from '@ninetailed/experience.js-next';
import { NinetailedPreviewPlugin } from '@ninetailed/experience.js-plugin-preview';
import { useContentfulContext } from '@src/contentful-context';
import { ContentfulLivePreview } from '@contentful/live-preview';
import {
  NtExperienceFieldsFragment,
  NtAudienceFieldsFragment,
  CtfNinetailedDataQuery,
  useCtfNinetailedDataQuery,
} from './__generated/ctf-ninetailed-entities.generated';
import { Experience, ExperienceMapper } from '@ninetailed/experience.js-utils';
import { ExposedAudienceDefinition } from '@ninetailed/experience.js-preview-bridge';
import { useMemo } from 'react';

const P13nProvider = ({ children }) => {
  const { locale } = useContentfulContext();

  const { isLoading, data } = useCtfNinetailedDataQuery({
    locale,
    preview: true,
  });
  const ninetailed = useMemo(() => {
    return data && mapCtflNinetailedData(data);
  }, [data]);

  if (!ninetailed) return null;

  return (
    <NinetailedProvider
      clientId={contentfulConfig.ninetailed.apiKey ?? ''}
      environment={contentfulConfig.ninetailed.environment ?? 'main'}
      // experiments={ninetailed.experiences}
      plugins={[
        // TODO: Do not load in production!
        // https://docs.ninetailed.io/for-developers/experience-sdk/plugins/preview-plugin
        new NinetailedPreviewPlugin({
          experiences: ninetailed.experiences,
          audiences: ninetailed.audiences,
          onOpenExperienceEditor: experience => {
            console.log('onOpenExperienceEditor', experience);
            ContentfulLivePreview.openEntryInEditor({
              locale,
              entryId: experience.id,
              fieldId: experience.type,
            });
          },
          ui: { opener: { hide: false } }, // Show Ninetailed controls.
        }),
      ]}
    >
      {children}
    </NinetailedProvider>
  );
};

export default P13nProvider;

function mapCtflNinetailedData(data: CtfNinetailedDataQuery) {
  const experiences = data.ntExperienceCollection?.items ?? [];
  const audiences = data.ntAudienceCollection?.items ?? [];

  return {
    experiences: mapGraphQLNinetailedExperiences(experiences),
    audiences: mapGraphQlNinetailedAudiences(audiences),
  };
}

function isNotEmpty<T>(input: null | undefined | T): input is T {
  return !!input;
}

export function mapGraphQLNinetailedExperiences(
  ntExperiences: Array<NtExperienceFieldsFragment | null>,
) {
  return ntExperiences
    .filter(isNotEmpty)
    .map(entry => {
      return {
        name: entry.ntName,
        type: entry.ntType,
        config: entry.ntConfig,
        description: entry.ntDescription,
        audience: entry.ntAudience
          ? {
              id: entry.ntAudience.ntAudienceId,
              name: entry.ntAudience.ntName,
            }
          : null,
        id: entry.sys.id,
        variants: entry.ntVariantsCollection?.items.map((variant: any) => {
          return {
            id: variant.sys.id,
          };
        }),
      } as Experience;
    })
    .filter(ExperienceMapper.isExperienceEntry)
    .map(ExperienceMapper.mapExperience);
}

function mapGraphQlNinetailedAudiences(ntAudiences: Array<NtAudienceFieldsFragment | null>) {
  return ntAudiences.filter(isNotEmpty).map(entry => ({
    id: entry?.ntAudienceId,
    name: entry?.ntName,
    description: entry?.ntDescription,
  })) as ExposedAudienceDefinition[];
}
