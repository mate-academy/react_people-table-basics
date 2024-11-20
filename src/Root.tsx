import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { PeoplePage } from "./pages/PeoplePage";



export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/home" element={<Navigate to="/" replace={true} />} />

        <Route index element={<HomePage />} />


        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage /> } />
        </Route>

</Route>
      <Route path="*" action={() => <Navigate to="/" />} />
    </Routes>
  </HashRouter>
);
