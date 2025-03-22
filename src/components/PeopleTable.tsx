import { useContext } from 'react';
import { StateContext } from '../store/GlobalContextProvider';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

export const PeopleTable: React.FC = () => {
  const { people } = useContext(StateContext);
  const { slug: slugParam } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'].map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              className={cn({ 'has-background-warning': slug === slugParam })}
              key={slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
