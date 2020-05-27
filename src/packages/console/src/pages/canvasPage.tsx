import React from 'react';
import { useObjectLocalStorageState, useBooleanLocalStorageState } from '@kibalabs/core-react';

import { Canvas } from '../components/canvas';
import { defaultSite } from '../defaultSite';

export const CanvasPage = (): React.ReactElement => {
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [assetFileMap, setAssetFileMap] = React.useState<Record<string, string>>({});
  const resolvedSiteContent = (siteContent || defaultSite);

  const addAssetFile = (filePath: string, targetPath: string): void => {
    const newAssetFileMap = {...assetFileMap};
    newAssetFileMap[filePath] = targetPath;
    setAssetFileMap(newAssetFileMap);
  };

  console.log('assetFileMap', assetFileMap);
  return (
    <Canvas
      siteContent={resolvedSiteContent}
      onSiteContentUpdated={setSiteContent}
      siteTheme={siteTheme}
      onSiteThemeUpdated={setSiteTheme}
      isEditorHidden={isEditorHidden}
      onIsEditorHiddenUpdated={setIsEditorHidden}
      assetFileMap={assetFileMap}
      addAssetFile={addAssetFile}
    />
  )
}
