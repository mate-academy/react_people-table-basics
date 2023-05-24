import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

type Props = {
  peoples: Person[];
  selectedSlug: string;
  isError: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  peoples,
  selectedSlug,
  isError,
}) => {
  if (!isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
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
        {peoples.map(people => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = people;
          const isSelected = slug === selectedSlug;
          const findMother = peoples.find(({ name }) => name === motherName);
          const findFather = peoples.find(({ name }) => name === fatherName);
          const isMomExist = motherName || '-';
          const isFatherExist = fatherName || '-';

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <td>
                <PersonLink person={people} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {findMother
                  ? <PersonLink person={findMother} />
                  : isMomExist}
              </td>
              <td>
                {findFather
                  ? <PersonLink person={findFather} />
                  : isFatherExist}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
