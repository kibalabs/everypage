
import React from 'react';

import { deepCompare } from '@kibalabs/core';
import { IndexPage, replaceAssetPaths } from '@kibalabs/everypage';
import { Direction, ITheme, KibaIcon, Stack, TabBar } from '@kibalabs/ui-react';
import MaterialBox from '@material-ui/core/Box';
import MaterialButton from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

import { Section } from '../everypageClient';
import { ContentEditor } from './contentEditor';
import { Dropzone, FilePreviewGrid } from './dropzone';
import { JsonEditor } from './jsonEditor';
import { KibaFrame } from './kibaFrame';
import { SectionChooserModal } from './sectionChooserModal';
import { IWebsite } from '@kibalabs/everypage/src/model/website';

const TAB_KEY_CONTENT = 'content';
const TAB_KEY_THEME = 'theme';
const TAB_KEY_MEDIA = 'media';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  frameWrapper: {
    flexGrow: 1,
    flexShrink: 1,
  },
  editorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '500px',
    backgroundColor: 'white',
  },
  editor: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    // for safari flex fix (https://github.com/philipwalton/flexbugs/issues/197)
    height: 0,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  buttonBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
  },
  buttonBar2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  buttonSelected: {
    backgroundColor: '#111111',
  },
  verticalLine: {
    backgroundColor: '#333333',
    width: '1px',
    height: '100%',
  },
}));

interface ICanvasProps {
  isEditable: boolean;
  isMetaShown: boolean;
  siteContent: IWebsite;
  onSiteContentUpdated: (siteContent: IWebsite) => void;
  siteTheme: ITheme;
  onSiteThemeUpdated: (siteTheme: ITheme) => void;
  assetFileMap: Record<string, string>;
  addAssetFiles: (files: File[]) => Promise<void>;
  deleteAssetFile?: (fileKey: string) => Promise<void>;
  isEditorHidden: boolean;
  onIsEditorHiddenUpdated: (isEditorHidden: boolean) => void;
}

export const Canvas = (props: ICanvasProps): React.ReactElement => {
  const classes = useStyles();
  const [selectedEditorTabKey, setSelectedEditorTabKey] = React.useState<string>(TAB_KEY_CONTENT);
  const [isSectionChooserShowing, setIsSectionChooserShowing] = React.useState<boolean>(false);
  const [chosenSectionId, setChosenSectionId] = React.useState<string | undefined>(undefined);

  const onSiteContentUpdated = React.useCallback((siteContent: IWebsite): void => {
    props.onSiteContentUpdated(siteContent);
  }, [props.onSiteContentUpdated]);

  const onSiteThemeUpdated = React.useCallback((siteTheme: ITheme): void => {
    props.onSiteThemeUpdated(siteTheme);
  }, [props.onSiteThemeUpdated]);

  const onAssetFilesChosen = (files: File[]): void => {
    props.addAssetFiles(files);
  };

  const onHideEditorClicked = (): void => {
    props.onIsEditorHiddenUpdated(true);
  };

  const onShowEditorClicked = (): void => {
    props.onIsEditorHiddenUpdated(false);
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

  const onChooseSectionClicked = (section: Section): void => {
    // TODO(krishan711): find a nicer way to create a deep clone
    const newContent = JSON.parse(JSON.stringify(props.siteContent));
    newContent.sections = newContent.sections || [];
    newContent.sections.push(section.content);
    props.onSiteContentUpdated(newContent);
    setIsSectionChooserShowing(false);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        {!props.isEditorHidden && (
          <div className={classes.editorWrapper}>
            <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
              <Stack.Item growthFactor={1}>
                <TabBar selectedTabKey={selectedEditorTabKey} onTabKeySelected={onEditorTabKeySelected}>
                  <TabBar.Item tabKey={TAB_KEY_CONTENT} text='Content' isExpandable={true} />
                  <TabBar.Item tabKey={TAB_KEY_THEME} text='Theme' isExpandable={true} />
                  <TabBar.Item tabKey={TAB_KEY_MEDIA} text='Media' isExpandable={true} />
                </TabBar>
              </Stack.Item>
              <MaterialButton variant='outlined' onClick={onHideEditorClicked}>Hide</MaterialButton>
            </Stack>
            <MaterialBox className={classes.editor} display={selectedEditorTabKey === TAB_KEY_CONTENT ? 'flex' : 'none'}>
              <ContentEditor isEditable={props.isEditable} siteContent={props.siteContent} onAddSectionClicked={onAddSectionClicked} onSiteContentUpdated={onSiteContentUpdated} onNavigationChanged={onNavigationChanged} />
            </MaterialBox>
            <MaterialBox className={classes.editor} display={selectedEditorTabKey === TAB_KEY_THEME ? 'flex' : 'none'}>
              <JsonEditor isEditable={props.isEditable} name='theme' json={props.siteTheme} onJsonUpdated={onSiteThemeUpdated} />
            </MaterialBox>
            <MaterialBox className={classes.editor} display={selectedEditorTabKey === TAB_KEY_MEDIA ? 'flex' : 'none'}>
              {props.isEditable && <Dropzone onFilesChosen={onAssetFilesChosen} />}
              <FilePreviewGrid fileMap={props.assetFileMap} onDeleteClicked={props.deleteAssetFile} />
            </MaterialBox>
          </div>
        )}
        {!props.isEditorHidden && <div className={classes.verticalLine} />}
        <div className={classes.frameWrapper}>
          <KibaFrame selectedElementId={chosenSectionId}>
            <IndexPage pageContent={replaceAssetPaths(props.siteContent, props.assetFileMap)} pageTheme={props.siteTheme} shouldIncludeHeadSection={props.isMetaShown} shouldIncludeAttributionSection={true} />
          </KibaFrame>
        </div>
      </div>
      {props.isEditorHidden && (
        <Fab color='primary' onClick={onShowEditorClicked} className={classes.fab}>
          <KibaIcon iconId='ion-brush' />
        </Fab>
      )}
      <SectionChooserModal
        isOpen={isSectionChooserShowing}
        onChooseSectionClicked={onChooseSectionClicked}
      />
    </React.Fragment>
  );
};

Canvas.defaultProps = {
  isEditable: true,
  isMetaShown: true,
};
