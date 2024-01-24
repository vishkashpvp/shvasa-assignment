import { Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";

export default function App() {
  return (
    <div className="container p-2 mx-auto">
      <TopNav />

      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
