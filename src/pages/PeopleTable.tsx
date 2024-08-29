import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { findPersonSlugByName } from '../helpers/helpers';
// eslint-disable-next-line max-len
import { PersonRelationItem } from '../components/PersonRelationItem/PersonRelationItem';
import { FC } from 'react';

interface Props {
  peopleList: Person[];
}

export const PeopleTable: FC<Props> = ({ peopleList }) => {
  const { slug } = useParams();

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
        {peopleList.map(person => {
          const woman = findPersonSlugByName(person.motherName, peopleList);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  <PersonRelationItem
                    keyValue={person.motherName}
                    peopleList={peopleList}
                    woman={woman}
                  />
                }
              </td>
              <td>
                {
                  <PersonRelationItem
                    keyValue={person.fatherName}
                    peopleList={peopleList}
                  />
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
