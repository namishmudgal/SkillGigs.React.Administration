import 'core-js/es6/string';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es7/array';
import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { AppRouter } from './router/router';
import outdatedBrowser from './outdatedbrowser.js';
import './assets/css/outdatedbrowser.css';
import './assets/css/custom.css';
import './assets/css/mobile-view.css';
import '../my-semantic-theme/semantic.less';

const renderComponent = (Component: any) => render(
  <AppContainer>
    <Component />
  </AppContainer>,
  document.getElementById('root'),
);

renderComponent(AppRouter);

if ((module as any).hot) {
  (module as any).hot.accept('./router/router', () => { renderComponent(AppRouter); });
}

outdatedBrowser({
  bgColor: '#f25648',
  color: '#ffffff',
  lowerThan: 'transform',
  languagePath: './static/en.html',
});