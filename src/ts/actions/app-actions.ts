export const SELECT_TASK = 'app/config-tool/SELECT_TASK';
export const UNSELECT_TASK = 'app/config-tool/UNSELECT_TASK';

export const selectTask = (data: any) => ({
  type: SELECT_TASK,
  data
})

export const unselectTask = (data: any) => ({
  type: UNSELECT_TASK,
  data
})
