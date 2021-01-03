
import React from 'react';
import { deepCompare } from '@kibalabs/core';
import { IndexPage, replaceAssetPaths, IWebsite, IWebsitePlugin, IWebsiteSection } from '@kibalabs/everypage';
import { TabBar, Stack, Direction, HidingView, PaddingSize, Spacing, BackgroundView, LinkBase, Button, Text, KibaIcon, Alignment, IconButton } from '@kibalabs/ui-react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import MaterialButton from '@material-ui/core/Button';
import MaterialBox from '@material-ui/core/Box';

import { KibaFrame } from './kibaFrame';
import { JsonEditor } from './jsonEditor';
import { Dropzone, FilePreviewGrid } from './dropzone';
import { SectionChooserModal } from './sectionChooserModal';
import { SiteMetaCard } from './siteMetaCard';
import { SiteSectionCard } from './siteSectionCard';
import { SitePluginCard } from './sitePluginCard';
import { Section } from '../everypageClient';

const TAB_KEY_CONTENT = 'content';
const TAB_KEY_THEME = 'theme';
const TAB_KEY_MEDIA = 'media';

const TAB_KEY_FORM = 'form';
const TAB_KEY_JSON = 'json';

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

interface IContentEditorProps {
  isEditable: boolean;
  siteContent: IWebsite;
  onAddSectionClicked: () => void;
  onNavigationChanged: (path: string) => void;
  onSiteContentUpdated: (siteContent: object) => void;
}

const ContentEditor = (props: IContentEditorProps): React.ReactElement => {
  const [selectedTypeTabKey, setSelectedTypeTabKey] = React.useState<string>(TAB_KEY_FORM);
  const [currentPath, setCurrentPath] = React.useState<string | undefined>(undefined);

  const onTabKeySelected = (tabKey: string): void => {
    setSelectedTypeTabKey(tabKey);
  }

  const onMetaClicked = (): void => {
    setCurrentPath('metadata');
  }

  const onBackClicked = (): void => {
    setCurrentPath(undefined);
  }

  const onPluginClicked = (index: number): void => {
    setCurrentPath(`plugin:${index}`);
  }

  const onSectionClicked = (index: number): void => {
    setCurrentPath(`section:${index}`);
  }

  React.useEffect((): void => {
    props.onNavigationChanged(currentPath);
  }, [currentPath]);

  const getJsonFromPath = (): object => {
    if (currentPath && currentPath === 'metadata') {
      const {sections, plugins, ...metadata} = props.siteContent;
      return metadata;
    }
    if (currentPath && currentPath.startsWith('plugin:')) {
      return props.siteContent.plugins[parseInt(currentPath.replace('plugin:', ''))];
    }
    if (currentPath && currentPath.startsWith('section:')) {
      return props.siteContent.sections[parseInt(currentPath.replace('section:', ''))];
    }
    return props.siteContent;
  }

  const onJsonUpdated = (json: object): void => {
    if (currentPath === undefined) {
      props.onSiteContentUpdated(json);
    } else if (currentPath && currentPath === 'metadata') {
      props.onSiteContentUpdated({...props.siteContent, ...json});
    } else if (currentPath && currentPath.startsWith('plugin:')) {
      props.siteContent.plugins[parseInt(currentPath.replace('plugin:', ''))] = json;
      props.onSiteContentUpdated(props.siteContent);
    } else if (currentPath && currentPath.startsWith('section:')) {
      props.siteContent.sections[parseInt(currentPath.replace('section:', ''))] = json;
      props.onSiteContentUpdated(props.siteContent);
    }
  }

  const onMoveSectionUpClicked = (sectionIndex: number): void => {
    if (sectionIndex === 0) {
      return;
    }
    var sectionsCopy = [...props.siteContent.sections];
    const section = sectionsCopy[sectionIndex];
    sectionsCopy.splice(sectionIndex, 1);
    sectionsCopy.splice(sectionIndex - 1, 0, section);
    props.onSiteContentUpdated({...props.siteContent, sections: sectionsCopy});
  }

  const onMoveSectionDownClicked = (sectionIndex: number): void => {
    if (sectionIndex === props.siteContent.length - 1) {
      return;
    }
    var sectionsCopy = [...props.siteContent.sections];
    const section = sectionsCopy[sectionIndex];
    sectionsCopy.splice(sectionIndex, 1);
    sectionsCopy.splice(sectionIndex + 1, 0, section);
    props.onSiteContentUpdated({...props.siteContent, sections: sectionsCopy});
  }

  const onDeleteSectionClicked = (sectionIndex: number): void => {

  }

  return (
    <Stack direction={Direction.Vertical} isFullHeight={true}>
      <HidingView isHidden={currentPath === undefined}>
        <Stack direction={Direction.Horizontal} isFullWidth={true} childAlignment={Alignment.Center} shouldAddGutters={true}>
          <Button text='Back' onClicked={onBackClicked} iconLeft={<KibaIcon iconId='ion-arrow-back'/>} />
          <Stack.Item growthFactor={1}>
            <Text>{currentPath}</Text>
          </Stack.Item>
        </Stack>
      </HidingView>
      <HidingView isHidden={currentPath !== undefined}>
        <TabBar isFullWidth={true} selectedTabKey={selectedTypeTabKey} onTabKeySelected={onTabKeySelected}>
          <TabBar.Item tabKey={TAB_KEY_FORM} text='Form' />
          <TabBar.Item tabKey={TAB_KEY_JSON} text='JSON' />
        </TabBar>
      </HidingView>
      <Stack.Item growthFactor={1} shrinkFactor={1}>
        <HidingView isHidden={selectedTypeTabKey !== TAB_KEY_FORM || currentPath !== undefined}>
          <BackgroundView color='$colors.background'>
            <Stack direction={Direction.Vertical} isScrollableVertically={true} paddingHorizontal={PaddingSize.Wide} shouldAddGutters={true}>
              <Spacing variant={PaddingSize.Wide} />
              {/* {currentPath && currentPath === 'metadata' && (
                <div>meta view goes here</div>
              )}
              {currentPath && currentPath.startsWith('plugin:') && (
                <div>{JSON.stringify(props.siteContent.plugins[parseInt(currentPath.replace('plugin:', ''))])}</div>
              )}
              {currentPath && currentPath.startsWith('section:') && (
                <div>{JSON.stringify(props.siteContent.sections[parseInt(currentPath.replace('section:', ''))])}</div>
              )} */}
              {/* {currentPath === undefined && (
                <React.Fragment> */}
                  <LinkBase isFullWidth={true} onClicked={onMetaClicked}>
                    <SiteMetaCard website={props.siteContent} />
                  </LinkBase>
                  <Stack.Item gutterBefore={PaddingSize.Wide}>
                    <Text variant='header3'>Plugins</Text>
                  </Stack.Item>
                  {(props.siteContent.plugins || []).map((plugin: IWebsitePlugin, index: number): React.ReactElement => (
                    <LinkBase key={plugin.id || `plugin-${index}`} isFullWidth={true} onClicked={() => onPluginClicked(index)}>
                      <SitePluginCard plugin={plugin} />
                    </LinkBase>
                  ))}
                  <Stack.Item gutterBefore={PaddingSize.Default}>
                    <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center}>
                      <Text variant='header3'>Sections</Text>
                      <Button text='Add' onClicked={props.onAddSectionClicked} />
                    </Stack>
                  </Stack.Item>
                  {(props.siteContent.sections || []).map((section: IWebsiteSection, index: number): React.ReactElement => (
                    <LinkBase key={section.id || `section-${index}`} isFullWidth={true} onClicked={() => onSectionClicked(index)}>
                      <SiteSectionCard
                        section={section}
                        onMoveUpClicked={(): void => onMoveSectionUpClicked(index)}
                        onMoveDownClicked={(): void => onMoveSectionDownClicked(index)}
                        onDeleteClicked={(): void => onDeleteSectionClicked(index)}
                      />
                    </LinkBase>
                  ))}
                {/* </React.Fragment>
              )} */}
              <Stack.Item growthFactor={1}>
                <Spacing variant={PaddingSize.Wide} />
              </Stack.Item>
            </Stack>
          </BackgroundView>
        </HidingView>
      </Stack.Item>
      <HidingView isHidden={currentPath !== undefined || selectedTypeTabKey !== TAB_KEY_JSON || !props.isEditable}>
        <Button text='Add section' onClicked={props.onAddSectionClicked} />
      </HidingView>
      <Stack.Item growthFactor={1}>
        {(currentPath !== undefined || selectedTypeTabKey === TAB_KEY_JSON) && (
          <JsonEditor isEditable={props.isEditable} name='site' json={getJsonFromPath()} onJsonUpdated={onJsonUpdated}/>
        )}
      </Stack.Item>
    </Stack>
  );
}

export const Canvas = (props: ICanvasProps): React.ReactElement => {
  const classes = useStyles();
  const [selectedEditorTabKey, setSelectedEditorTabKey] = React.useState<string>(TAB_KEY_CONTENT);
  const [isSectionChooserShowing, setIsSectionChooserShowing] = React.useState<boolean>(false);
  const [chosenSectionId, setChosenSectionId] = React.useState<string | undefined>(undefined);

  const onSiteContentUpdated = (parsedJson: object): void => {
    props.onSiteContentUpdated(parsedJson);
  }

  const onSiteThemeUpdated = (parsedJson: object): void => {
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

  const onEditorTabKeySelected = (tabKey: string) => {
    setSelectedEditorTabKey(tabKey);
  };

  const onAddSectionClicked = (): void => {
    setIsSectionChooserShowing(true);
  }

  const onNavigationChanged = (path: string): void => {
    if (!path) {
      setChosenSectionId(undefined);
    } else if (path === 'metadata') {
      setChosenSectionId('metadata');
    } else if (path.startsWith('plugin:')) {
      setChosenSectionId(undefined);
    } else if (path.startsWith('section:')) {
      const sectionIndex = parseInt(path.replace('section:', ''));
      const section = props.siteContent.sections[sectionIndex];
      // NOTE(krishan711): section id is set in indexPage if not provided. Can we make the link to this code explicit
      const sectionId = section.id || `section-${sectionIndex}`;
      setChosenSectionId(sectionId);
    }
  }

  const onChooseSectionClicked = (section: Section): void => {
    // TODO(krishan711): find a nicer way to create a deep clone
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
              <JsonEditor isEditable={props.isEditable} name='theme' json={props.siteTheme} onJsonUpdated={onSiteThemeUpdated}/>
            </MaterialBox>
            <MaterialBox className={classes.editor} display={selectedEditorTabKey === TAB_KEY_MEDIA ? 'flex' : 'none'}>
              {props.isEditable && <Dropzone onFilesChosen={onAssetFilesChosen} />}
              <FilePreviewGrid fileMap={props.assetFileMap} onDeleteClicked={props.deleteAssetFile}/>
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
  isMetaShown: true,
}

export const MemoCanvas = React.memo(Canvas, deepCompare);
