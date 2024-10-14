import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { ErrorPage } from "./ErrorPage"
import { PeoplePage } from "./PeoplePage"
import { App } from "../App"
import { HomePage } from "./HomePage"

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />}/>
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
    </HashRouter>
  )
}
