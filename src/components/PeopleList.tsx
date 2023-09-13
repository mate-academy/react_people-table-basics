import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slugPerson } = useParams();

  function getPersonName(name: string) {
    return people.find(pers => pers.name === name);
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
        {people.map(({
          sex, born, died, motherName, fatherName, slug, name,
        }) => {
          const mother = motherName
            ? getPersonName(motherName) : undefined;
          const father = fatherName
            ? getPersonName(fatherName) : undefined;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === slugPerson,
              })}
            >
              <td>
                <PersonLink person={({
                  sex, born, died, motherName, fatherName, slug, name,
                })}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonLink person={mother} />
                  )
                  : motherName || (<span>-</span>)}
              </td>
              <td>
                {father
                  ? (
                    <PersonLink person={father} />
                  )
                  : fatherName || (<span>-</span>)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
