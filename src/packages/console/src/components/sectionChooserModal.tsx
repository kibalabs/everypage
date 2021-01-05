import React from 'react';

import { useInitialization } from '@kibalabs/core-react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Section, SectionCategory } from '../everypageClient';
import { useGlobals } from '../globalsContext';

const useStyles = makeStyles((theme) => ({
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: '85%',
    maxWidth: '850px',
    maxHeight: '85%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '500px',
    flexGrow: 0,
    flexShrink: 1,
  },
  titleText: {
    padding: theme.spacing(3),
  },
  loadingSpinner: {
    margin: theme.spacing(3),
  },
  errorMessage: {
    margin: theme.spacing(3),
  },
  categoryList: {
    width: '300px',
    overflow: 'auto',
  },
  sectionList: {
    minWidth: '300px',
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'auto',
  },
  sectionImage: {
    maxHeight: '100px',
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
  sectionListItem: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  sectionContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  sectionButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(1),
    width: '100%',
    justifyContent: 'flex-end',
  },
  sectionButton: {
    margin: theme.spacing(0, 1),
  },
}));

const OTHER_SECTION_CATEGORY_ID = 1;

export interface ISectionChooserModalProps {
  isOpen: boolean;
  onChooseSectionClicked: (section: Section) => void;
}

export const SectionChooserModal = (props: ISectionChooserModalProps): React.ReactElement => {
  const classes = useStyles();
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
    <Modal
      open={props.isOpen}
    >
      <div className={classes.modal}>
        <Typography variant='h5' className={classes.titleText}>Choose a section</Typography>
        {sectionCategories === null ? (
          <Typography className={classes.errorMessage}>Failed to load sections. Please try again later.</Typography>
        ) : sectionCategories === undefined ? (
          <CircularProgress className={classes.loadingSpinner} />
        ) : (
          <div className={classes.modalContent}>
            <List className={classes.categoryList}>
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
            {sections === null ? (
              <Typography className={classes.errorMessage}>Failed to load sections. Please try again later.</Typography>
            ) : sections === undefined ? (
              <CircularProgress className={classes.loadingSpinner} />
            ) : (
              <List className={classes.sectionList}>
                {sections.map((section: Section): React.ReactElement => {
                  return (
                    <ListItem key={section.sectionId} className={classes.sectionListItem} divider={true}>
                      <ListItemAvatar>
                        <img className={classes.sectionImage} src={section.previewImageUrl} />
                      </ListItemAvatar>
                      <div className={classes.sectionContent}>
                        <ListItemText
                          primary={section.name}
                          secondary={section.description}
                        />
                        <div className={classes.sectionButtons}>
                          <Button
                            variant='outlined'
                            color='primary'
                            className={classes.sectionButton}
                            onClick={(): void => onChooseSectionClicked(section)}
                          >
Choose
                          </Button>
                        </div>
                      </div>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
