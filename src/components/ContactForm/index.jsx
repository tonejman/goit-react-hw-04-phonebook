import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({ addContact }) => {
  
  
  // const [state, setState] = useState({
  //   name:'',
  //   number:'',
  // });


  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    // setState({ state, [name]: value });


 switch (name) {
   case 'name':
     setName(value);
     break;

   case 'number':
     setNumber(value);
     break;

   default:
     return;
 }


  };

  const handleSubmit = evt => {
    evt.preventDefault();

    // ----------------- test------------------

    addContact(name, number);

    setName({ name:'', number:'' });
  };

  // -----------------test------------------

  

  //  const { name, number } = this.state;

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
        </label>
        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
        </label>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  number: PropTypes.string,
  name: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default ContactForm;
