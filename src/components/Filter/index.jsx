import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Filter.module.css';

class Filter extends Component {
  render() {
    const { filter, addFilter } = this.props;
    return (
      <div>
        <label className={css.label}>Find contacts by name</label>
        <input
          className={css.input}
          type="text"
          name="filter"
          value={filter}
          onChange={addFilter}
        ></input>
      </div>
    );
  }
}
Filter.propTypes = {
  filter: PropTypes.string,
  addFilter: PropTypes.func,
};
export default Filter;
