import React from 'react';
import { useObjectLocalStorageState, useBooleanLocalStorageState } from '@kibalabs/core-react';
import { buildTheme, ThemeProvider } from '@kibalabs/ui-react';

import { Canvas } from '../components/canvas';
import { defaultSite } from '../defaultSite';

export const CanvasPage = (): React.ReactElement => {
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [assetFileMap, setAssetFileMap] = React.useState<Record<string, string>>({});
  const resolvedSiteContent = (siteContent || defaultSite);

  const addAssetFiles = (files: File[]): Promise<void> => {
    const newAssetFileMap = {...assetFileMap};
    files.map((file: File): void => {
      newAssetFileMap[`/assets/${file.path}`] = URL.createObjectURL(file);
    });
    setAssetFileMap(newAssetFileMap);
    return new Promise((resolve: () => void) => {
      resolve();
    });
  };

  return (
    <ThemeProvider theme={buildTheme()}>
      <Canvas
        siteContent={resolvedSiteContent}
        onSiteContentUpdated={setSiteContent}
        siteTheme={siteTheme}
        onSiteThemeUpdated={setSiteTheme}
        isEditorHidden={isEditorHidden}
        onIsEditorHiddenUpdated={setIsEditorHidden}
        assetFileMap={assetFileMap}
        addAssetFiles={addAssetFiles}
      />
    </ThemeProvider>
  )
}
