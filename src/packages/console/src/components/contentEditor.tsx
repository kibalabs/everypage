import React from 'react';

import { IWebsite, IWebsitePlugin, IWebsiteSection } from '@kibalabs/everypage';
import { getMetaFromWebsite } from '@kibalabs/everypage/src/model/website';
import { Alignment, BackgroundView, Box, Button, Direction, HidingView, KibaIcon, LinkBase, PaddingSize, Spacing, Stack, TabBar, Text } from '@kibalabs/ui-react';

import { JsonEditor } from './jsonEditor';
import { SiteMetaCard } from './siteMetaCard';
import { SitePluginCard } from './sitePluginCard';
import { SiteSectionCard } from './siteSectionCard';

const TAB_KEY_FORM = 'form';
const TAB_KEY_JSON = 'json';

interface IContentEditorProps {
  isEditable: boolean;
  siteContent: IWebsite;
  className?: string;
  onAddSectionClicked: () => void;
  onNavigationChanged: (path: string) => void;
  onSiteContentUpdated: (siteContent: IWebsite) => void;
}

export const ContentEditor = (props: IContentEditorProps): React.ReactElement => {
  const [selectedTypeTabKey, setSelectedTypeTabKey] = React.useState<string>(TAB_KEY_FORM);
  const [currentPath, setCurrentPath] = React.useState<string | undefined>(undefined);
  const siteContentRef = React.useRef<IWebsite | undefined>(props.siteContent);
  siteContentRef.current = props.siteContent;

  const onTabKeySelected = (tabKey: string): void => {
    setSelectedTypeTabKey(tabKey);
  };

  const onMetaClicked = React.useCallback((): void => {
    setCurrentPath('metadata');
  }, []);

  const onBackClicked = (): void => {
    setCurrentPath(undefined);
  };

  const onPluginClicked = (index: number): void => {
    setCurrentPath(`plugin:${index}`);
  };

  const onSectionClicked = (index: number): void => {
    setCurrentPath(`section:${index}`);
  };

  React.useEffect((): void => {
    props.onNavigationChanged(currentPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onNavigationChanged, currentPath]);

  const getJsonFromPath = (): Record<string, unknown> => {
    if (currentPath && currentPath === 'metadata') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sections, plugins, ...metadata } = props.siteContent;
      return metadata;
    }
    if (currentPath && currentPath.startsWith('plugin:')) {
      return props.siteContent.plugins[parseInt(currentPath.replace('plugin:', ''), 10)];
    }
    if (currentPath && currentPath.startsWith('section:')) {
      return props.siteContent.sections[parseInt(currentPath.replace('section:', ''), 10)];
    }
    return props.siteContent;
  };

  const onJsonUpdated = (json: Record<string, unknown>): void => {
    if (!currentPath) {
      props.onSiteContentUpdated(json);
    } else if (currentPath === 'metadata') {
      props.onSiteContentUpdated({ ...props.siteContent, ...json });
    } else if (currentPath.startsWith('plugin:')) {
      // eslint-disable-next-line no-param-reassign
      props.siteContent.plugins[parseInt(currentPath.replace('plugin:', ''), 10)] = json;
      props.onSiteContentUpdated({ ...props.siteContent });
    } else if (currentPath.startsWith('section:')) {
      // eslint-disable-next-line no-param-reassign
      props.siteContent.sections[parseInt(currentPath.replace('section:', ''), 10)] = json;
      props.onSiteContentUpdated({ ...props.siteContent });
    }
  };

  const onMoveSectionUpClicked = React.useCallback((sectionIndex: number): void => {
    if (sectionIndex === 0) {
      return;
    }
    const onSiteContentUpdated = props.onSiteContentUpdated;
    const sectionsCopy = [...siteContentRef.current.sections];
    const section = sectionsCopy[sectionIndex];
    sectionsCopy.splice(sectionIndex, 1);
    sectionsCopy.splice(sectionIndex - 1, 0, section);
    onSiteContentUpdated({ ...siteContentRef.current, sections: sectionsCopy });
  }, [props.onSiteContentUpdated]);

  const onMoveSectionDownClicked = React.useCallback((sectionIndex: number): void => {
    if (sectionIndex === siteContentRef.current.length - 1) {
      return;
    }
    const onSiteContentUpdated = props.onSiteContentUpdated;
    const sectionsCopy = [...siteContentRef.current.sections];
    const section = sectionsCopy[sectionIndex];
    sectionsCopy.splice(sectionIndex, 1);
    sectionsCopy.splice(sectionIndex + 1, 0, section);
    onSiteContentUpdated({ ...siteContentRef.current, sections: sectionsCopy });
  }, [props.onSiteContentUpdated]);

  const onDeleteSectionClicked = React.useCallback((sectionIndex: number): void => {
    if (sectionIndex === siteContentRef.current.length - 1) {
      return;
    }
    const onSiteContentUpdated = props.onSiteContentUpdated;
    const sectionsCopy = [...siteContentRef.current.sections];
    sectionsCopy.splice(sectionIndex, 1);
    onSiteContentUpdated({ ...siteContentRef.current, sections: sectionsCopy });
  }, [props.onSiteContentUpdated]);

  return (
    <Stack id='content-editor' className={props.className} direction={Direction.Vertical}>
      <HidingView isHidden={currentPath === undefined}>
        <Stack direction={Direction.Horizontal} isFullWidth={true} childAlignment={Alignment.Center} shouldAddGutters={true}>
          <Button text='Back' onClicked={onBackClicked} iconLeft={<KibaIcon iconId='ion-arrow-back' />} />
          <Stack.Item growthFactor={1} shrinkFactor={1}>
            <Text>{currentPath}</Text>
          </Stack.Item>
        </Stack>
      </HidingView>
      <HidingView isHidden={currentPath !== undefined}>
        <TabBar isFullWidth={true} selectedTabKey={selectedTypeTabKey} onTabKeySelected={onTabKeySelected}>
          <TabBar.Item tabKey={TAB_KEY_FORM} text='Form' isEnabled={true} isCollapsible={false} isExpandable={true} />
          <TabBar.Item tabKey={TAB_KEY_JSON} text='JSON' isEnabled={true} isCollapsible={false} isExpandable={true} />
        </TabBar>
      </HidingView>
      <Stack.Item growthFactor={1} shrinkFactor={1}>
        <HidingView isHidden={selectedTypeTabKey !== TAB_KEY_FORM || currentPath !== undefined}>
          <BackgroundView color='$colors.background'>
            <Box isFullHeight={true} isFullWidth={true}>
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
                <SiteMetaCard website={getMetaFromWebsite(props.siteContent)} />
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
                    cardIndex={index}
                    onMoveUpClicked={onMoveSectionUpClicked}
                    onMoveDownClicked={onMoveSectionDownClicked}
                    onDeleteClicked={onDeleteSectionClicked}
                  />
                </LinkBase>
              ))}
              <Stack.Item growthFactor={1} shrinkFactor={1}>
                <Spacing variant={PaddingSize.Wide} />
              </Stack.Item>
            </Stack>
            </Box>
          </BackgroundView>
        </HidingView>
      </Stack.Item>
      <HidingView isHidden={currentPath !== undefined || selectedTypeTabKey !== TAB_KEY_JSON || !props.isEditable}>
        <Button text='Add section' onClicked={props.onAddSectionClicked} />
      </HidingView>
      <Stack.Item growthFactor={1} shrinkFactor={1}>
        {(selectedTypeTabKey === TAB_KEY_JSON || currentPath !== undefined) && (
          <JsonEditor isEditable={props.isEditable} name='site' json={getJsonFromPath()} onJsonUpdated={onJsonUpdated} />
        )}
      </Stack.Item>
    </Stack>
  );
};
