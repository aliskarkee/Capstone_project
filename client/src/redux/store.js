import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist compatibility
    }),
});

// Configure persistor
export const persistor = persistStore(store);
