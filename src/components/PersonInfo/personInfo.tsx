import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  sex: 'f' | 'm',
  slug: string,
  born: number,
  name: string,
  died: number,
  mother?: Person,
  father?: Person,
  fatherName: string | null,
  motherName: string | null,
};

export const PersonInfo: React.FC<Props> = ({
  sex,
  slug,
  born,
  name,
  died,
  mother,
  father,
  fatherName,
  motherName,
}) => (
  <>
    <td>
      <PersonLink slug={slug} text={name} sex={sex} />
    </td>

    <td>
      { sex }
    </td>

    <td>
      { born }
    </td>

    <td>
      { died }
    </td>

    <td>
      { mother ? (
        <PersonLink
          slug={mother.slug}
          text={mother.name}
          sex={mother.sex}
        />
      ) : (
        motherName
      ) }
    </td>

    <td>
      { father ? (
        <PersonLink
          slug={father.slug}
          text={father.name}
          sex={father.sex}
        />
      ) : (
        fatherName
      ) }
    </td>
  </>
);
