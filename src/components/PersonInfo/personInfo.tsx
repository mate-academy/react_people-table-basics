import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
};

export const PersonInfo: React.FC<Props> = ({ person }) => (
  <>
    <td>
      <PersonLink slug={person.slug} text={person.name} sex={person.sex} />
    </td>

    <td>
      { person.sex }
    </td>

    <td>
      { person.born }
    </td>

    <td>
      { person.died }
    </td>

    <td>
      { person.mother ? (
        <PersonLink
          slug={person.mother.slug}
          text={person.mother.name}
          sex={person.mother.sex}
        />
      ) : (
        person.motherName
      ) }
    </td>

    <td>
      { person.father ? (
        <PersonLink
          slug={person.father.slug}
          text={person.father.name}
          sex={person.father.sex}
        />
      ) : (
        person.fatherName
      ) }
    </td>
  </>
);
