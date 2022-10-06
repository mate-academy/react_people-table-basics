import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();
  const findParent = (peopleList: Person[], name: string) => (
    peopleList.find(person => person.name === name) || null
  );

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
        {
          people.map(person => (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames(
                { 'has-background-warning': person.slug === slug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  person.motherName
                    ? (
                      <PersonLink
                        person={
                          findParent([...people], person.motherName)
                        }
                        parent={person.motherName}
                      />
                    )
                    : '-'
                }
              </td>
              <td>
                {
                  person.fatherName
                    ? (
                      <PersonLink
                        person={
                          findParent([...people], person.fatherName)
                        }
                        parent={person.fatherName}
                      />
                    )
                    : '-'
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
