import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[] | null;
  selectedPerson?: string | null;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const peopleToRender = people?.map(person => {
    const personMother = people.find(
      parent => parent.name === person.motherName,
    );
    const personFather = people.find(
      parent => parent.name === person.fatherName,
    );

    return { ...person, personMother, personFather };
  });

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
        {peopleToRender?.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            personMother,
            personFather,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': person.slug === selectedPerson,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {personMother ? (
                  <PersonLink person={personMother} />
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {personFather ? (
                  <PersonLink person={personFather} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
