import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(8),
      name,
      number,
    };
    contacts.some(
      el =>
        el.name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
        el.number.trim() === newContact.number.trim()
    )
      ? alert(`${name} is already in contacts`)
      : setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const addFilter = event => {
    setFilter({ filter: event.target.value });
  };

  const filterOfContacts = () => {
    const inputContact = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(inputContact)
    );
  };

  // componentDidMount() {
  //     const storedContact = localStorage.getItem('contacts');
  //     if (storedContact === null) return;
  //     setContacts(prevState => ({
  //       ...prevState,
  //       contacts: JSON.parse(storedContact),
  //     }));
  //   }

  //   componentDidUpdate() {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }

  useEffect(() => {
    const storedContact = localStorage.getItem('contacts');
    if (storedContact === null) return;
    setContacts(JSON.parse(storedContact));
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // const { filter } = this.state;
  return (
    <div className="wrapper">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} addFilter={addFilter} />
      <ContactList contacts={filterOfContacts()} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
