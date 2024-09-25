import { Outlet } from "react-router-dom";

export default function MainContainer() {
  return (
    <>
      <main id="main-container">
        <Outlet />
      </main>
    </>
  );
}
