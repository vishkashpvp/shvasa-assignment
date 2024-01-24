import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="fixed flex flex-col items-center justify-center w-full h-full m-auto">
      <div>
        <h1 className="text-4xl text-red-500">Oops!</h1>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <p>
          Navigate to{" "}
          <Link to="/agent" className="text-[#f96500]">
            Agent
          </Link>{" "}
          or{" "}
          <Link to="/ticket" className="text-[#f96500]">
            Ticket
          </Link>
        </p>
      </div>
    </div>
  );
}
