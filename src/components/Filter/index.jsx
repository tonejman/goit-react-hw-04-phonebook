import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, addFilter }) => {
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
};
Filter.propTypes = {
  filter: PropTypes.string,
  addFilter: PropTypes.func,
};
export default Filter;
