import { useState } from 'react';
import { Route } from 'react-router-dom';
import PeopleList from '../../components/PeopleList';

export const PeoplPage = () => {
  const [onLoad, setOnLoad] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [peopleLength, setPeopleLength] = useState(1);

  const warning = onLoad || serverError || peopleLength === 0;

  retrun(
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
    </Route>,
  );
};
