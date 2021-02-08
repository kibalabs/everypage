import React from 'react';

import { useInitialization } from '@kibalabs/core-react';
import { Alignment, Box, Button, Direction, Grid, IconButton, Image, KibaIcon, LoadingSpinner, PaddingSize, Stack, Text } from '@kibalabs/ui-react';
import ListItem from '@material-ui/core/ListItem';

import { Section, SectionCategory } from '../everypageClient';
import { useGlobals } from '../globalsContext';
import { Dialog } from './dialog';

const OTHER_SECTION_CATEGORY_ID = 1;

export interface ISectionChooserDialogProps {
  isOpen: boolean;
  onCloseClicked?: () => void;
  onChooseSectionClicked: (section: Section) => void;
}

export const SectionChooserDialog = (props: ISectionChooserDialogProps): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const [sectionCategories, setSectionCategories] = React.useState<SectionCategory[] | undefined>(undefined);
  const [selectedSectionCategoryId, setSelectedSectionCategoryId] = React.useState<number | undefined>(undefined);
  const [sections, setSections] = React.useState<Section[] | undefined>(undefined);

  useInitialization((): void => {
    everypageClient.listSectionCategories().then((receivedSectionCategories: SectionCategory[]) => {
      const orderedSectionCategories = receivedSectionCategories.filter((sectionCategory: SectionCategory): boolean => sectionCategory.sectionCategoryId !== OTHER_SECTION_CATEGORY_ID);
      orderedSectionCategories.push(receivedSectionCategories.find((sectionCategory: SectionCategory): boolean => sectionCategory.sectionCategoryId === OTHER_SECTION_CATEGORY_ID));
      setSectionCategories(orderedSectionCategories);
      setSelectedSectionCategoryId(orderedSectionCategories[0].sectionCategoryId);
    }).catch((error: Error): void => {
      console.error('error', error);
      setSectionCategories(null);
    });
  });

  React.useEffect((): void => {
    everypageClient.listSections(selectedSectionCategoryId).then((receivedSections: Section[]) => {
      setSections(receivedSections);
    }).catch((error: Error): void => {
      console.error('error', error);
      setSections(null);
    });
  }, [everypageClient, selectedSectionCategoryId]);

  const onCloseClicked = () => {
    if (props.onCloseClicked) {
      props.onCloseClicked();
    }
  };

  const onSectionCategoryClicked = (sectionCategory: SectionCategory) => {
    setSections(undefined);
    setSelectedSectionCategoryId(sectionCategory.sectionCategoryId);
  };

  const onChooseSectionClicked = (section: Section) => {
    props.onChooseSectionClicked(section);
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      maxWidth='75%'
      maxHeight='75%'
      onCloseClicked={onCloseClicked}
    >
      <Stack direction={Direction.Vertical} isFullWidth={true} shouldAddGutters={true}>
        <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Fill} childAlignment={Alignment.Center}>
          <Text variant='header3'>Choose a section</Text>
          {props.onCloseClicked && (
            <IconButton icon={<KibaIcon iconId='ion-close' />} onClicked={onCloseClicked} />
          )}
        </Stack>
        <Stack.Item growthFactor={1} shrinkFactor={1}>
          <Grid shouldAddGutters={true} isFullHeight={true}>
            <Grid.Item size={3}>
              {sectionCategories === null ? (
                <Text>Failed to load sections. Please try again later.</Text>
              ) : sectionCategories === undefined ? (
                <LoadingSpinner />
              ) : (
                <Stack direction={Direction.Vertical} isScrollableVertically={true} isFullHeight={true}>
                  {sectionCategories.map((sectionCategory: SectionCategory): React.ReactElement => {
                    return (
                      <ListItem
                        key={sectionCategory.sectionCategoryId}
                        button={true}
                        selected={selectedSectionCategoryId === sectionCategory.sectionCategoryId}
                        onClick={(): void => onSectionCategoryClicked(sectionCategory)}
                      >
                        <Text>{sectionCategory.name}</Text>
                      </ListItem>
                    );
                  })}
                </Stack>
              )}
            </Grid.Item>
            <Grid.Item size={9}>
              {sections === null ? (
                <Text>Failed to load sections. Please try again later.</Text>
              ) : sections === undefined ? (
                <LoadingSpinner />
              ) : (
                <Stack direction={Direction.Vertical} isFullHeight={false} isFullWidth={true} isScrollableVertically={true}>
                  {sections.map((section: Section): React.ReactElement => (
                    <Stack key={section.sectionId} childAlignment={Alignment.Center} direction={Direction.Horizontal} isFullHeight={false} isFullWidth={false} shouldAddGutters={true} defaultGutter={PaddingSize.Wide} paddingVertical={PaddingSize.Wide}>
                      <Box width='100px'>
                        <Image isFullWidth={true} source={section.previewImageUrl} alternativeText={`${section.name} preview image`} />
                      </Box>
                      <Stack.Item growthFactor={1} shrinkFactor={1}>
                        <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Default} contentAlignment={Alignment.Start}>
                          <Text variant='header6'>{section.name}</Text>
                          <Text variant='light'>{section.description}</Text>
                        </Stack>
                      </Stack.Item>
                      <Button
                        variant='secondary'
                        onClicked={(): void => onChooseSectionClicked(section)}
                        text='Choose'
                      />
                    </Stack>
                  ))}
                </Stack>
              )}
            </Grid.Item>
          </Grid>
        </Stack.Item>
      </Stack>
    </Dialog>
  );
};
