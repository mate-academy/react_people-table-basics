import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const isSelected = (person: Person) => selectedSlug === person.slug;

  // function getPersonLink(name: string, parents: Person[]) {
  //   const person = parents.find(p => p.name === name);

  //   if (!person) {
  //     return name;
  //   }

  //   return (
  //     <a
  //       href={`#/people/${person.slug}`}
  //       className={classNames({ 'has-text-danger': person.sex === 'f' })}
  //     >
  //       {name}
  //     </a>
  //   );
  // }

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
        {people.map(pers => {
          const motherPerson = pers.motherName
            ? people.find(p => p.name === pers.motherName)
            : undefined;

          const fatherPerson = pers.fatherName
            ? people.find(p => p.name === pers.fatherName)
            : undefined;

          return (
            <tr
              className={classNames({
                'has-background-warning': isSelected(pers),
              })}
              data-cy="person"
              key={pers.name}
            >
              <td>
                <PersonLink person={pers} />
              </td>

              <td>{pers.sex}</td>
              <td>{pers.born}</td>
              <td>{pers.died}</td>
              <td>
                {motherPerson ? (
                  <PersonLink person={motherPerson} />
                ) : (
                  pers.motherName || '-'
                )}
              </td>
              <td>
                {fatherPerson ? (
                  <PersonLink person={fatherPerson} />
                ) : (
                  pers.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
