import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(8),
      name,
      number,
    };
    if (
      contacts.some(
        el =>
          el.name.toLowerCase().trim() === name.toLowerCase().trim() ||
          el.number.trim() === number.trim()
      )
    ) {
      alert(`${name} is already in contacts`);
      return false;
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
    return true;
  };
  console.log(contacts);

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

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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

  // useEffect(() => {
  //   const storedContact = localStorage.getItem('contacts');
  //   if (storedContact === null) return;
  //   setContacts(JSON.parse(storedContact));
  // }, []);

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
