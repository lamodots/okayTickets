import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import { getTicket, ticketClose } from "../features/tickets/ticketSlice";
import { getNotes } from "../features/notes/noteSlice";
import { FaPlus, FaWindowClose } from "react-icons/fa";
import { addNotes } from "../features/notes/noteSlice";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isError, message, isLoading } = useSelector(
    (state) => state.ticket
  );
  const { notes, loading: notesIsLoading } = useSelector((state) => state.note);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    //eslint-disable-next-line
  }, [isError, message, ticketId]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addNotes({noteText,ticketId}))
    closeModal()
  };

  const onTicketClose = () => {
    dispatch(ticketClose(ticketId));
    toast.success("Ticket closed successfully");
    navigate("/tickets");
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleDateString()}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModal}>
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Notes"
      >
        <button onClick={closeModal} className="btn-close">
          <FaWindowClose style={{ color: "red" }} />
        </button>
        <h2>Add Note</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              value={noteText}
              placeholder="Enter note here"
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">Submit</button>
          </div>
        </form>
      </Modal>

      <h2>Notes</h2>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
