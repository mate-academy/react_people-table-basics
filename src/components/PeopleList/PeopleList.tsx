import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { LinkOnPerson } from '../LinkOnPeson';

type Props = {
  people: Person[],
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug: selectedPersonSlug = '' } = useParams();

  return (
    <tbody>
      {people.map((person) => {
        return (
          <>
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPersonSlug === person.slug,
              })}
            >
              <td>
                <LinkOnPerson person={person} />
              </td>

              <td>
                {person.sex}
              </td>

              <td>
                {person.born}
              </td>

              <td>
                {person.died}
              </td>

              <td>
                {person.mother
                  ? (
                    <LinkOnPerson person={person.mother} />
                  ) : (
                    person.motherName || '-'
                  )}
              </td>

              <td>
                {person.mother
                  ? (
                    <LinkOnPerson person={person.father} />
                  ) : (
                    person.fatherName || '-'
                  )}
              </td>
            </tr>
          </>
        );
      })}
    </tbody>
  );
};
