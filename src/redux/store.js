import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import chatReducer from "./modules/chatReducer";
import roomReducer from "./modules/roomReducer";
import todoReducer from "./modules/todoReducer";
import userReducer from "./modules/userReducer";
import postReducer from "./modules/postReducer";
import webrtcReducer from "./modules/webrtcReducer";
import videoReducer from "./modules/videoReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import youtubeReducer from "./modules/youtubeReducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  roomReducer: roomReducer,
  userReducer: userReducer,
  chatReducer: chatReducer,
  todoReducer: todoReducer,
  postReducer: postReducer,
  webrtcReducer: webrtcReducer,
  videoReducer: videoReducer,
  youtubeReducer: youtubeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["videoReducer"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [thunk.withExtraArgument({ history: history })];
const env = process.env.NODE_ENV;
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
// const enhancer = composeEnhancers(applyMiddleware(...middlewares));
// let store = (initialStore) => createStore(rootReducer, enhancer);
// const store = createStore(rootReducer, enhancer);
const configureStore = () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
export default configureStore;
