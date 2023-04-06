import { NavigationItem } from './NavigationItem';

export const Navigation = () => {
  return (
    <div className="container">
      <div className="navbar-brand">
        <NavigationItem to="/" content="Home" />
        <NavigationItem to="/people" content="People" />
      </div>
    </div>
  );
};
