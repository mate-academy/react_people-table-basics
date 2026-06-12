import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  // Дістаємо slug з URL (наприклад, з /people/jan-van-brussel-1714)
  const { slug } = useParams();

  // Допоміжна функція для пошуку людини за ім'ям
  const getPersonByName = (name: string) => {
    return people.find(p => p.name === name);
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
          // Перевіряємо, чи збігається slug рядка зі slug в URL
          const isSelected = person.slug === slug;

          // Шукаємо батьків у масиві people
          const mother = person.motherName
            ? getPersonByName(person.motherName)
            : null;
          const father = person.fatherName
            ? getPersonByName(person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              {/* Логіка для матері */}
              <td>
                {!person.motherName ? (
                  '-' // Якщо імені немає взагалі
                ) : mother ? (
                  <PersonLink person={mother} /> // Якщо мати є в базі
                ) : (
                  person.motherName // Якщо ім'я є, але в базі такої людини немає
                )}
              </td>

              {/* Логіка для батька */}
              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
