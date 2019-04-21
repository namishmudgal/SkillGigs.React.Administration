import * as React from 'react';
import ContentWrapperWithHeader from '../../../wireframe/components/ContentWrapperWithHeader';
import { Grid, Container, Divider, Form, Loader, Segment} from 'semantic-ui-react';
import SearchBarWithFilters from '../../../shared/SearchBarWithFilters';
import SortOptions from '../../../shared/SortOptions';
import ResultPod from '../../../shared/ResultPod';
import SearchPagination from '../../../shared/SearchPagination';

interface Props {
  searchResult: any;
  suggestionItems: any;
  isLoading: boolean;
  isLoggedIn: boolean;
  onSearchRequest(request: any): any;
  onSuggestionRequest(str: any): void;
}

export default class EmployerSearchPageUI extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = { activeIndex: 0 };
  }
  componentDidMount() {
		this.props.onSearchRequest({
      pageNumber: 1,
      pageSize: 24,
      sortColumn: "modified",
      sortDirection: "desc",
      appName: 'EmployerMarketplace'
    });
	}
  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }
  render() {
    const {
      onSuggestionRequest,
      onSearchRequest,
      suggestionItems,
      searchResult,
      isLoggedIn,
      isLoading
    } = this.props;
    return (
      <ContentWrapperWithHeader marginBottom={false}>
        <Container className={!isLoggedIn ? 'fix-searchBox-anonymous' : ''}>
          <Grid stackable className="add-bottom-lg-padding">
            <Grid.Column width={16}>
              <Form>
              <SearchBarWithFilters
                appName={'EmployerMarketplace'}
                suggestionItems={suggestionItems}
                onSuggestionRequest={onSuggestionRequest}
                onSearchRequest={onSearchRequest}
              />
              <Divider />
              {
                searchResult.length ?
                  <SortOptions
                    appName={'EmployerMarketplace'}
                  /> : null
              }
              {
                isLoading ?
                  <Loader active inline='centered' size='large' /> :
                    <ResultPod
                      appName={'EmployerMarketplace'}
                      resultDetails={searchResult}
                      resultView='talent'
                    />
              }
              {
                searchResult.length ?
                  <Segment basic textAlign='center' className="add-top-xs-padding mobile-hide">
                    <SearchPagination
                      appName={'EmployerMarketplace'}
                    />
                  </Segment> : null
              }
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </ContentWrapperWithHeader>
    );
  }
}
