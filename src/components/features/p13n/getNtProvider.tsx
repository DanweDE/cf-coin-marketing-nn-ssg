import { ContentfulLivePreview } from '@contentful/live-preview';
import type { NinetailedProviderInstantiationProps } from '@ninetailed/experience.js-next';
import { NinetailedProvider } from '@ninetailed/experience.js-next';
import dynamic from 'next/dynamic';
import { PropsWithChildren, useMemo } from 'react';

import { useCtfNinetailedPreviewDataQuery } from '@src/components/features/p13n/__generated/ctf-ninetailed-entities.generated';
import { mapCtflNinetailedData } from '@src/components/features/p13n/util';
import { useContentfulContext } from '@src/contentful-context';

/**
 * Dynamic import of the preview plugin ensures it is not part of a production bundle.
 * See https://docs.ninetailed.io/for-developers/experience-sdk/plugins/preview-plugin
 */
export function getNinetailedProvider(enablePreview: boolean) {
  if (!enablePreview) {
    return function StandardNinetailedProvider({
      children,
      ...props
    }: PropsWithChildren<NinetailedProviderInstantiationProps>) {
      return <NinetailedProvider {...props}>{children}</NinetailedProvider>;
    };
  }

  return dynamic(() =>
    import('@ninetailed/experience.js-plugin-preview').then(mod => {
      return function NinetailedProviderWithPreviewPlugin({
        children,
        ...props
      }: PropsWithChildren<NinetailedProviderInstantiationProps>) {
        const { locale, previewActive } = useContentfulContext();

        const { data } = useCtfNinetailedPreviewDataQuery({
          locale,
          preview: previewActive, // CDA vs. CPA
        });
        const ninetailed = useMemo(() => data && mapCtflNinetailedData(data), [data]);

        if (!ninetailed) return null;

        const plugins = [
          new mod.NinetailedPreviewPlugin({
            experiences: ninetailed.experiences,
            audiences: ninetailed.audiences,
            onOpenExperienceEditor: experience => {
              // TODO: Seems to cause some sort of error when opening CF.
              ContentfulLivePreview.openEntryInEditor({
                locale,
                entryId: experience.id,
                fieldId: experience.type,
              });
            },
            ui: { opener: { hide: false } }, // Show Ninetailed controls.
          }),
          ...(props.plugins || []),
        ];

        return (
          <NinetailedProvider {...props} plugins={plugins}>
            {children}
          </NinetailedProvider>
        );
      };
    }),
  );
}
