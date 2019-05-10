import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  avatar: {
    margin: 'auto',
    backgroundColor: theme.palette.secondary.main,
  },
  pitch: {
    marginTop: 8,
    align: 'center',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 60,
    width: 500,
    height: 100,
  },
  button: {
    marginTop: 30,
  },
  appBar: {
    position: 'relative',
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 1050,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 4}px`,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  grid: {
    wrap: 'nowrap',
  },
});

function FrontPage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Coffee & Pi
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div />
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Grid container spacing={40}>
              <Grid item>
                <Paper className={classes.paper} elevation={3}>
                  <Typography variant="h5" component="h3" align="center">
                    Vilka är vi?
                  </Typography>
                  <Typography
                    className={classes.pitch}
                    component="p"
                    align="left"
                  >
                    Projekt ‘Coffee & Pi’ är ett projektarbete inom kursen
                    II1302 Projekt och Projektmetoder. Projektuppgiften är att
                    samla in data för ett godtyckligt objektflöde, för att lösa
                    bristen på data kring flöden. Ett exempel på applicering
                    skulle kunna vara att mäta tillströmningen av människor i en
                    cafeteria.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper} elevation={3}>
                  <Avatar className={classes.avatar} align="center">
                    <LockOutlinedIcon />
                  </Avatar>
                  <Button
                    onClick={() => {
                      window.location.href = 'http://localhost:3000/auth';
                    }}
                    className={classes.button}
                    variant="contained"
                    color="default"
                    fullWidth="true"
                  >
                    Logga in
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
        </div>
      </main>
    </React.Fragment>
  );
}

FrontPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FrontPage);
