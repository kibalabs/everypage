import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

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
  card: {
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  disabledCard: {
    backgroundColor: '#eee',
  }
}));

interface ISiteCardProps {
  site: Site;
  isEnabled: boolean;
  onSiteClicked: (site: Site) => void;
}

export const SiteCard = (props: ISiteCardProps): React.ReactElement => {
  const classes = useStyles();

  const onSiteClicked = (): void => {
    props.onSiteClicked(props.site);
  }

  return (
    <Card className={props.isEnabled ? classes.card : classes.disabledCard}>
      <CardActionArea className={classes.siteCardButtonBase} onClick={onSiteClicked} disabled={!props.isEnabled}>
        <CardMedia
          className={classes.media}
          image={`https://${props.site.slug}.evrpg.com/screenshot-preview.png`}
          title={props.site.name}
        />
        <CardContent className={classes.siteCardContent}>
          <Typography variant='h6' className={classes.siteNameText}>
            {props.site.name}
          </Typography>
          <Typography color='textSecondary'>
            {props.site.slug}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
SiteCard.defaultProps = {
  isEnabled: true,
}
