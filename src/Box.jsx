import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Box.module.css';

function Box({ index, type, letter, letters }) {
  const [avaliable, setAvaliable] = useState(type === "letter" ? true : false);

  function onClickBehavior() {
    if (type === "letter") {
      if (avaliable) {
        setAvaliable(false);
      }
    }
  }
  return (
    <div className={`${styles["box-setting"]} ${styles["bttn"]} ${avaliable ? '' : styles["unavaliable"]}`} onClick={() => onClickBehavior()}>
      <div>
        {letter || ""}
      </div>
    </div>
  );
}

Box.propTypes = {
  letter: PropTypes.string,
  type: PropTypes.string,
  index: PropTypes.number,
  letters: PropTypes.array
};

export default Box;
