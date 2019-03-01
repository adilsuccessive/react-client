import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import theme from '../../theme';
import trainees from './data/trainee';
import { NotFound } from '../NotFound';

const styles = {
  card: {
    display: 'flex',
    minWidth: 275,
    margin: theme.spacing.unit * 2,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    width: 175,
    height: 175,
  },
};

class TraineeDetail extends Component {
  traineeMatch = (arr) => {
    const { match } = this.props;
    const data = arr.find(trainee => (match.params.id === trainee.id));
    if (data !== null) {
      return data;
    }
    return false;
  }

  getDateFormatted = date => (moment(date).format('dddd MMMM Do YYYY, h:mm:ss a'))

  render() {
    const { classes } = this.props;
    const user = this.traineeMatch(trainees);
    return (
      (user)
        ? (
          <>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                title="Contemplative Reptile"
              />
              <div className={classes.details}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography gutterBottom>
                    <p>{this.getDateFormatted(user.createdAt)}</p>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {user.email}
                  </Typography>
                </CardContent>
              </div>
            </Card>
            <Link component={RouterLink} to="/trainee" color="inherit" underline="none">
              <div align="center"><Button variant="outlined" color="inherit" disableRipple>Back</Button></div>
            </Link>
          </>
        )
        : <NotFound />

    );
  }
}

TraineeDetail.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(TraineeDetail);
