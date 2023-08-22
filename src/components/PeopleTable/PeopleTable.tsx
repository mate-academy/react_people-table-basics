import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { Loader } from '../Loader';

type Props = {
  person: Person[]
  isLoading: boolean
};
export const PeopleTable: React.FC<Props> = ({ person, isLoading }) => {
  const { slug } = useParams();
  const findParent = (persons: Person[], parentName: string | null) => {
    return persons.find(parent => parent.name === parentName);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
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
          {person.map(personItem => {
            const father = findParent(person, personItem.fatherName);
            const mother = findParent(person, personItem.motherName);

            return (
              <tr
                key={personItem.slug}
                data-cy="person"
                className={cn(
                  { 'has-background-warning': personItem.slug === slug },
                )}
              >
                <td>
                  <Link className={cn({ 'has-text-danger': personItem.sex === 'f' })} to={`/people/${personItem.slug}`}>
                    {personItem.name}
                  </Link>
                </td>

                <td>{personItem.sex}</td>
                <td>{personItem.born}</td>
                <td>{personItem.died}</td>
                <td>
                  {mother ? (<Link className="has-text-danger" to={`/people/${mother.slug}`}>{personItem.motherName}</Link>) : (
                    personItem.motherName || '-'
                  )}
                </td>
                <td>
                  {father ? (<Link to={`/people/${father.slug}`}>{personItem.fatherName}</Link>) : (
                    personItem.fatherName || '-'
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

export default PeopleTable;
