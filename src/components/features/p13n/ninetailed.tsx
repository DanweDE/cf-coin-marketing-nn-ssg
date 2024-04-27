import contentfulConfig from 'contentful.config';
import { NinetailedProvider } from '@ninetailed/experience.js-next';
import { NinetailedPreviewPlugin } from '@ninetailed/experience.js-plugin-preview';
import { useContentfulContext } from '@src/contentful-context';
import { ContentfulLivePreview } from '@contentful/live-preview';
import {
  useCtfNinetailedDataQuery,
} from './__generated/ctf-ninetailed-entities.generated';
import { useMemo } from 'react';
import { mapCtflNinetailedData } from './util';

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
          onOpenExperienceEditor: (experience) => {
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
