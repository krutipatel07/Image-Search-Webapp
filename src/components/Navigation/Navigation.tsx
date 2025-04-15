import { NavLink } from 'react-router-dom';
import '../../App.css';
import styles from './Navigation.module.css'

const Navigation: React.FC = () => {
  return (
    <nav className={styles.mainNav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
          >
            Search
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/bookmarks"
             className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
          >
            Bookmarks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;