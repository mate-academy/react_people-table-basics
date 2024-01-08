import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';
import { PeopleList } from './PeopleList';
import { getParents } from '../utils/getParents';
import { NoPeople } from './NoPeople';

export const PeoplePage = () => {
  const [content, setContent] = useState<JSX.Element>(<Loader />);

  useEffect(() => {
    getPeople()
      .then(data => {
        const peopleWithParents = getParents(data);

        if (data.length) {
          setContent(<PeopleList people={peopleWithParents} />);
        } else {
          setContent(<NoPeople />);
        }
      })
      .catch(() => setContent(ErrorMessage));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {content}
        </div>
      </div>
    </>
  );
};
