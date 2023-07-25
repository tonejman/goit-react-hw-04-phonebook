import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const [savedData, setSavedData] = useState(true);

  useEffect(() => {
    if (savedData) {
      const contactsFromLocalStorage = localStorage.getItem('contacts');

      if (contactsFromLocalStorage !== 'undefined') {
        const parsedContacts = JSON.parse(contactsFromLocalStorage);

        if (parsedContacts) {
          setContacts(parsedContacts);
        }
      }
      setSavedData(false);
    } else {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts, savedData]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(8),
      name,
      number,
    };

    contacts.some(
      el => el.name.toLowerCase() === name.toLowerCase() || el.number === number
    )
      ? alert(`${name} is already in contacts`)
      : setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const addFilter = event => {
    setFilter(event.target.value);
  };

  const filterOfContacts = () => {
    const inputContact = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    return inputContact;
  };

  return (
    <div className="wrapper">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} addFilter={addFilter} />
      <ContactList
        contacts={filterOfContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
