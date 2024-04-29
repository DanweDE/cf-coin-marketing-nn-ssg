import {
  CtfNinetailedPreviewDataQuery,
  NtAudienceFieldsFragment,
  NtExperienceBasicFieldsFragment,
} from '@src/components/features/p13n/__generated/ctf-ninetailed-entities.generated';
import { Experience, ExperienceMapper } from '@ninetailed/experience.js-utils';
import { ExposedAudienceDefinition } from '@ninetailed/experience.js-preview-bridge';
import { Sys } from '@src/lib/__generated/graphql.types';

export function mapCtflNinetailedData(data: CtfNinetailedPreviewDataQuery) {
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

type CtfNtGqlExperienceData = NtExperienceBasicFieldsFragment & {
  ntVariantsCollection?: any;
};

export function mapGraphQLNinetailedExperiences(
  ntExperiences: Array<CtfNtGqlExperienceData | null>,
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
        variants: entry.ntVariantsCollection?.items.map((entry: any) => {
          return {
            ...entry,
            id: entry.sys.id, // Required by Nt!
          };
        }),
      } as Experience;
    })
    .filter(ExperienceMapper.isExperienceEntry)
    .map(ExperienceMapper.mapExperience);
}

export function mapGraphQlNinetailedAudiences(ntAudiences: Array<NtAudienceFieldsFragment | null>) {
  return ntAudiences.filter(isNotEmpty).map(entry => ({
    id: entry?.ntAudienceId,
    name: entry?.ntName,
    description: entry?.ntDescription,
  })) as ExposedAudienceDefinition[];
}
