import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../redux/reducer';
import { rootSaga } from '../redux/saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { responsiveStoreEnhancer } from 'redux-responsive';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    compose(
      responsiveStoreEnhancer,
      composeWithDevTools(
        applyMiddleware(sagaMiddleware),
      )
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
