import React, {useCallback, useMemo} from "react";
import styles from './List.module.scss'
import {RootState, useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import {addItem, clearTasks} from "../../redux/slices/taskSlice";
import TaskBlock from "../TaskBlock";

const List: React.FC = () => {
  const dispatch = useAppDispatch()
  const {allTasks} = useSelector((state: RootState) => state.tasks)
  const [newTask, setNewTask] = React.useState<string>()
  const [filter, setFilter] = React.useState<'All' | 'Active' | 'Completed'>('All')
  const onClickEnter = (key: string) => {
    if(key === 'Enter' && newTask){
      dispatch(addItem(newTask));
      setNewTask('')
    }
  }

  const filtration = () => {
    if (filter === 'Active') {
      return allTasks.filter(task => task.status)
    }
    else if (filter === 'Completed') {
      return allTasks.filter(task => !task.status)
    }
    else {
      return allTasks
    }
  }

  return (
    <div className={styles.root}>
      <input
        onKeyUp={(e) => onClickEnter(e.key)}
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
        className={styles.add}
        placeholder='What needs to be done?'/>
      <ul>
        {allTasks && filtration().map((task, index) => <li key={index}><TaskBlock {...task}/></li>)}
      </ul>
      <div className={styles.footer}>
        <p>{allTasks.filter(task => task.status).length} items left</p>
        <div className={styles.filter}>
          <button className={filter === 'All' ? styles.selected : ''}
                  onClick={() => setFilter('All')}>All</button>
          <button className={filter === 'Active' ? styles.selected : ''}
                  onClick={() => setFilter('Active')}>Active</button>
          <button className={filter === 'Completed' ? styles.selected : ''}
                  onClick={() => setFilter('Completed')}>Completed</button>
        </div>
        <button onClick={() => dispatch(clearTasks())}>Clear completed</button>
      </div>
    </div>
  )
}

export default List