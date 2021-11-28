const yargs = require('yargs/yargs')(process.argv.slice(2));
const commandHandler = require('./command-handler');

const commandListener = () =>
	yargs
		//PART> add command
		.command({
			command: 'add',
			aliases: ['new', 'a'],
			desc: 'create new note with the title.',
			builder: {
				title: {
					desc: 'the value will be the note title.',
					alias: 't',
					type: 'string',
					demandOption: true,
				},
				content: {
					desc: 'the value will be the note content.',
					alias: 'c',
					type: 'string',
					demandOption: false,
				},
			},
			handler: commandHandler.addHandler,
		})
		//PART> read method
		.command({
			command: 'read',
			aliases: ['r'],
			desc: "read note's with specific title.",
			builder: {
				title: {
					alias: 't',
					type: 'string',
					demandOption: true,
				},
			},
			handler: commandHandler.readHandler,
		})
		//PART> modify method
		.command({
			command: 'edit',
			desc: "edit note's title and content.",
			aliases: ['e'],
			builder: {
				title: {
					alias: 't',
					type: 'string',
					demandOption: true,
				},
				newTitle: {
					alias: 'new-title',
					type: 'string',
				},
				content: {
					alias: 'c',
					type: 'string',
				},
			},
			handler: commandHandler.editHandler,
		})
		//PART> delete command
		.command({
			command: 'remove',
			aliases: ['rm'],
			desc: 'delete note with specific title.',
			builder: {
				title: {
					alias: 't',
					type: 'string',
					demandOption: true,
				},
			},
			handler: commandHandler.removeHandler,
		})
		.usage('Usage:\n$0 command --key value')
		.help('help').argv;

module.exports = commandListener;
