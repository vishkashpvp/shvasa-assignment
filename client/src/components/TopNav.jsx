import { NavLink } from "react-router-dom";

export default function TopNav() {
  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <NavLink to="/ticket">
          <img
            className="w-32"
            src="https://d2jqv2wi58689p.cloudfront.net/shvasa-logo.svg"
            alt="shvasa logo"
          />
        </NavLink>

        <ul className="flex">
          <li>
            <NavLink
              to="/ticket"
              className={({ isActive }) =>
                isActive ? "px-3 py-2 border-b-2 border-b-[#f96500]" : "px-3 py-2"
              }
            >
              Ticket
            </NavLink>
          </li>
          <li className="mx-10">
            <NavLink
              to="/agent"
              className={({ isActive }) =>
                isActive ? "px-3 py-2 border-b-2 border-b-[#f96500]" : "px-3 py-2"
              }
            >
              Agent
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
