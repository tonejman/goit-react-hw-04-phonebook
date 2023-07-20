import React, { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(8),
      name,
      number,
    };
    this.state.contacts.some(
      el =>
        el.name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
        el.number.trim() === newContact.number.trim()
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  addFilter = event => {
    this.setState({ filter: event.target.value });
  };

  filterOfContacts = () => {
    const { filter, contacts } = this.state;
    const inputContact = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(inputContact)
    );
  };

  componentDidMount() {
    const storedContact = localStorage.getItem('contacts');
    if (storedContact === null) return;
    this.setState({
      contacts: JSON.parse(storedContact),
    });
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    const { filter } = this.state;
    return (
      <div className="wrapper">
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} addFilter={this.addFilter} />
        <ContactList
          contacts={this.filterOfContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
