import React from 'react';

import { useInitialization } from '@kibalabs/core-react';
import { Alignment, Box, Button, Direction, LoadingSpinner, PaddingSize, ResponsiveContainingView, Stack, Text } from '@kibalabs/ui-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';

import { Template, TemplateCategory } from '../everypageClient';
import { useGlobals } from '../globalsContext';
import { Dialog } from './dialog';

export interface ITemplateChooserModalProps {
  isOpen: boolean;
  onChooseTemplateClicked: (template: Template) => void;
}

export const TemplateChooserModal = (props: ITemplateChooserModalProps): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const [templateCategories, setTemplateCategories] = React.useState<TemplateCategory[] | undefined>(undefined);
  const [selectedTemplateCategoryId, setSelectedTemplateCategoryId] = React.useState<number | undefined>(undefined);
  const [templates, setTemplates] = React.useState<Template[] | undefined>(undefined);

  useInitialization((): void => {
    everypageClient.listTemplateCategories().then((receivedTemplateCategories: TemplateCategory[]) => {
      setTemplateCategories(receivedTemplateCategories);
      setSelectedTemplateCategoryId(receivedTemplateCategories[0].templateCategoryId);
    }).catch((error: Error): void => {
      console.error('error', error);
      setTemplateCategories(null);
    });
  });

  React.useEffect((): void => {
    everypageClient.listTemplates(selectedTemplateCategoryId).then((receivedTemplates: Template[]) => {
      setTemplates(receivedTemplates);
    }).catch((error: Error): void => {
      console.error('error', error);
      setTemplates(null);
    });
  }, [everypageClient, selectedTemplateCategoryId]);

  const onTemplateCategoryClicked = (templateCategory: TemplateCategory) => {
    setTemplates(undefined);
    setSelectedTemplateCategoryId(templateCategory.templateCategoryId);
  };

  const onChooseTemplateClicked = (template: Template) => {
    props.onChooseTemplateClicked(template);
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      maxWidth='75%'
      onCloseClicked={() => false}
    >
      <Stack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true} paddingVertical={PaddingSize.Wide}>
        <Text variant='header5'>Choose a template</Text>
        {templateCategories === null ? (
          <Text>Failed to load templates. Please try again later.</Text>
        ) : templateCategories === undefined ? (
          <LoadingSpinner />
        ) : (
          <Stack direction={Direction.Horizontal} isFullWidth={true}>
            <ResponsiveContainingView size={2}>
              <List>
                {templateCategories.map((templateCategory: TemplateCategory): React.ReactElement => {
                  return (
                    <ListItem
                      key={templateCategory.templateCategoryId}
                      button={true}
                      selected={selectedTemplateCategoryId === templateCategory.templateCategoryId}
                      onClick={(): void => onTemplateCategoryClicked(templateCategory)}
                    >
                      <Text>{templateCategory.name}</Text>
                    </ListItem>
                  );
                })}
              </List>
              </ResponsiveContainingView>
            {templates === null ? (
              <Text>Failed to load templates. Please try again later.</Text>
            ) : templates === undefined ? (
              <LoadingSpinner />
            ) : (
              <List>
                {templates.map((template: Template): React.ReactElement => {
                  return (
                    <ListItem key={template.templateId} divider={true}>
                      <Stack direction={Direction.Horizontal} isFullWidth={false} childAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
                        <ListItemAvatar>
                          <img width='100px' src={template.imageUrl} />
                        </ListItemAvatar>
                        <ResponsiveContainingView size={4}>
                          <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Default} contentAlignment={Alignment.Start}>
                            <Text variant='header6'>{template.name}</Text>
                            <Text variant='light'>{template.description}</Text>
                          </Stack>
                        </ResponsiveContainingView>
                        <Stack direction={Direction.Horizontal} shouldAddGutters={true} defaultGutter={PaddingSize.Wide} contentAlignment={Alignment.End} childAlignment={Alignment.End}>
                          <Button
                            variant='primary'
                            targetShouldOpenSameTab={false}
                            target={template.previewUrl}
                            text='Preview'
                          />
                          <Button
                            variant='secondary'
                            onClicked={(): void => onChooseTemplateClicked(template)}
                            text='Choose'
                          />
                        </Stack>
                      </Stack>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Stack>
        )}
      </Stack>
    </Dialog>
  );
};
