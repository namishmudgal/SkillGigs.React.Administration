import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';

interface Props {
  appName: string;
  withSearch: boolean;
  fieldList: any;
}

export default class FilterPodUI extends React.Component<Props, any> {
  render() {
    const {
      withSearch,
      fieldList
    } = this.props;
    return (
      <div>
        {
        withSearch ?
          <div className="ui search mrg-btm02">
            <div className="ui icon input field wfull">
              <input className="prompt" type="text" placeholder="Search" />
              <Icon name="search" />
            </div>
          </div> : null
        }
        <Form.Field>
          {
            fieldList.map((field: any, index: number) =>
              <div className="ui item checkbox wfull pad-btm1" key={index}>
                  <input type="checkbox" />
                  <label>{field.name}
                    {field.count !== '' &&  field.count > 0 ? <span className="right floated">[ {field.count} ]</span> : null}
                  </label>
                </div>
            )
          }
        </Form.Field>
      </div>
    );
  }
}