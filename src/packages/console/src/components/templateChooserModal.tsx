import React from 'react';

import { useInitialization } from '@kibalabs/core-react';
import { Alignment, Box, Button, Dialog, Direction, Grid, IconButton, Image, KibaIcon, List, ListItem, LoadingSpinner, PaddingSize, Stack, Text } from '@kibalabs/ui-react';

import { Template, TemplateCategory } from '../everypageClient';
import { useGlobals } from '../globalsContext';

export interface ITemplateChooserModalProps {
  isOpen: boolean;
  onCloseClicked?: () => void;
  onChooseTemplateClicked: (template: Template) => void;
}

// TODO(krishan711): currently the whole dialog is scrollable but ideally the two lists scroll independently.
// NOTE(krishan711): had some luck by setting display:flex on the outermost box (in dialog) for the above, but doesn't fix entirely
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

  const onTemplateCategoryClicked = (templateCategoryId: string) => {
    setSelectedTemplateCategoryId(parseInt(templateCategoryId, 10));
  };

  const onChooseTemplateClicked = (itemKey: string) => {
    const selectedTemplate = templates.filter((template) => String(template.templateId) === itemKey)[0];
    props.onChooseTemplateClicked(selectedTemplate);
  };

  const onCloseClicked = () => {
    if (props.onCloseClicked) {
      props.onCloseClicked();
    }
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      maxWidth='75%'
      maxHeight='90%'
      onCloseClicked={onCloseClicked}
    >
      <Stack direction={Direction.Vertical} isFullWidth={true} shouldAddGutters={true}>
        <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Fill} childAlignment={Alignment.Center}>
          <Text variant='header3'>Choose a template</Text>
          {props.onCloseClicked && (
            <IconButton icon={<KibaIcon iconId='ion-close' />} onClicked={onCloseClicked} />
          )}
        </Stack>
        <Stack.Item growthFactor={1} shrinkFactor={1}>
          <Grid shouldAddGutters={true} isFullHeight={true}>
            <Grid.Item size={3}>
              {templateCategories === null ? (
                <Text>Failed to load template categories. Please try again later.</Text>
              ) : templateCategories === undefined ? (
                <LoadingSpinner />
              ) : (
                <List onItemClicked={onTemplateCategoryClicked}>
                  {templateCategories.map((templateCategory: TemplateCategory): React.ReactElement => {
                    return (
                      <ListItem key={templateCategory.templateCategoryId} itemKey={String(templateCategory.templateCategoryId)}>
                        <Text>{templateCategory.name}</Text>
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </Grid.Item>
            <Grid.Item size={9}>
              {templates === null ? (
                <Text>Failed to load templates. Please try again later.</Text>
              ) : templates === undefined ? (
                <LoadingSpinner />
              ) : templates.length === 0
                ? <LoadingSpinner />
                : (
                  <List onItemClicked={(itemKey: string): void => onChooseTemplateClicked(itemKey)}>
                    {templates.map((template: Template): React.ReactElement => (
                      <ListItem key={template.templateId} itemKey={String(template.templateId)}>
                        <Stack direction={Direction.Horizontal} isFullWidth={true} childAlignment={Alignment.Start} shouldAddGutters={true} defaultGutter={PaddingSize.Wide} paddingVertical={PaddingSize.Wide}>
                          <Box width='100px'>
                            <Image isFullWidth={true} source={template.imageUrl} alternativeText={`${template.name} preview image`} />
                          </Box>
                          <Stack.Item growthFactor={1} shrinkFactor={1}>
                            <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Default} contentAlignment={Alignment.Start}>
                              <Text variant='header6'>{template.name}</Text>
                              <Text variant='light'>{template.description}</Text>
                            </Stack>
                          </Stack.Item>
                          <Button
                            variant='primary'
                            targetShouldOpenSameTab={false}
                            target={template.previewUrl}
                            text='Preview'
                          />
                        </Stack>
                      </ListItem>
                    ))}
                  </List>
                )}
            </Grid.Item>
          </Grid>
        </Stack.Item>
      </Stack>
    </Dialog>
  );
};
