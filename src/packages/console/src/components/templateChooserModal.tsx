import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import { useHistory, useInitialization } from '@kibalabs/core-react';

import { useGlobals } from '../globalsContext';
import { Template, TemplateCategory } from '../everypageClient';

const useStyles = makeStyles((theme) => ({
  modal: {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
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
  templateList: {
    minWidth: '300px',
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'auto',
  },
  templateImage: {
    maxHeight: '100px',
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
  templateListItem: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  templateContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  templateButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(1),
    width: '100%',
    justifyContent: 'flex-end',
  },
  templateButton: {
    margin: theme.spacing(0, 1),
  },
}));

export interface ITemplateChooserModalProps {
  isOpen: boolean;
  onChooseTemplateClicked: (template: Template) => void;
}

export const TemplateChooserModal = (props: ITemplateChooserModalProps) => {
  const classes = useStyles();
  const { everypageClient } = useGlobals();
  const [templateCategories, setTemplateCategories] = React.useState<TemplateCategory[] | undefined>(undefined);
  const [selectedTemplateCategoryId, setSelectedTemplateCategoryId] = React.useState<number | undefined>(undefined);
  const [templates, setTemplates] = React.useState<Template[] | undefined>(undefined);

  useInitialization((): void => {
    everypageClient.listTemplateCategories().then((templateCategories: TemplateCategory[]) => {
      setTemplateCategories(templateCategories);
      setSelectedTemplateCategoryId(templateCategories[0].templateCategoryId);
    }).catch((error: Error): void => {
      console.error('error', error);
      setTemplateCategories(null);
    });
  });

  React.useEffect((): void => {
    everypageClient.listTemplates(selectedTemplateCategoryId).then((templates: Template[]) => {
      setTemplates(templates);
    }).catch((error: Error): void => {
      console.error('error', error);
      setTemplates(null);
    });
  }, [selectedTemplateCategoryId]);

  const onTemplateCategoryClicked = (templateCategory: TemplateCategory) => {
    setTemplates(undefined);
    setSelectedTemplateCategoryId(templateCategory.templateCategoryId);
  };

  const onChooseTemplateClicked = (template: Template) => {
    props.onChooseTemplateClicked(template);
  };

  return (
    <Modal
      open={props.isOpen}
    >
      <div className={classes.modal}>
        <Typography variant='h5' className={classes.titleText}>Choose a template</Typography>
        {templateCategories === null ? (
          <Typography className={classes.errorMessage}>Failed to load templates. Please try again later.</Typography>
        ) : templateCategories === undefined ? (
          <CircularProgress className={classes.loadingSpinner}/>
        ) : (
          <div className={classes.modalContent}>
            <List className={classes.categoryList}>
            {templateCategories.map((templateCategory: TemplateCategory): React.ReactElement => {
                return (
                  <ListItem
                    key={templateCategory.templateCategoryId}
                    button={true}
                    selected={selectedTemplateCategoryId === templateCategory.templateCategoryId}
                    onClick={(): void => onTemplateCategoryClicked(templateCategory)}
                  >
                    <ListItemText primary={templateCategory.name} />
                  </ListItem>
                );
              })}
            </List>
            {templates === null ? (
              <Typography className={classes.errorMessage}>Failed to load templates. Please try again later.</Typography>
            ) : templates === undefined ? (
              <CircularProgress className={classes.loadingSpinner} />
            ) : (
              <List className={classes.templateList}>
                {templates.map((template: Template): React.ReactElement => {
                  return (
                    <ListItem key={template.templateId} className={classes.templateListItem} divider={true}>
                      <ListItemAvatar>
                        <img className={classes.templateImage} src={template.imageUrl} />
                      </ListItemAvatar>
                      <div className={classes.templateContent}>
                        <ListItemText
                          primary={template.name}
                          secondary={template.description}
                        />
                        <div className={classes.templateButtons}>
                          <Button
                            color='primary'
                            className={classes.templateButton}
                            target='_blank'
                            href={template.previewUrl}
                          >Preview</Button>
                          <Button
                            variant='outlined'
                            color='primary'
                            className={classes.templateButton}
                            onClick={(): void => onChooseTemplateClicked(template)}
                          >Choose</Button>
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
}
