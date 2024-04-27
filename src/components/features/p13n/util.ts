import {
  CtfNinetailedDataQuery, NtAudienceFieldsFragment,
  NtExperienceFieldsFragment,
} from '@src/components/features/p13n/__generated/ctf-ninetailed-entities.generated';
import { Experience, ExperienceMapper } from '@ninetailed/experience.js-utils';
import { ExposedAudienceDefinition } from '@ninetailed/experience.js-preview-bridge';

export function mapCtflNinetailedData(data: CtfNinetailedDataQuery) {
  const experiences = data.ntExperienceCollection?.items ?? []
  const audiences = data.ntAudienceCollection?.items ?? []

  return {
    experiences: mapGraphQLNinetailedExperiences(experiences),
    audiences: mapGraphQlNinetailedAudiences(audiences),
  }
}

function isNotEmpty<T>(input: null | undefined | T): input is T {
  return !!input;
}

type VariantMapper = (id: string, ctName: string, variant: any) => Record<string, any>

export function mapGraphQLNinetailedExperiences(
  ntExperiences: Array<NtExperienceFieldsFragment|null>,
  variantMapperFn?: VariantMapper
) {
  return ntExperiences
    .filter(isNotEmpty)
    .map((entry) => {
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
          const { sys, __typename, ...props } = variant;
          return {
            id: sys.id,
            ...(variantMapperFn ? variantMapperFn(sys.id, __typename, props) : {})
          };
        }),
      } as Experience
    })
    .filter(ExperienceMapper.isExperienceEntry)
    .map(ExperienceMapper.mapExperience)
}

export function mapGraphQlNinetailedAudiences(ntAudiences: Array<NtAudienceFieldsFragment|null>) {
  return ntAudiences
    .filter(isNotEmpty)
    .map((entry) => ({
      id: entry?.ntAudienceId,
      name: entry?.ntName,
      description: entry?.ntDescription,
    })) as ExposedAudienceDefinition[]
}
