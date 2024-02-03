import styles from './StatisticSection.module.css'

function StatisticSection() {

  return (
    <div className={`${styles["page-wrapper"]}`}>
      <div className={`${styles["stat-wrapper"]}`}>Score: 16, 000</div>
      <div className={`${styles["stat-wrapper"]}`}>Time: 120 seconds </div>
    </div>
  )
}

export default StatisticSection;