import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  personSlug?: string;
};

export const PeopleTable:React.FC<Props> = ({ people, personSlug }) => {
  const getParent = (parentName: string | null) => {
    return people.find(({ name }) => name === parentName) || null;
  };

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
        {people.map(person => {
          const {
            slug, sex, born, died, motherName, fatherName,
          } = person;

          const mother = getParent(motherName);
          const father = getParent(fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn(
                { 'has-background-warning': slug === personSlug },
              )}
            >
              <td><PersonLink person={person} /></td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {!motherName && ('-')}
                {motherName && mother
                  ? (<PersonLink person={mother} />)
                  : (motherName)}
              </td>
              <td>
                {!fatherName && ('-')}
                {fatherName && father
                  ? (<PersonLink person={father} />)
                  : (fatherName)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
