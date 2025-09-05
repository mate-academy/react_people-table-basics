import { Loader } from '../components/Loader';
import { useFetch } from '../hooks/useFetch';
import { Person } from '../types';
import { Wrapper } from '../components/Wrapper';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

function PeoplePage() {
  const { data, isLoading, errorMessage } = useFetch<Person>();

  if (isLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  if (errorMessage) {
    return (
      <Wrapper>
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      </Wrapper>
    );
  }

  if (data.length === 0 && !isLoading) {
    return (
      <Wrapper>
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      </Wrapper>
    );
  }

  const people = data.map(person => {
    const father = data.find(person1 => person1.name === person.fatherName);
    const mother = data.find(person1 => person1.name === person.motherName);

    return {
      ...person,
      father,
      mother,
    };
  });

  return (
    <Wrapper>
      <PeopleTable people={people} />
    </Wrapper>
  );
}

export default PeoplePage;
