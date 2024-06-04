import { NinetailedInsightsPlugin } from '@ninetailed/experience.js-plugin-insights';

import { getNinetailedProvider } from '@src/components/features/p13n/getNtProvider';
import { useContentfulContext } from '@src/contentful-context';
import contentfulConfig from 'contentful.config';

const P13nProvider = ({ children }) => {
  const { previewActive } = useContentfulContext();
  const NinetailedComponent = getNinetailedProvider(previewActive);

  return (
    <NinetailedComponent
      clientId={contentfulConfig.ninetailed.apiKey ?? ''}
      environment={contentfulConfig.ninetailed.environment ?? 'main'}
      plugins={[new NinetailedInsightsPlugin()]}
    >
      {children}
    </NinetailedComponent>
  );
};

export default P13nProvider;
