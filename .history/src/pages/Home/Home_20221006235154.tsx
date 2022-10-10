import { Route, Routes } from 'react-router-dom';

export const Home = () => {
  return (
    <Route
      path="/"
      element={
        <Routes>
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          />
      }
    />
          );
};
