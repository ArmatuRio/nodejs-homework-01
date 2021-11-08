const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function readContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        return console.error(error.message);
    }
};

async function listContacts() {
    const contacts = await readContacts();
    return contacts;
};

async function getContactById(contactId) {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id == contactId);
    return contact;
};

async function removeContact(contactId) {
        const contacts = await readContacts();
        const newContacts = contacts.filter(contact => contact.id !== Number(contactId));
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        return newContacts;
};

async function addContact(name, email, phone) {
    const contacts = await readContacts();
    const newContact = { id: shortid.generate(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2),)
    return contacts;
    
};

module.exports = { listContacts, getContactById, removeContact, addContact };