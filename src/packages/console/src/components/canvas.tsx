
import React from 'react';
import { deepCompare } from '@kibalabs/core';
import { IndexPage, replaceAssetPaths } from '@kibalabs/everypage-core';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { KibaFrame } from '../components/kibaFrame';
import { JsonEditor } from '../components/jsonEditor';
import { Dropzone, FilePreviewGrid } from '../components/dropzone';
import { SectionChooserModal } from '../components/sectionChooserModal';
import { Section } from '../everypageClient';

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
  tabBar: {
    flexGrow: 1,
    flexShrink: 1,
    margin: theme.spacing(0, 1, 0, 0),
  },
  tab: {
    minWidth: '120px',
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
  isHeadShown: boolean;
  siteContent: Record<string, any>;
  onSiteContentUpdated: (siteContent: Record<string, any>) => void;
  siteTheme: Record<string, any>;
  onSiteThemeUpdated: (siteTheme: Record<string, any>) => void;
  assetFileMap: Record<string, string>;
  addAssetFiles: (files: File[]) => Promise<void>;
  deleteAssetFile?: (fileKey: string) => Promise<void>;
  isEditorHidden: boolean;
  onIsEditorHiddenUpdated: (isEditorHidden: boolean) => void;
}

export const Canvas = (props: ICanvasProps): React.ReactElement => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isSectionChooserShowing, setIsSectionChooserShowing] = React.useState(false);

  const onSiteJsonUpdated = (parsedJson: object): void => {
    props.onSiteContentUpdated(parsedJson);
  }

  const onThemeJsonUpdated = (parsedJson: object): void => {
    props.onSiteThemeUpdated(parsedJson);
  }

  const onAssetFilesChosen = (files: File[]): void => {
    props.addAssetFiles(files);
  }

  const onHideEditorClicked = (): void => {
    props.onIsEditorHiddenUpdated(true);
  }

  const onShowEditorClicked = (): void => {
    props.onIsEditorHiddenUpdated(false);
  }

  const onSelectedTabChanged = (event: React.ChangeEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const onAddSectionClicked = (): void => {
    setIsSectionChooserShowing(true);
  }

  const onChooseSectionClicked = (section: Section): void => {
    // TODO(krish): find a nicer way to create a deep clone
    const newContent = JSON.parse(JSON.stringify(props.siteContent));
    newContent.sections = newContent.sections || [];
    newContent.sections.push(section.content);
    props.onSiteContentUpdated(newContent);
    setIsSectionChooserShowing(false);
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        {!props.isEditorHidden && (
          <div className={classes.editorWrapper}>
            <div className={classes.buttonBar}>
              <Tabs
                className={classes.tabBar}
                value={selectedTab}
                onChange={onSelectedTabChanged}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Content" className={classes.tab} />
                <Tab label="Theme" className={classes.tab} />
                <Tab label="Media" className={classes.tab} />
              </Tabs>
              <Button variant='outlined' onClick={onHideEditorClicked}>Hide</Button>
            </div>
            <Box className={classes.editor} display={selectedTab === 0 ? 'flex' : 'none'}>
              {props.isEditable && (
                <div className={classes.buttonBar2}>
                  <Button variant='outlined' color='primary' onClick={onAddSectionClicked}>Add section</Button>
                  {/* <Button variant='outlined' color='primary' onClick={onAddPluginClicked}>Add plugin</Button> */}
                </div>
              )}
              <JsonEditor isEditable={props.isEditable} name='site' json={props.siteContent} onJsonUpdated={onSiteJsonUpdated}/>
            </Box>
            <Box className={classes.editor} display={selectedTab === 1 ? 'flex' : 'none'}>
              <JsonEditor isEditable={props.isEditable} name='theme' json={props.siteTheme} onJsonUpdated={onThemeJsonUpdated}/>
            </Box>
            <Box className={classes.editor} display={selectedTab === 2 ? 'flex' : 'none'}>
              {props.isEditable && <Dropzone onFilesChosen={onAssetFilesChosen} />}
              <FilePreviewGrid fileMap={props.assetFileMap} onDeleteClicked={props.deleteAssetFile}/>
            </Box>
          </div>
        )}
        {!props.isEditorHidden && <div className={classes.verticalLine} />}
        <div className={classes.frameWrapper}>
          <KibaFrame>
            <IndexPage pageContent={replaceAssetPaths(props.siteContent, props.assetFileMap)} pageTheme={props.siteTheme} shouldIncludeHeadSection={props.isHeadShown} shouldIncludeAttributionSection={true} />
          </KibaFrame>
        </div>
      </div>
      {props.isEditorHidden && (
        <Fab color='primary' onClick={onShowEditorClicked} className={classes.fab}>
          <EditIcon />
        </Fab>
      )}
      <SectionChooserModal
        isOpen={isSectionChooserShowing}
        onChooseSectionClicked={onChooseSectionClicked}
      />
    </React.Fragment>
  )
}

Canvas.defaultProps = {
  isEditable: true,
  isHeadShown: true,
}

export const MemoCanvas = React.memo(Canvas, deepCompare);
