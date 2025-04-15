import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import themeReducer from './themeSlice'
export default configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
  },
});
