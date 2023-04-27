import React, { Component } from 'react';
import { GlobalStyle } from './BasicStyles/GlobalStyle';
import { Layout } from './Layout/Layout';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  //створюємо метод для додавання контактів в стейт
  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`You already have ${name} in your contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  // Фільтрація
  filterChange = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };

  //фільтер не залежно від розміру літер
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const NormaCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(NormaCase)
    );
  };

  //видалення контакту
  delContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterChange} />
        <ContactList
          contacts={this.getVisibleContacts()}
          onDelContact={this.delContact}
        />

        <GlobalStyle />
      </Layout>
    );
  }
}
