import React from 'react';

import { useInitialization } from '@kibalabs/core-react';
import { Alignment, Box, Button, Direction, LoadingSpinner, PaddingSize, Stack, Text } from '@kibalabs/ui-react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import { Section, SectionCategory } from '../everypageClient';
import { useGlobals } from '../globalsContext';
import { Dialog } from './dialog';

const OTHER_SECTION_CATEGORY_ID = 1;

export interface ISectionChooserModalProps {
  isOpen: boolean;
  onChooseSectionClicked: (section: Section) => void;
}

export const SectionChooserModal = (props: ISectionChooserModalProps): React.ReactElement => {
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
      onCloseClicked={() => false}
    >
      <Stack direction={Direction.Vertical} paddingVertical={PaddingSize.Wide}>
        <Text variant='header5'>Choose a section</Text>
        {sectionCategories === null ? (
          <Text>Failed to load sections. Please try again later.</Text>
        ) : sectionCategories === undefined ? (
          <LoadingSpinner />
        ) : (
          <Stack direction={Direction.Horizontal} isFullWidth={false}>
            <Box maxWidth='300px'>
              <List>
                {sectionCategories.map((sectionCategory: SectionCategory): React.ReactElement => {
                  return (
                    <ListItem
                      key={sectionCategory.sectionCategoryId}
                      button={true}
                      selected={selectedSectionCategoryId === sectionCategory.sectionCategoryId}
                      onClick={(): void => onSectionCategoryClicked(sectionCategory)}
                    >
                      <ListItemText primary={sectionCategory.name} />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
            {sections === null ? (
              <Text>Failed to load sections. Please try again later.</Text>
            ) : sections === undefined ? (
              <LoadingSpinner />
            ) : (
              <List>
                {sections.map((section: Section): React.ReactElement => {
                  return (
                    <ListItem key={section.sectionId} divider={true}>
                      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
                        <ListItemAvatar>
                          <img width='100px' src={section.previewImageUrl} />
                        </ListItemAvatar>
                        <Box maxWidth='340px'>
                          <ListItemText
                            primary={section.name}
                            secondary={section.description}
                          />
                        </Box>
                        <Button
                          variant='secondary'
                          onClicked={(): void => onChooseSectionClicked(section)}
                          text='Choose'
                        />
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
