import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    value: '',
  };
  inputChange = event => {
    this.setState({ value: event.target.value });
  };
  formSubmit = event => {
    event.preventDefault();
    this.props.reqvestSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.formSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          onChange={this.inputChange}
          value={this.state.value}
        />
      </SearchFormStyled>
    );
  }
}
