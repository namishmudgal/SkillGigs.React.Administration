import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Icon, Accordion, Segment } from 'semantic-ui-react';
import DashboardSearchBar from '../../../shared/DashboardSearchBar';
import SearchLeftPanelLayout from '../../../wireframe/components/SearchLeftPanelLayout';
import SearchRightPanelLayout from '../../../wireframe/components/SearchRightPanelLayout';
import SelectedFilters from '../../../shared/SelectedFilters';
import FilterPod from '../../../shared/FilterPod';
import SearchResultPod from '../../../shared/SearchResultPod';
import StatisticsUI from '../../../shared/Statistics';
import SearchPagination from '../../../shared/SearchPagination';
import SortOptions from '../../../shared/SortOptions';
import {mockAdminUserSearch} from '../../../../data/admin';

interface Props {
    setLoginfailed(): void;
}

export default class AdminDashboardUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = { activeIndex: 0 };
  }
  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }
  render() {
    return (
      <ContentWrapperWithHeader>
        <StatisticsUI />
        <DashboardSearchBar
          title={'Explore SkillGigs Users With Just Simple Search...'}
          placeholder={'Job title, keywords or company name'}
        />
        <Container>
          <Grid stackable>
            <SearchLeftPanelLayout>
              <Accordion fluid styled>
                <h2 className="heading02">Filter
                  <a className="right floated txt-pink01 fnt01">CLEAR ALL
                  </a>
                </h2>
                <SelectedFilters
                  appName={"employer"}
                />
                <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick} className="mrg-tp02">
                  <Icon name='dropdown' />
                  Budget Type
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === 0}>
                  <FilterPod
                    appName={"employer"}
                    withSearch={false}
                    fieldList={[
                      {'name': 'Hour', 'count': ''},
                      {'name': 'Year', 'count': ''}
                    ]}
                  />
                </Accordion.Content>
                <Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick} className="mrg-tp02">
                  <Icon name='dropdown' />
                  Professions
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === 1}>
                  <FilterPod
                    appName={"employer"}
                    withSearch={false}
                    fieldList={[
                      {'name': 'IT', 'count': '8054'},
                      {'name': 'UN', 'count': '889'},
                      {'name': 'HC', 'count': '634'},
                      {'name': 'En', 'count': '109'},
                      {'name': 'Ma', 'count': '22'}
                    ]}
                  />
                </Accordion.Content>
                <Accordion.Title active={this.state.activeIndex === 2} index={2} onClick={this.handleClick} className="mrg-tp02">
                  <Icon name='dropdown' />
                  Skills
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === 2}>
                  <FilterPod
                    appName={"employer"}
                    withSearch={true}
                    fieldList={[
                      {'name': 'Javascript', 'count': '2263'},
                      {'name': 'Java', 'count': '1969'},
                      {'name': 'Python', 'count': '1344'},
                      {'name': 'JQuery', 'count': '1301'},
                      {'name': 'SQL', 'count': '1300'}
                    ]}
                  />
                </Accordion.Content>
                <Accordion.Title active={this.state.activeIndex === 3} index={3} onClick={this.handleClick} className="mrg-tp02">
                  <Icon name='dropdown' />
                  Company Name
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === 3}>
                  <FilterPod
                    appName={"employer"}
                    withSearch={true}
                    fieldList={[
                      {'name': 'Facebook', 'count': '80'},
                      {'name': 'Pizza Hut', 'count': '60'},
                      {'name': 'Petuum', 'count': '120'},
                      {'name': 'Yahoo', 'count': '100'},
                      {'name': 'Amazon', 'count': '140'}
                    ]}
                  />
                </Accordion.Content>
              </Accordion>
            </SearchLeftPanelLayout>
            <SearchRightPanelLayout>
              <SortOptions />
              <SearchResultPod
                resultDetails={mockAdminUserSearch}
              />
              <Segment basic textAlign='center' className="add-top-xs-padding mobile-hide">
                <SearchPagination />
              </Segment>
           </SearchRightPanelLayout>
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}
