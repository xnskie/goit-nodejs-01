const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(({ id }) => id === contactId);

        if (!contact) {
            throw new Error('contact not found');
        }

        return contact;
    } catch (error) {
        console.log(error);
    }
};

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contactIdx = contacts.findIndex(({ id }) => id === contactId);

        if (contactIdx === -1) {
            throw new Error('ERROR');
        }
        const removedContact = contacts.splice(contactIdx, 1);
        const contactsStringify = JSON.stringify(contacts);
        await fs.writeFile(contactsPath, contactsStringify);

        return removedContact;
    } catch (error) {
        console.log(error);
    }
};

const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const isExist = contacts.some((contact) => contact.phone === phone);

        if (isExist) {
            throw new Error('phone is exists');
        }

        const id = contacts[contacts.length - 1].id + 1;
        const newContact = { id, name, email, phone };
        contacts.push(newContact);
        fs.writeFile(contactsPath, JSON.stringify(contacts));

        return newContact;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};