import { Navigate, Route, HashRouter as Router, Routes } from "react-router-dom"
import { Home } from "./pages/HomePage"
import { App } from "./App"
import { People } from "./pages/PeoplePage"
import { NotFoundPage } from "./pages/NotFoundPage"

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people" element={<People />} >
            <Route path=":selectedPeople?" element={<NotFoundPage />} />
          </Route>


          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
