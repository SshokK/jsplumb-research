import {
  SELECT_TASK,
  UNSELECT_TASK,
} from 'Actions/app-actions';

const initialState = {
  selectedTasks: []
};

const AppState = (state = initialState, { data, type }: any) => {
  switch (type) {
    case SELECT_TASK: {
      return {
        ...state,
        selectedTasks: [...state.selectedTasks, data]
      };
    }

    case UNSELECT_TASK:
      return {
        ...state,
        selectedTasks: state.selectedTasks.filter((task: any) => task.id !== data.id)
      };

    default:
      return state;
  }
};

export default AppState;
