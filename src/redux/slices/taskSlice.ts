import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TaskProps = {
  id: number
  text: string
  status: boolean
}

interface TaskState {
  allTasks: TaskProps[]
}

const initialState: TaskState = {
  allTasks: [],
}

const taskSlice = createSlice ({
  name: 'posts',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskProps[]>) => {
      state.allTasks = action.payload
    },
    addItem(state, action: PayloadAction<string>) {
      state.allTasks.push({id: state.allTasks.length,text: action.payload, status: true});
    },
    changeStatus(state, action: PayloadAction<number>) {
      const findItem = state.allTasks.find(obj => obj.id === action.payload)
      if (findItem) {
        findItem.status = !findItem.status
      }
    },
    clearTasks(state) {
      state.allTasks = state.allTasks.filter(obj => obj.status)
    }
  },
})

export const { setTasks, addItem, changeStatus, clearTasks } = taskSlice.actions;

export default taskSlice.reducer;