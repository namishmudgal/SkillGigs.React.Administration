interface RefObject<T> {
  readonly current: T | null
}
declare function createRef<T>(): RefObject<T>;
declare module 'react-loadable';
declare module 'outdatedbrowser';
declare module 'nuka-carousel';
declare module 'react-semantic-ui-range';
declare module 'react-social-login';
declare module 'react-outside-click-handler';
declare module 'react-circular-progressbar';
declare module 'react-select';
declare module 'react-select/lib/Creatable';
declare module 'react-rangeslider';
declare module 'draft-js-plugins-editor';
declare module 'draft-js-static-toolbar-plugin';
declare module 'draft-js-buttons';
declare module 'draft-js-custom-styles';
declare module 'draft-js-export-html';
declare module 'draft-js-color-picker';
declare module 'html-to-draftjs';
declare module 'qs';
declare module 'uuid/v1';
declare module "*.json" {
  const value: any;
  export default value;
}