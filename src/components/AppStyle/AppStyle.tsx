import React from 'react'
import styles from  './AppStyle.module.css'

const AppStyle:React.FC = () => {
  return (
    <>
    <div className={styles.styleWapper}>
        <div className={styles.bgImage}><img src='/src/assets/wave.png'/></div>
        <div className={styles.blurPink}/>
        <div className={styles.blurBlue}/>
        </div>
    </>
  )
}

export default AppStyle