const utility = require('../helper/utility');
const note = require('../helper/use-notes');

const addHandler = argv => {
	const { title, content } = argv;
	if (title) {
		note.readFileContent();
		note.addNewNodeIntoList(title, content);
		note.storeFileContent();
		return;
	}
	utility.printError("can't receive title by command.");
};

const readHandler = argv => {
	const { title } = argv;
	if (title) {
		note.readFileContent();
		const target = note.getNoteInstance(title);
		if (!target)
			return utility.printError(`can't receive note named ${title}.`);
		const printContent = `${target.title}:\n  ${target.content}`;
		console.log(printContent);
		return;
	}
	return utility.printError("can't receive note title by command.");
};

const editHandler = argv => {
	const { title, newTitle, content } = argv;
	if (title) {
		note.readFileContent();
		const titleCheck = note.checkNoteMayAlreadyExist(title);
		if (titleCheck) {
			typeof content === 'string' && note.editNoteContent(title, content);
			newTitle && note.editNoteTitle(title, newTitle);
			note.storeFileContent();
			console.log('edit successfully.');
			return;
		}
	}
	return utility.printError("can't receive note title and content by command.");
};

const removeHandler = argv => {
	const { title } = argv;
	if (title) {
		note.readFileContent();
		note.removeNote(title);
		note.storeFileContent();
		return;
	}
	utility.printError("can't receive title by command.");
};

module.exports = {
	addHandler,
	readHandler,
	editHandler,
	removeHandler,
};
