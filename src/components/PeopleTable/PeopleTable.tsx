import classNames from 'classnames';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import PersonLink from '../PersonLink/PersonLink';

interface PeopleListProps {
  peopleList: Person[];
}

export const PeopleTable: React.FC<PeopleListProps> = ({ peopleList }) => {
  const { slugs } = useParams();

  return (
    <>
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
          {peopleList.map(person => {
            const {
              name,
              sex,
              born,
              died,
              fatherName,
              motherName,
              slug,
              mother,
              father,
            } = person;

            return (
              <tr
                key={slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': slug === slugs,
                })}
              >
                <td>
                  <PersonLink name={name?.trim()} slug={slug} sex={sex} />
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {mother ? (
                    <PersonLink
                      name={motherName?.trim()}
                      slug={mother.slug}
                      sex="f"
                    />
                  ) : (
                    motherName?.trim() || `-`
                  )}
                </td>
                <td>
                  {father ? (
                    <PersonLink
                      name={fatherName?.trim()}
                      slug={father.slug}
                      sex="m"
                    />
                  ) : (
                    fatherName?.trim() || `-`
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
