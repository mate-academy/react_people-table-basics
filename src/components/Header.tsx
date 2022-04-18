import { FC, memo } from 'react';
import Nav from './Nav';

const Header: FC = memo(() => (
  <header>
    <Nav />
  </header>
));

export default Header;
