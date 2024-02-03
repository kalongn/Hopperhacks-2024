import styles from './Navbar.module.css';
import PropTypes from 'prop-types';

function Navbar({ theme, setTheme }) {

  function changeTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <header className={`${styles["nav-bar-wrapper"]}`}>
      <div>
        <button className={`invisible ${styles["buttons"]}`} onClick={() => false}>Color </button>
      </div>
      <h1>Hopper Hacks <span>2024</span></h1>
      <div>
        <button className={`${styles["buttons"]}`} onClick={() => changeTheme()}>
          {theme === 'light' ? 'Light' : 'Dark'} Theme
        </button>
      </div>
    </header>
  )
}

Navbar.propTypes = {
  theme: PropTypes.string,
  setTheme: PropTypes.func
}

export default Navbar;