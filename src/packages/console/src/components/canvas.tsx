import React from 'react';

import { IndexPage, replaceAssetPaths } from '@kibalabs/everypage';
import { IWebsite } from '@kibalabs/everypage/src/model/website';
import { Alignment, BackgroundView, Box, Button, Checkbox, Direction, Divider, ITheme, PaddingSize, Stack, TabBar, Text } from '@kibalabs/ui-react';

import { Section } from '../everypageClient';
import { ContentEditor } from './contentEditor';
import { Dropzone, FilePreviewGrid } from './dropzone';
import { JsonEditor } from './jsonEditor';
import { KibaFrame } from './kibaFrame';
import { SectionChooserDialog } from './sectionChooserDialog';

const TAB_KEY_CONTENT = 'content';
const TAB_KEY_THEME = 'theme';
const TAB_KEY_MEDIA = 'media';

interface ICanvasProps {
  isEditable: boolean;
  title?: string;
  subtitle?: string;
  isEditorHidden: boolean;
  onIsEditorHiddenToggled: () => void;
  isMetaHidden: boolean;
  onIsMetaHiddenToggled: () => void;
  siteContent: IWebsite;
  onSiteContentUpdated: (siteContent: IWebsite) => void;
  siteTheme: ITheme;
  onSiteThemeUpdated: (siteTheme: ITheme) => void;
  assetFileMap: Record<string, string>;
  addAssetFiles: (files: File[]) => Promise<void>;
  deleteAssetFile?: (fileKey: string) => Promise<void>;
}

export const Canvas = (props: ICanvasProps): React.ReactElement => {
  const [selectedEditorTabKey, setSelectedEditorTabKey] = React.useState<string>(TAB_KEY_CONTENT);
  const [isSectionChooserShowing, setIsSectionChooserShowing] = React.useState<boolean>(false);
  const [chosenSectionId, setChosenSectionId] = React.useState<string | undefined>(undefined);
  const [uploadFilesError, setUploadFilesError] = React.useState<string>('');

  const onSiteContentUpdated = React.useCallback((siteContent: IWebsite): void => {
    const onSiteContentUpdatedFunc = props.onSiteContentUpdated;
    onSiteContentUpdatedFunc(siteContent);
  }, [props.onSiteContentUpdated]);

  const onSiteThemeUpdated = React.useCallback((siteTheme: ITheme): void => {
    const onSiteThemeUpdatedFunc = props.onSiteThemeUpdated;
    onSiteThemeUpdatedFunc(siteTheme);
  }, [props.onSiteThemeUpdated]);

  const onAssetFilesChosen = (files: File[]): void => {
    setUploadFilesError('');
    const largeFiles = [];
    const MAX_FILE_SIZE = 5;

    files.forEach((file: File): void => {
      if (file.size / 1024 / 1024 > MAX_FILE_SIZE) {
        console.warn(`${file.name} was not uploaded successfully. Max file size supported is 5MB.`);
        largeFiles.push(file.name);
      }
    });

    let errorMessage = '';
    largeFiles.forEach((file: string): void => {
      errorMessage += `${file} `;
    });
    if (errorMessage.length > 0) {
      errorMessage += largeFiles.length > 1 ? 'were ' : 'was ';
      errorMessage += 'not uploaded successfully. Max file size supported is 5MB.';
    }
    setUploadFilesError(errorMessage);
    setTimeout(() => {
      setUploadFilesError('');
    }, 6000);
    props.addAssetFiles(files);
  };

  const onEditorTabKeySelected = (tabKey: string) => {
    setSelectedEditorTabKey(tabKey);
  };

  const onAddSectionClicked = (): void => {
    setIsSectionChooserShowing(true);
  };

  const onNavigationChanged = (path: string): void => {
    if (!path) {
      setChosenSectionId(undefined);
    } else if (path === 'metadata') {
      setChosenSectionId('metadata');
    } else if (path.startsWith('plugin:')) {
      setChosenSectionId(undefined);
    } else if (path.startsWith('section:')) {
      const sectionIndex = parseInt(path.replace('section:', ''), 10);
      const section = props.siteContent.sections[sectionIndex];
      // NOTE(krishan711): section id is set in indexPage if not provided. Can we make the link to this code explicit
      const sectionId = section.id || `section-${sectionIndex}`;
      setChosenSectionId(sectionId);
    }
  };

  const onIsEditorHiddenToggled = (): void => {
    props.onIsEditorHiddenToggled();
  };

  const onIsMetaHiddenToggled = (): void => {
    props.onIsMetaHiddenToggled();
  };

  const onChooseSectionClicked = (section: Section): void => {
    // TODO(krishan711): find a nicer way to create a deep clone
    const newContent = JSON.parse(JSON.stringify(props.siteContent));
    newContent.sections = newContent.sections || [];
    newContent.sections.push(section.content);
    props.onSiteContentUpdated(newContent);
    setIsSectionChooserShowing(false);
  };

  const onSectionChooserCloseClicked = (): void => {
    setIsSectionChooserShowing(false);
  };

  return (
    <React.Fragment>
      <Stack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
        <Box variant='banner'>
          <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Start} childAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
            <Text variant='header5'>{props.title || ''}</Text>
            <Text variant='light'>{props.subtitle || ''}</Text>
            {!props.isEditable && <Text variant='light'>{'view-only mode'}</Text>}
            <Button text={props.isEditorHidden ? 'Show editor' : 'Hide editor'} onClicked={onIsEditorHiddenToggled} />
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Checkbox text='Hide metadata' isChecked={props.isMetaHidden} onToggled={onIsMetaHiddenToggled} />
          </Stack>
        </Box>
        <Stack direction={Direction.Horizontal} isFullHeight={true}>
          {!props.isEditorHidden && (
            <BackgroundView color='white'>
              <Box width='500px' height='100%'>
                <Stack direction={Direction.Vertical} isFullHeight={true}>
                  <TabBar selectedTabKey={selectedEditorTabKey} onTabKeySelected={onEditorTabKeySelected}>
                    <TabBar.Item tabKey={TAB_KEY_CONTENT} text='Content' isExpandable={true} />
                    <TabBar.Item tabKey={TAB_KEY_THEME} text='Theme' isExpandable={true} />
                    <TabBar.Item tabKey={TAB_KEY_MEDIA} text='Media' isExpandable={true} />
                  </TabBar>
                  {selectedEditorTabKey === TAB_KEY_CONTENT && (
                    <Stack.Item growthFactor={1} shrinkFactor={1}>
                      <ContentEditor isEditable={props.isEditable} siteContent={props.siteContent} onAddSectionClicked={onAddSectionClicked} onSiteContentUpdated={onSiteContentUpdated} onNavigationChanged={onNavigationChanged} />
                    </Stack.Item>
                  )}
                  {selectedEditorTabKey === TAB_KEY_THEME && (
                    <Stack.Item growthFactor={1} shrinkFactor={1}>
                      <JsonEditor isEditable={props.isEditable} name='theme' json={props.siteTheme} onJsonUpdated={onSiteThemeUpdated} />
                    </Stack.Item>
                  )}
                  {selectedEditorTabKey === TAB_KEY_MEDIA && (
                    <Stack.Item growthFactor={1} shrinkFactor={1}>
                      {props.isEditable && <Dropzone onFilesChosen={onAssetFilesChosen} />}
                      {uploadFilesError && <Text variant='note-error'>{uploadFilesError}</Text>}
                      <FilePreviewGrid fileMap={props.assetFileMap} onDeleteClicked={props.deleteAssetFile} />
                    </Stack.Item>
                  )}
                </Stack>
              </Box>
            </BackgroundView>
          )}
          {!props.isEditorHidden && <Divider orientation='vertical' />}
          <Stack.Item growthFactor={1} shrinkFactor={1}>
            <KibaFrame selectedElementId={chosenSectionId}>
              <IndexPage pageContent={replaceAssetPaths(props.siteContent, props.assetFileMap)} pageTheme={props.siteTheme} shouldIncludeHeadSection={!props.isMetaHidden} shouldIncludeAttributionSection={true} />
            </KibaFrame>
          </Stack.Item>
        </Stack>
      </Stack>

      <SectionChooserDialog
        isOpen={isSectionChooserShowing}
        onCloseClicked={onSectionChooserCloseClicked}
        onChooseSectionClicked={onChooseSectionClicked}
      />
    </React.Fragment>
  );
};

Canvas.defaultProps = {
  isEditable: true,
  isMetaShown: true,
};
