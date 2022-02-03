const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
    const notes = loadNotes(); // If file is empty or doesnt exist, notes will be an empty array
    // const duplicate = notes.filter((note) => note.title === title); // Find Duplicate objects
    const duplicateNote = notes.find((note) => note.title === title); // Stops at first match

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes); // Overwrite JSON with old notes + newly added note
        console.log("New note added!");
    } else {
        console.log("Duplicate title!");
    }
};

const deleteNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);
    if (newNotes.length < notes.length) {
        console.log(
            chalk.bold.green("Removing note with title " + title + "!")
        );
        saveNotes(newNotes); // Overwrite JSON with new filtered array
    } else {
        console.log(chalk.red.bold("Title not found"));
    }
};

const loadNotes = () => {
    try {
        const buffer = fs.readFileSync("notes.json");
        dataJSON = JSON.parse(buffer);
        return dataJSON;
    } catch (e) {
        return []; // If file is empty or doesn't exist, return an empty array instead
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON); // Overwrites JSON
};

const listNotes = () => {
    console.log(chalk.blue.bold("Listing all notes!"));
    const allNotes = loadNotes();

    // let temp = allNotes.map((data) => { // Map returns array consisting of all titles
    //     return data.title;
    // });
    // console.log(temp);

    allNotes.forEach((element) => {
        //forEach returns raw text of all titles
        console.log(element.title);
    });
    // console.log(allNotes);
};

const readNote = (title) => {
    const allNotes = loadNotes();
    const temp = allNotes.find((element) => element.title === title); // Returns Undefined if no title exists
    if (temp) {
        // If you found a title, print it
        console.log(chalk.magenta(temp.title));
        console.log(temp.body);
    } else {
        // Error handling
        console.log(chalk.red("Error! Note does not exist"));
    }
};

module.exports = {
    addNotes: addNotes,
    deleteNote: deleteNote,
    listNotes: listNotes,
    readNote: readNote,
};
