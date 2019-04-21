import * as React from 'react';
import { EditorState, ContentState , RichUtils } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons';
import '!!style-loader!css-loader!draft-js-static-toolbar-plugin/lib/plugin.css';
import createStyles from 'draft-js-custom-styles';
import { stateToHTML } from 'draft-js-export-html';

interface Props {
  isError: boolean;
  content: string;
  onSetEditorHTML(html: any): void;
  makeFormDirty(): void;
}

const { customStyleFn } = createStyles(['font-size', 'color', 'text-transform']);
const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    Separator,
    ItalicButton,
    Separator,
    UnderlineButton,
    Separator,
    UnorderedListButton,
    Separator,
    OrderedListButton,
  ],
  theme: {
    toolbarStyles: {
      toolbar: 'toolbarStyles',
    },
    buttonStyles: {
      button: 'toolBarBtn',
      buttonWrapper: 'toolBarBtnWrapper',
      active: 'toolBarBtnActive',
    },
  },
});

const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

export default class TextEditor extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      isFontPopupOpened: false,
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  componentDidMount() {
    const blocksFromHtml = htmlToDraft(this.props.content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    this.setState({
      editorState: EditorState.createWithContent(contentState),
    });
  }
  componentWillReceiveProps(nextProps: any) {
    if (this.props.content !== nextProps.content) {
      const blocksFromHtml = htmlToDraft(nextProps.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      this.setState({
        editorState: EditorState.createWithContent(contentState),
      });
    }
  }
  onChange = (editorState: any) => {
    this.setState({
      editorState,
    });
  }

  onEditorBlur = (html: any) => {
    this.props.onSetEditorHTML(html);
  }

  handleKeyCommand(command: any, editorState: any) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    const { editorState } = this.state;
    const { isError } = this.props;
    const html = stateToHTML(editorState.getCurrentContent());
    return (
      <div
        className={`editor ${isError ? 'error' : ''}`}
      >
        <div className='toolbarWrapper'>
          <Toolbar>
            {
              (externalProps: any) => (
                <div>
                 <BoldButton {...externalProps} />
                  <Separator {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <Separator {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <Separator {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <Separator {...externalProps} />
                  <OrderedListButton {...externalProps} />
                </div>
              )
            }
          </Toolbar>
        </div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          spellCheck
          handleKeyCommand={this.handleKeyCommand}
          customStyleFn={customStyleFn}
          onBlur={() => this.onEditorBlur(html)}
          keyBindingFn={this.props.makeFormDirty}
          handlePastedText={this.props.makeFormDirty}
        />
      </div>
    );
  }
}
