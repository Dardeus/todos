import React from "react";
import styles from "./Home.module.scss";
import List from "../../components/List";

const Home: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>todos</h1>
      <List/>
    </div>
  )
}

export default Home