import { Wrapper } from '../components/Wrapper';
import { Spinner } from '../components/Spinner';
import { usePeople } from '../lib/hooks/usePeople';
import { PeopleTable } from '../components/PeopleTable';

import './PeoplePage.scss';

export const PeoplePage = () => {
  const { people, isLoading, hasLoadingError } = usePeople();

  return (
    <section className="PeoplePage">
      <Wrapper>
        <h1 className="PeoplePage__title">People Page</h1>
        {hasLoadingError && (
          <p>
            We&apos;re sorry, but we couldn&apos;t fetch people from the server
          </p>
        )}

        {isLoading && <Spinner />}

        {people && (
          <PeopleTable people={people} className="PeoplePage__people-table" />
        )}
      </Wrapper>
    </section>
  );
};
