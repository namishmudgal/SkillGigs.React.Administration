import * as React from 'react';
import { Label, Icon } from 'semantic-ui-react';

interface Props {
    appName: string;
}

export default class SelectedFiltersUI extends React.Component<Props, any> {
  render() {
    return (
      <div>
        <Label className="mrg-tp5"> Hours <Icon name="delete" /> </Label>
        <Label className="mrg-tp5"> Facebook <Icon name="delete" /> </Label>
        <Label className="mrg-tp5">Washington <Icon name="delete" /> </Label>
        <Label className="mrg-tp5">Contract <Icon name="delete" /> </Label>
        <Label className="mrg-tp5">1-2 Year <Icon name="delete" /> </Label>
        <Label className="mrg-tp5">Contact <Icon name="delete" /> </Label>
        <Label className="mrg-tp5">1 Month <Icon name="delete" /> </Label>
        <Label className="mrg-tp5">UI UX <Icon name="delete" /> </Label>
        <Label className="mrg-tp5">Citizen <Icon name="delete" /> </Label>
      </div>
    );
  }
}