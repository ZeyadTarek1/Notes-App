const yargs = require("yargs");
const notesUtil = require("./notes.js");

// Customize Version
yargs.version("1.1.0");

// Create Add Command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "Note Text",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notesUtil.addNotes(argv.title, argv.body);
    },
});
debugger;
// Create Remove Command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Title of the note to remove",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notesUtil.deleteNote(argv.title);
    },
});

// Create List Command
yargs.command({
    command: "list",
    describe: "List all notes",
    handler() {
        notesUtil.listNotes();
    },
});

// Create Read Command
yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Title of note",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notesUtil.readNote(argv.title);
    },
});

yargs.parse();
