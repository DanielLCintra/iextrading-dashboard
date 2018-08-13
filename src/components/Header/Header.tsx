import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/iex-logo.png';
import SymbolSearch from '../SymbolSearch';
import classes from './Header.scss';

class Header extends React.Component {
  public render() {
    return (
      <header className={classes.Header}>
        <Link to="/" title="Go to home" className={classes.HeaderLink}>
          <img src={logo} alt="IEX Trading" className={classes.HeaderLogo} />
        </Link>
        <Typography
          className={classes.HeaderTitle}
          variant="display3"
          component="h1"
        >
          IEX Trading
        </Typography>
        <SymbolSearch />
      </header>
    );
  }
}

export default Header;
