import { configureStore ,combineReducers} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginFromSlice from '../reduxSlice/adminServices/loginSlice';

const adminConfig = {
  key: 'admin',
  storage,
};

const adminReducerData = combineReducers({
  loginFromSlice,
});

const adminPersistedReducer = persistReducer(adminConfig, adminReducerData);

export const store = configureStore({
  reducer: {
    admin: adminPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore the persist action
      },
    }),
});

export const persistor = persistStore(store);
