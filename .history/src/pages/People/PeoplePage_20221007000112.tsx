import { Route } from 'react-router-dom';
import PeopleList from '../../components/PeopleList';

export const PeoplPage = () => {
  
}

retrun (
  <Route
    path="people/"
    element={(
      <>
        <h1 className="title">People Page</h1>
        <PeopleList
          setOnLoad={setOnLoad}
          setServerError={setServerError}
          setPeopleLength={setPeopleLength}
        />
      </>
    )}
  >
    <Route
      index
      element={(
        <>
          <h1 className="title">People Page</h1>
          <PeopleList
            setOnLoad={setOnLoad}
            setServerError={setServerError}
            setPeopleLength={setPeopleLength}
          />
        </>
      )}
    />
    <Route
      path=":personSlug"
      element={(
        <>
          <h1 className="title">People Page</h1>
          <PeopleList
            setOnLoad={setOnLoad}
            setServerError={setServerError}
            setPeopleLength={setPeopleLength}
          />
        </>
      )}
    />
  </Route>
);
