const fs = require('fs');
const interfaces = require('../interfaces');
const utility = require('./utility');

const FILE_PATH = 'json/notes.json';

const data = { notes: null };
const getNotesInstance = () => data.notes;
const setNotesInstance = notes => (data.notes = notes);
const pushNoteInNotesInstance = note => data.notes.push(note);

/**
 * get and return the array contains NOTES in the json file.
 * if file's content is empty, return new empty array.
 * @param {string} filePath
 * @returns {interfaces.Note[]}
 */
const readFileContent = () => {
	const fileBuffer = fs.readFileSync(FILE_PATH);
	const contentString = fileBuffer.toString();
	const notes = contentString === '' ? [] : JSON.parse(contentString);
	const notesWrapPrototype = notes.map(
		note => new interfaces.Note(note.title, note.content)
	);
	setNotesInstance(notesWrapPrototype);
	return getNotesInstance();
};

/** store the notes into json file. */
const storeFileContent = () => {
	const list = getNotesInstance();
	if (list === null) throw new Error('not receive the notes list!');
	const contentString = JSON.stringify(list);
	fs.writeFileSync(FILE_PATH, contentString);
};

/** check if the new note has same title as the existing note. and will return true
 * @param {string} title
 */
const checkNoteMayAlreadyExist = title => {
	const notes = getNotesInstance();
	const hasDuplicate = !!notes.find(note => note.title === title);
	return hasDuplicate;
};

//PART> read note

/**
 * @param {string} title
 * @returns {interfaces.Note}
 */
const getNoteInstance = title => {
	const noteList = getNotesInstance();
	if (!noteList)
		return utility.printError(`internal ERROR! can't receive notes data.`);
	const note = noteList.find(note => note.title === title);
	if (!note) return null;
	return note;
};

//PART> add new note

/**
 * using class "Note" to create new note instance and return it.
 * @param {string} title
 * @param {string} content
 * @returns {interfaces.Note}
 */
const createNewNote = (title, content = '') => {
	return new interfaces.Note(title, content);
};

/**
 * create new note and store it into the notes list.
 * if the same title exists, it will not be saved.
 * @param {string} title
 * @param {string} content
 */
const addNewNodeIntoList = (title, content = '') => {
	const newNote = createNewNote(title, content);
	if (checkNoteMayAlreadyExist(title)) {
		utility.printError(
			`ERROR: duplicated title "${title}".`,
			'(in utility.js: addNewNodeIntoList)'
		);
		return newNote;
	}
	pushNoteInNotesInstance(newNote);
	utility.printSafe(`success for add new note "${title}".`);
	return newNote;
};

//PART> edit note

/**
 * @param {string} title
 * @param {string} content
 */
const editNoteContent = (title, content) => {
	const note = getNoteInstance(title);
	if (!note)
		return utility.printError(`can't receive note with specific title.`);
	return note.setContent(content);
};

/**
 * @param {string} title
 * @param {string} newTitle
 */
const editNoteTitle = (title, newTitle) => {
	const note = getNoteInstance(title);
	if (!note)
		return utility.printError(`can't receive note with specific title.`);
	return note.setTitle(newTitle);
};

//PART> delete note

const removeNote = title => {
	const noteList = getNotesInstance();
	if (!noteList)
		return utility.printError(`internal ERROR! can't receive notes data.`);
	const noteIndex = noteList.findIndex(note => note.title === title);
	if (!~noteIndex)
		return utility.printError(`can't receive note named ${title}.`);
	noteList.splice(noteIndex, 1); // this operation have side effect.
	setNotesInstance(noteList);
	storeFileContent();
	utility.printSafe(`note "${title}" has been removed.`);
};

module.exports = {
	readFileContent,
	storeFileContent,

	checkNoteMayAlreadyExist,
	createNewNote,
	addNewNodeIntoList,
	getNoteInstance,
	editNoteTitle,
	editNoteContent,
	removeNote,
};
