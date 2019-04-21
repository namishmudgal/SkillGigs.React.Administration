import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../shared/SkillGigs.React.Redux/administration/redux/reducer';
import { rootSaga } from '../shared/SkillGigs.React.Redux/administration/redux/saga';
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
