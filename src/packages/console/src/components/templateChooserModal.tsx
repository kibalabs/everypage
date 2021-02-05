import React from 'react';

import { useInitialization } from '@kibalabs/core-react';
import { Alignment, Button, Direction, LoadingSpinner, PaddingSize, Stack, Text, Grid } from '@kibalabs/ui-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { Template, TemplateCategory } from '../everypageClient';
import { useGlobals } from '../globalsContext';
import { Dialog } from './dialog';

export interface ITemplateChooserModalProps {
  isOpen: boolean;
  onCloseClicked: () => void;
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

  const onCloseClicked = () => {
    props.onCloseClicked();
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      maxWidth='75%'
      maxHeight='90%'
      onCloseClicked={props.onCloseClicked}
    >
      <Stack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true} shouldAddGutters={true}>
        <Text variant='header3'>Choose a template</Text>
        {templateCategories === null ? (
          <Text>Failed to load template categories. Please try again later.</Text>
        ) : templateCategories === undefined ? (
          <LoadingSpinner />
        ) : (
          <Grid shouldAddGutters={true} isFullHeight={true}>
            <Grid.Item size={3} isFullHeight={true}>
              {/* TODO(krishan711): this should be a list */}
              <Stack direction={Direction.Vertical} isScrollableVertically={true} isFullHeight={true}>
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
              </Stack>
            </Grid.Item>
            <Grid.Item size={9} isFullHeight={true}>
              {/* TODO(krishan711): this should be a list */}
              <Stack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true} isScrollableVertically={true}>
                {templates === null ? (
                  <Text>Failed to load templates. Please try again later.</Text>
                ) : templates === undefined ? (
                  <LoadingSpinner />
                ) : (
                  templates.map((template: Template): React.ReactElement => (
                    <Stack key={template.templateId} direction={Direction.Horizontal} isFullWidth={false} shouldAddGutters={true} defaultGutter={PaddingSize.Wide} paddingVertical={PaddingSize.Wide}>
                      <ListItemAvatar>
                        <img width='100px' src={template.imageUrl} />
                      </ListItemAvatar>
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Default} contentAlignment={Alignment.Start}>
                          <Text variant='header6'>{template.name}</Text>
                          <Text variant='light'>{template.description}</Text>
                        </Stack>
                      </Stack.Item>
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
                  ))
                )}
              </Stack>
            </Grid.Item>
          </Grid>
        )}
      </Stack>
    </Dialog>
  );
};
