import * as React from 'react';
import { Grid, Image, Icon } from 'semantic-ui-react';
import { Translate, withLocalize } from "react-localize-redux";
import * as anonymousTranslations from "../../../translations/anonymous.json";
import { NavLink } from 'react-router-dom';

interface Props {
    addTranslation: any;
    initialize: any;
    profileId: number;
    images: any;
}

class SgSixColumnBanner extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.props.addTranslation(anonymousTranslations);
  }

  render() {
    const {
      profileId,
      images
    } = this.props;
    return (
      <Grid.Column width={6} className="rmv-rgt-pad mobile only mrg-tp235mb">
        <Image
          src={images.length ? images[0] : require('../../../assets/images/no-tag-company.jpg')}
          fluid
          onError={
            (image: any) => {
              image.target.src = require('../../../assets/images/no-tag-company.jpg');
            }
          }
        />
        <span className="right floated fnt06 txt-grey01"><NavLink to={`/Administration/Employer/PhotoManager/${profileId}?albumCode=0`} className="mrg-lft02"><Icon name="edit" className="txt-pink01 fnt04" /></NavLink></span>
      </Grid.Column>
    );
  }
}

export default (withLocalize(SgSixColumnBanner) as any);