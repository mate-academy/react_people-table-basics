import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { RenderParentLink } from './RenderParentLink';
import { Person } from '../types/Person';

type PersonProps = {
  peopleState: Person[],
  person: Person,
};

export const PersonComponent: React.FC<PersonProps> = ({
  peopleState, person,
}) => {
  const { chosenPerson } = useParams<{ chosenPerson: string; }>();
  const isChosen = (personName: string) => personName === chosenPerson;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': isChosen(person.slug),
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <RenderParentLink
        parentName={person.motherName}
        peopleState={peopleState}
      />
      <RenderParentLink
        parentName={person.fatherName}
        peopleState={peopleState}
      />
    </tr>
  );
};
