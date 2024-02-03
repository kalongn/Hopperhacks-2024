import styles from './GameControl.module.css';

function GameControl() {
  return (
    <div className={`${styles["page-wrapper"]}`}>
      <button className={`${styles["bttn"]}`} onClick={() => false}>Start</button>
      <button className={`${styles["bttn"]}`} onClick={() => false}>Undo</button>
    </div>
  )
}

export default GameControl