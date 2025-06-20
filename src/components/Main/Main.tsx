import { Outlet } from "react-router-dom";

export const Main = () => (
  <main className="section">
    <div className="container">
      <Outlet />
    </div>
  </main>
);
