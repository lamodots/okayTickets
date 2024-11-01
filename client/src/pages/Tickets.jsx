import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import { getTickets, reset } from "../features/tickets/ticketSlice";

function Tickets() {
  const { tickets, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    dispatch(getTickets());

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  //eslint-disable-next-line  
  }, [isSuccess, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default Tickets;
