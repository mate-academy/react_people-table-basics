import { People } from '../../types/peopleType';
import { PersonRow } from '../PersonRow';

type PeopleTableProps = {
  people: People[],
};

export const PeopleTable: React.FC<PeopleTableProps> = (props: PeopleTableProps) => {
  const { people } = props;

  return (
    <>
      <table
        className="PeopleTable"
      >
        <thead>
          <tr>
            <td>
              Name:
            </td>
            <td>
              Sex:
            </td>
            <td>
              Born:
            </td>
            <td>
              Died:
            </td>
            <td>
              Mother:
            </td>
            <td>
              Father:
            </td>
          </tr>
        </thead>
        <tbody>
          {people.map(el => {
            return (
              <PersonRow person={el} />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
