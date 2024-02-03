import Box from './Box';
import PropTypes from 'prop-types';

import styles from './LettersBoxes.module.css';

function LetterBoxes({ letters }) {

  return (
    <div className={`${styles["page-wrapper"]}`}>
      {letters.map((letter, index) => {
        return (
          <Box key={index} type={"letter"} letter={letter} letters={letters} />
        )
      })}
    </div>
  )
}

LetterBoxes.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string)
}



export default LetterBoxes;