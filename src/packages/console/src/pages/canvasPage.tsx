import React from 'react';

import { useBooleanLocalStorageState, useObjectLocalStorageState } from '@kibalabs/core-react';
import { Alignment, Box, Button, Direction, MessageDialog, PaddingSize, Stack, Text } from '@kibalabs/ui-react';
import Helmet from 'react-helmet';

import { Canvas } from '../components/canvas';
import { TemplateChooserModal } from '../components/templateChooserModal';
import { SiteVersionEntry, Template } from '../everypageClient';
import { useGlobals } from '../globalsContext';

export const CanvasPage = (): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const [siteContent, setSiteContent] = useObjectLocalStorageState('siteContent');
  const [siteTheme, setSiteTheme] = useObjectLocalStorageState('siteTheme');
  const [assetFileMap, setAssetFileMap] = React.useState<Record<string, string>>({});
  const [isShowingStartOverAlert, setIsShowingStartOverAlert] = React.useState<boolean>(false);
  const [isEditorHidden, setIsEditorHidden] = useBooleanLocalStorageState('isEditorHidden');
  const [isMetaHidden, setIsMetaHidden] = useBooleanLocalStorageState('isMetaHidden');

  const addAssetFiles = (files: File[]): Promise<void> => {
    const newAssetFileMap = { ...assetFileMap };
    files.forEach((file: File): void => {
      newAssetFileMap[`/assets/${file.path}`] = URL.createObjectURL(file);
    });
    setAssetFileMap(newAssetFileMap);
    return new Promise((resolve: () => void) => {
      resolve();
    });
  };

  const onChooseTemplateClicked = (template: Template) => {
    everypageClient.getSiteVersionEntryForTemplate(template.templateId).then((siteVersionEntry: SiteVersionEntry) => {
      setSiteContent(siteVersionEntry.siteContent);
      setSiteTheme(siteVersionEntry.siteTheme);
    }).catch((error: Error): void => {
      console.error('error', error);
    });
  };

  const onStartOverClicked = (): void => {
    setIsShowingStartOverAlert(true);
  };

  const onStartOverAlertCloseClicked = (): void => {
    setIsShowingStartOverAlert(false);
  };

  const onStartOverAlertConfirmClicked = (): void => {
    setIsShowingStartOverAlert(false);
    setSiteContent(null);
    setSiteTheme(null);
  };

  const onSiteContentUpdated = (newSiteContent: Record<string, unknown>): void => {
    setSiteContent(newSiteContent);
  };

  const onSiteThemeUpdated = (newSiteTheme: Record<string, unknown>): void => {
    setSiteTheme(newSiteTheme);
  };

  const onIsEditorHiddenToggled = (): void => {
    setIsEditorHidden(!isEditorHidden);
  };

  const onIsMetaHiddenToggled = (): void => {
    setIsMetaHidden(!isMetaHidden);
  };

  return (
    <Stack direction={Direction.Vertical} isFullHeight={true}>
      <Helmet>
        <title>Canvas | Everypage Console</title>
      </Helmet>
      <Box variant='banner'>
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} paddingHorizontal={PaddingSize.Wide} isFullWidth={true}>
          <Button
            variant='secondary'
            onClicked={onStartOverClicked}
            text='Start again'
          />
          <Stack.Item growthFactor={1} shrinkFactor={1} />
          <Stack direction={Direction.Vertical} isFullWidth={false}>
            <Button
              variant='primary'
              target='/register'
              text='Sign in to publish'
            />
            <Text variant='note'>Our core package is totally free 🙌</Text>
          </Stack>
        </Stack>
      </Box>
      <Stack.Item growthFactor={1} shrinkFactor={1}>
        {siteContent && (
          <Canvas
            isEditable={true}
            isEditorHidden={isEditorHidden}
            onIsEditorHiddenToggled={onIsEditorHiddenToggled}
            isMetaHidden={isMetaHidden}
            onIsMetaHiddenToggled={onIsMetaHiddenToggled}
            siteContent={siteContent}
            onSiteContentUpdated={onSiteContentUpdated}
            siteTheme={siteTheme}
            onSiteThemeUpdated={onSiteThemeUpdated}
            assetFileMap={assetFileMap}
            addAssetFiles={addAssetFiles}
          />
        )}
      </Stack.Item>

      <TemplateChooserModal
        isOpen={!siteContent}
        onChooseTemplateClicked={onChooseTemplateClicked}
      />

      <MessageDialog
        isOpen={isShowingStartOverAlert}
        title='Are you sure?'
        message='Starting over will clear all your current work. If you want to create more than one site at a time, please sign up - the core package is totally free and requires no credit card!'
        confirmButtonText='Start over anyway'
        onCloseClicked={onStartOverAlertCloseClicked}
        onConfirmClicked={onStartOverAlertConfirmClicked}
      />
    </Stack>
  );
};
