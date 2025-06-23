import { useParams } from "react-router-dom";
import { Person } from "../../types/Person";
import { PersonElement } from "../PersonElement";

type Props = {
  peopleList: Person[],
}

export const PeopleTable = ({ peopleList }: Props) => {
  const { slug: selectedSlug } = useParams();

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
        {peopleList.map(person => (
          <PersonElement key={person.slug} person={person} peopleList={peopleList} selectedSlug={selectedSlug} />
        ))}
      </tbody>
    </table>
  );
};
