import React from 'react';
import { useHistory } from '@kibalabs/core-react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';

import { Site } from '../everypageClient/resources';

const useStyles = makeStyles((theme) => ({
  siteCardButtonBase: {
    width: '100%',
  },
  siteCardContent: {
    width: '100%',
  },
  siteNameText: {
    fontWeight: 'bold',
  },
}));

interface ISiteCardProps {
  site: Site;
  onSiteClicked: (site: Site) => void;
}

export const SiteCard = (props: ISiteCardProps): React.ReactElement => {
  const classes = useStyles();

  const onSiteClicked = (): void => {
    props.onSiteClicked(props.site);
  }

  return (
    <Card>
      <ButtonBase className={classes.siteCardButtonBase} onClick={onSiteClicked}>
        <CardContent className={classes.siteCardContent}>
          <Typography variant='h6' className={classes.siteNameText}>
            {props.site.name}
          </Typography>
          <Typography color='textSecondary'>
            {props.site.slug}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
}
