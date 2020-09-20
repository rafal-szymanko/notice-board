import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUserStatus } from '../../../redux/postsRedux';

import styles from './Header.module.scss';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const Component = ({className, status}) => {
  
  const classes = useStyles();

  const renderButtons = () => {
    if(status) {
      return (
        <div className={styles.buttonsContainer}>
          <NavLink to='/user-posts'>
            <Button
              variant="contained"
              color="default"
              startIcon={<LocalOfferIcon />}
              className={classes.button}
            >
            Your advertisement
            </Button>
          </NavLink>
          <NavLink to='/auth/logout'>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ExitToAppIcon />}
              className={classes.button}
            >
            Logout
            </Button>
          </NavLink>
        </div>
      );
    } else {
      return (
        <div className={styles.buttonsContainer}>
          <a href='https://gmail.com'>
            <Button
              variant="contained"
              color="default"
              startIcon={<PersonIcon />}
              className={classes.button}
            >
              Sign in
            </Button>
          </a>
        </div>
      );
    }
  };


  return (
    <div className={clsx(className, styles.root)}>
      <NavLink to='/'>
        <div className={styles.logoContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="36" viewBox="0 0 512 512" width="36"><g><path d="m488.5 61h-465c-12.958 0-23.5 10.542-23.5 23.5v276.143c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-276.143c0-4.687 3.813-8.5 8.5-8.5h465c4.687 0 8.5 3.813 8.5 8.5v59.571c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-59.571c0-12.958-10.542-23.5-23.5-23.5z"/><path d="m504.5 171.571c-4.142 0-7.5 3.357-7.5 7.5v248.429c0 4.687-3.813 8.5-8.5 8.5h-465c-4.687 0-8.5-3.813-8.5-8.5v-31.857c0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v31.857c0 12.958 10.542 23.5 23.5 23.5h465c12.958 0 23.5-10.542 23.5-23.5v-248.429c0-4.142-3.358-7.5-7.5-7.5z"/><path d="m461.5 414.542c8.547 0 15.5-6.953 15.5-15.5v-286.084c0-8.547-6.953-15.5-15.5-15.5h-411c-8.547 0-15.5 6.953-15.5 15.5v286.084c0 8.547 6.953 15.5 15.5 15.5zm-411.5-15.5v-286.084c0-.275.224-.5.5-.5h411c.276 0 .5.225.5.5v286.084c0 .275-.224.5-.5.5h-411c-.276 0-.5-.225-.5-.5z"/><path d="m320.501 263.75c2.171 7.119 9.689 11.156 16.851 8.975l93.979-28.662c7.119-2.172 11.145-9.731 8.975-16.851 0-.001 0-.001 0-.001l-28.663-93.978c-2.174-7.127-9.698-11.153-16.852-8.976l-25.047 7.639c-4.318-6.382-11.623-10.586-19.892-10.586-13.224 0-23.984 10.752-23.999 23.972l-25.041 7.637c-7.12 2.172-11.146 9.731-8.974 16.851zm29.352-127.438c4.034 0 7.589 2.695 8.666 6.622 1.604 5.879-2.87 11.378-8.666 11.378-5.015 0-9-4.115-9-9 0-4.963 4.038-9 9-9zm-19.323 23.228c4.331 5.891 11.377 9.696 19.11 9.766 13.134.09 23.596-10.235 24.184-22.865.002-.036.006-.072.007-.108l23.901-7.29 27.788 91.109-91.109 27.787-27.787-91.108z"/><path d="m85.953 293.097h41.626v69.918c0 7.444 6.056 13.5 13.5 13.5h98.252c7.444 0 13.5-6.056 13.5-13.5v-98.252c0-7.444-6.056-13.5-13.5-13.5h-26.333c-2.378-7.209-8.084-12.915-15.293-15.293v-54.625c0-7.444-6.056-13.5-13.5-13.5h-26.333c-3.157-9.571-12.179-16.5-22.793-16.5s-19.636 6.929-22.793 16.5h-26.333c-7.444 0-13.5 6.056-13.5 13.5v98.252c0 7.444 6.056 13.5 13.5 13.5zm127.052-26.834h24.826v95.252h-95.252v-75.918-19.334h24.826c3.223 9.767 12.427 16.5 22.8 16.5 10.333 0 19.558-6.677 22.8-16.5zm-22.8-16.5c4.962 0 9 4.037 9 9s-4.038 9-9 9c-5.042 0-9-4.146-9-9 0-4.963 4.037-9 9-9zm-55.126-83.418c4.962 0 9 4.037 9 9s-4.038 9-9 9-9-4.037-9-9 4.037-9 9-9zm-47.626 16.5h24.826c.022.067.051.131.074.198 3.289 9.683 12.411 16.302 22.726 16.302 10.386 0 19.574-6.724 22.8-16.5h24.826v53.118c-.091.03-.179.067-.269.098-6.98 2.396-12.509 7.89-14.927 14.913-.033.097-.073.191-.105.289h-26.326c-7.444 0-13.5 6.056-13.5 13.5v13.334h-40.125z"/></g></svg>
          <h2>Your local Marketplace</h2>
        </div>
      </NavLink>
      {renderButtons()}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  status: PropTypes.object,
};

const mapStateToProps = state => ({
  status: getUserStatus(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
