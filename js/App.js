import NotesApi from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }
  _refreshNotes() {
    const notes = NotesApi.getAllNotes();
    // set notes:
    this._setNotes(notes);
    // set Active Note:
    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }
  _setNotes(notes) {
    this.notes=notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length >0);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "New Note",
          body: "Take Some Note",
        };
        NotesApi.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        NotesApi.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((n) => n.id == noteId);
        this._setActiveNote(selectedNote);
      },
      onNoteDelete: (noteId) => {
        NotesApi.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}
