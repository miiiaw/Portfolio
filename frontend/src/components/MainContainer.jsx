import { Outlet } from "react-router-dom";

export default function MainContainer() {
  return (
    <>
      <main id="pageMainContent">
        <Outlet />
      </main>
    </>
  );
}
