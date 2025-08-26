import React from 'react';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
};

type Props = {
  people: Person[] | undefined;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedUser = slug ? slug : 0;

  return (
    <>
      {people?.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
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
            {people?.map(person => {
              const found = people.find(
                data => data.name === person.motherName,
              );
              const foundDad = people.find(
                data => data.name === person.fatherName,
              );

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={
                    selectedUser === person.slug ? 'has-background-warning' : ''
                  }
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {found ? (
                      <PersonLink person={found} />
                    ) : (
                      person.motherName || '-'
                    )}
                  </td>

                  <td>
                    {foundDad ? (
                      <PersonLink person={foundDad} />
                    ) : (
                      person.fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
