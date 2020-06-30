import React from 'react';
import { useObjectLocalStorageState, useBooleanLocalStorageState } from '@kibalabs/core-react';
import { ThemeProvider } from '@kibalabs/ui-react';
import { buildEverypageTheme } from '@kibalabs/everypage-core';

import { Canvas } from '../components/canvas';
import { TemplateChooserModal } from '../components/templateChooserModal';
import { Template, SiteVersionEntry } from '../everypageClient';
import { useGlobals } from '../globalsContext';

export const CanvasPage = (): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [assetFileMap, setAssetFileMap] = React.useState<Record<string, string>>({});

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

  const onChooseTemplateClicked = (template: Template) => {
    everypageClient.get_site_version_entry_for_template(template.templateId).then((siteVersionEntry: SiteVersionEntry) => {
      setSiteContent(siteVersionEntry.siteContent);
      setSiteTheme(siteVersionEntry.siteTheme);
    }).catch((error: Error): void => {
      console.log('error', error);
    });
  };

  return (
    <ThemeProvider theme={buildEverypageTheme()}>
      {siteContent && <Canvas
        siteContent={siteContent}
        onSiteContentUpdated={setSiteContent}
        siteTheme={siteTheme}
        onSiteThemeUpdated={setSiteTheme}
        isEditorHidden={isEditorHidden}
        onIsEditorHiddenUpdated={setIsEditorHidden}
        assetFileMap={assetFileMap}
        addAssetFiles={addAssetFiles}
      />}
      <TemplateChooserModal
        isOpen={!siteContent}
        onChooseTemplateClicked={onChooseTemplateClicked}
      />
    </ThemeProvider>
  )
}
