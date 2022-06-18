import { NavLink } from 'react-router-dom';

import '../../css/Navigation.modules.css';
const Navigation = () => {
  let activeClass = {
    color: 'orange',
  };
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            to="/"
            className="nav-link"
            style={({ isActive }) => (isActive ? activeClass : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="movies"
            className="nav-link"
            style={({ isActive }) => (isActive ? activeClass : undefined)}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
