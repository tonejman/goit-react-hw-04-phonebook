import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div>
      <ul className={css.list}>
        {contacts.map(({ name, number, id }) => (
          <li className={css.item} key={id}>
            <span>{name}</span>:<span className={css.span}>{number}</span>
            <button className={css.btn} onClick={() => deleteContact(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  deleteContact: PropTypes.func,
};

export default ContactList;
