import React from "react";
import styles from './TaskBlock.module.scss'
import {changeStatus, TaskProps} from "../../redux/slices/taskSlice";
import done from '../../assets/images/done.png'
import {useAppDispatch} from "../../redux/store";

const TaskBlock: React.FC<TaskProps> = ({ id, text, status}) => {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.root}>
      <button onClick={() => dispatch(changeStatus(id))}>
        <img className={status ? styles.unseeing : ''} src={done} alt='img'/>
      </button>
      <span>{text}</span>
    </div>
  )
}

export default TaskBlock