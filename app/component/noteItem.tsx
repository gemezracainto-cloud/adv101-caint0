import type { Note } from "../page";

type NoteItemProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

export default function NoteItem({
  note,
  onEdit,
  onDelete,
}: NoteItemProps) {
  return (
    <article className="note-card">

      {/* NOTE TOP */}
      <div className="note-top">

        <div className="note-symbol">
          ✦
        </div>

        <button className="more-button">
          ⋮
        </button>

      </div>

      {/* NOTE CONTENT */}
      <div className="note-body">

        <h3>{note.title}</h3>

        <p>{note.description}</p>

      </div>

      {/* NOTE FOOTER */}
      <div className="note-footer">

        <div className="note-date">
          ◷ &nbsp; {note.createdAt}
        </div>

        <div className="note-actions">

          <button
            className="edit-button"
            onClick={() => onEdit(note)}
          >
            ✎ &nbsp; Edit
          </button>

          <button
            className="delete-button"
            onClick={() => onDelete(note.id)}
          >
            ♲ &nbsp; Delete
          </button>

        </div>

      </div>

    </article>
  );
}
