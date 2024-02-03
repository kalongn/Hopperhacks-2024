import styles from './Box.module.css'

function Box() {

    function generateLetter() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    return (
        <div className={`${styles["border"]}`}>
            <div>
                {generateLetter()}
            </div>
        </div>
    )
}


export default Box;