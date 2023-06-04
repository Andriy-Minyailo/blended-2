import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    search: '',
    page: 1,
    photos: [],
    total_results: 0,
    error: null,
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.getPhotos(search, page);
    }
  }

  getPhotos = async (query, page) => {
    this.setState({ loading: true });
    try {
      const { photos, total_results } = await ImageService.getImages(
        query,
        page
      );
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos],
        total_results: total_results,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  reqvestSearch = value => {
    this.setState({
      search: value,
      page: 1,
      photos: [],
      total_results: 0,
      error: null,
    });
  };

  clickOnLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { photos, total_results, error, loading } = this.state;
    return (
      <>
        <SearchForm reqvestSearch={this.reqvestSearch} />

        {error && <Text>{error}</Text>}
        <Grid>
          {photos.map(({ id, avg_color, alt, src: { large } }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {loading && <h2>Loading...</h2>}
        {photos.length > 0 && total_results > photos.length && (
          <Button onClick={this.clickOnLoadMore}>
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        )}
      </>
    );
  }
}
