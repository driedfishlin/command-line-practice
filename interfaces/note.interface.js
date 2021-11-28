/** create new note instance. */
class Note {
	/**
	 * input note's title and content.
	 * @param {string} title
	 * @param {string} content
	 */
	constructor(title, content) {
		this.title = title;
		this.content = content;
	}
	/**
	 * update note title
	 * @param {string} title
	 * @returns Note
	 */
	setTitle(title) {
		this.title = title;
		return this;
	}

	/**
	 * @param {string} content
	 * @returns Note
	 */
	setContent(content) {
		this.content = content;
		return this;
	}
}

module.exports = Note;
