import { connect } from 'react-redux';
import { selectTask, unselectTask } from 'Actions/app-actions';
import { Dispatch } from 'redux';
import Task from 'Components/ConfigTool/Task/Task';

const mapStateToProps = ({ AppState }: any, ownProps: any) => {
  return ({
    selectedTasks: AppState,
    ...ownProps
  });
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return ({
    selectTask: (task: any) => {
      dispatch(selectTask(task));
    },

    unselectTask: (task: any) => {
      dispatch(unselectTask(task));
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
