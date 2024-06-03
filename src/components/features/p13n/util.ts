import { ExposedAudienceDefinition } from '@ninetailed/experience.js-preview-bridge';
import { Experience, ExperienceMapper } from '@ninetailed/experience.js-utils';

import {
  CtfNinetailedPreviewDataQuery,
  NtAudienceFieldsFragment,
  NtExperienceBasicFieldsFragment,
} from '@src/components/features/p13n/__generated/ctf-ninetailed-entities.generated';
import { isNotEmpty } from '@src/utils';

export function mapCtflNinetailedData(data: CtfNinetailedPreviewDataQuery) {
  const experiences = data.ntExperienceCollection?.items ?? [];
  const audiences = data.ntAudienceCollection?.items ?? [];

  return {
    experiences: mapGraphQLNinetailedExperiences(experiences),
    audiences: mapGraphQlNinetailedAudiences(audiences),
  };
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
        variants: entry.ntVariantsCollection?.items.reduce((acc, entry: any) => {
          const id = entry.sys?.id;
          if (id) {
            acc.push({
              ...entry,
              id: id, // Required by Nt!
            });
          }
          return acc;
        }, []),
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
