import contentfulConfig from 'contentful.config';
import { NinetailedProvider } from '@ninetailed/experience.js-next';
import { NinetailedPreviewPlugin } from '@ninetailed/experience.js-plugin-preview';
import { NinetailedInsightsPlugin } from '@ninetailed/experience.js-plugin-insights';
import { useContentfulContext } from '@src/contentful-context';
import { ContentfulLivePreview } from '@contentful/live-preview';
import { useCtfNinetailedPreviewDataQuery } from './__generated/ctf-ninetailed-entities.generated';
import { useMemo } from 'react';
import { mapCtflNinetailedData } from './util';

const P13nProvider = ({ children }) => {
  const { previewActive } = useContentfulContext();
  const NinetailedComponent = previewActive ? P13nProviderPreview : P13nProviderProduction;

  return (
    <NinetailedComponent
      clientId={contentfulConfig.ninetailed.apiKey ?? ''}
      environment={contentfulConfig.ninetailed.environment ?? 'main'}
    >
      {children}
    </NinetailedComponent>
  );
};

const P13nProviderProduction = ({ children, clientId, environment }) => {
  return (
    <NinetailedProvider
      clientId={clientId}
      environment={environment}
      plugins={[new NinetailedInsightsPlugin()]}
    >
      {children}
    </NinetailedProvider>
  );
};

const P13nProviderPreview = ({ children, clientId, environment }) => {
  const { locale, previewActive } = useContentfulContext();

  const { isLoading, data } = useCtfNinetailedPreviewDataQuery({
    locale,
    preview: previewActive, // CDA vs. CPA
  });
  const ninetailed = useMemo(() => data && mapCtflNinetailedData(data), [data]);

  if (!ninetailed) return null;

  return (
    <NinetailedProvider
      clientId={clientId}
      environment={environment}
      plugins={[
        new NinetailedInsightsPlugin(),
        // https://docs.ninetailed.io/for-developers/experience-sdk/plugins/preview-plugin
        new NinetailedPreviewPlugin({
          experiences: ninetailed.experiences,
          audiences: ninetailed.audiences,
          onOpenExperienceEditor: (experience) => {
            // TODO: Seems to cause some sort of error when opening CF.
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
