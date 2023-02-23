import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  if (people.length === 0) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  const peopleWithParents = people.map(human => ({
    ...human,
    mother: people.find(person => person.name === human.motherName) || null,
    father: people.find(person => person.name === human.fatherName) || null,
  }));

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
        {peopleWithParents.map(person => {
          const {
            name,
            sex,
            born,
            died,
            slug,
            motherName,
            fatherName,
            mother,
            father,
          } = person;

          const isSelected = selectedSlug === slug;
          const editedMotherName = motherName || '-';
          const editedFatherName = fatherName || '-';

          return (
            <tr
              key={name}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink
                  slug={slug}
                  name={name}
                  sex={sex}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonLink
                      slug={mother.slug}
                      name={editedMotherName}
                      sex={mother.sex}
                    />
                  )
                  : editedMotherName}
              </td>
              <td>
                {father
                  ? <PersonLink slug={father.slug} name={editedFatherName} />
                  : editedFatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
