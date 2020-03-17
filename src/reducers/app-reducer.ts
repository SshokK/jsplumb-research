import {
  SIGN_OUT_BEGIN,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR
} from 'Actions/app-actions';

const initialState = {};

const AppState = (state = initialState, { data, type }: any) => {
  switch (type) {
    case SIGN_OUT_BEGIN: {
      return {
        ...state
      };
    }

    case SIGN_OUT_SUCCESS:
      return {
        ...state
      };

    case SIGN_OUT_ERROR:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default AppState;
