import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { notesSelectors, notesSlice } from "./notesSlice";

export const Notes = () => {
  const notes = useSelector(notesSelectors.selectAll);
  const dispatch = useDispatch();

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const note = form.note?.value;
    dispatch(
      notesSlice.actions.addNote({
        content: note,
        id: nanoid(),
      })
    );
  };

  const handleRemoveNote = (id) => {
    dispatch(notesSlice.actions.removeNote(id));
  };

  return (
    <div className="Notes">
      <h2>Notes pour la cuisine</h2>
      <form onSubmit={handleNoteSubmit}>
        <label>
          Saisir une note (allergie, préférence de cuisson, ...)
          <textarea name="note"></textarea>
        </label>
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {notes &&
          notes?.map((note) => (
            <li key={note.id}>
              📝 {note.content}
              <button onClick={() => handleRemoveNote(note.id)}>
                supprimer ❌
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
