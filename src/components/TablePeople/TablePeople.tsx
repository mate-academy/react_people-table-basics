import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { TableInfo } from '../TableInfo';
import { TableItem } from '../TableItem/TableItem';
import { Loader } from '../Loader';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

type Props = {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
};

export const TablePeople: React.FC<Props> = ({
  people,
  isLoading,
  errorMessage,
}) => {
  const { slug } = useParams();

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <ErrorNotification error={errorMessage} />;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableInfo />

      <tbody>
        {people?.length !== 0 ? (
          people.map((person: Person) => (
            <TableItem
              key={person.slug}
              person={person}
              people={people}
              slug={slug}
            />
          ))
        ) : (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
      </tbody>
    </table>
  );
};
