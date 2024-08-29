import { Person } from '../types';
import { useOutletContext, useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { findPersonSlugByName } from '../helpers/helpers';
// eslint-disable-next-line max-len
import { PersonRelationItem } from '../components/PersonRelationItem/PersonRelationItem';

interface Props {
  peopleList: Person[];
  isError: boolean;
}

export const PeopleTable = () => {
  const { peopleList, isError } = useOutletContext<Props>();
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
        {!isError &&
          (peopleList.length ? (
            peopleList.map(person => {
              const woman = findPersonSlugByName(person.motherName, peopleList);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={
                    slug === person.slug ? 'has-background-warning' : ''
                  }
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
            })
          ) : (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ))}
      </tbody>
    </table>
  );
};
