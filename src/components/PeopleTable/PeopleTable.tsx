import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  peoples: Person[];
}

export const PeopleTable = ({ peoples }: Props) => {
  const { newId } = useParams();

  return (
    <>
      {peoples.map(people => (
        <tr
          key={people.name}
          data-cy="person"
          className={cn({
            'has-background-warning': people.slug === newId,
          })}
        >
          <td>
            <PersonLink
              slug={people.slug}
              name={people.name}
              isDangerous={people.sex === 'f'}
            />
          </td>

          <td>{people.sex}</td>
          <td>{people.born}</td>
          <td>{people.died}</td>

          <td>
            {people.motherName ? (
              <PersonLink
                slug={
                  peoples.find(p => p.name === people.motherName)?.slug || ''
                }
                name={people.motherName}
                isDangerous={true}
              />
            ) : (
              '-'
            )}
          </td>

          <td>
            {people.fatherName ? (
              <PersonLink
                slug={
                  peoples.find(p => p.name === people.fatherName)?.slug || ''
                }
                name={people.fatherName}
                isDangerous={false}
              />
            ) : (
              '-'
            )}
          </td>
        </tr>
      ))}
    </>
  );
};
