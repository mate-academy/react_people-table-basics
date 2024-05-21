// import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import './PeopleTable.scss';

function findParents(people: Person[]) {
  return people.map(person => {
    const findFather = people.find(el => person.fatherName === el.name);
    const findMother = people.find(el => person.motherName === el.name);

    if (findFather && findMother) {
      return { ...person, father: findFather, mother: findMother };
    }

    if (findFather) {
      return { ...person, father: findFather };
    }

    if (findMother) {
      return { ...person, mother: findMother };
    }

    return person;
  });
}

function PeopleTable() {
  const { personSlug } = useParams();
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(findParents(res));
      })
      .catch(() => {
        setErro(true);
      })
      .finally(() => setLoading(true));
  }, []);

  if (!loading) {
    return <Loader />;
  }

  if (erro) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people?.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <>
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === personSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  person.mother ? (
                    <Link
                      className="has-text-danger"
                      to={`/people/${person.mother.slug}`}
                    >
                      {person.mother.name}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  person.father ? (
                    <Link to={`/people/${person.father.slug}`}>
                      {person.father.name}
                    </Link>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
}

export default PeopleTable;
