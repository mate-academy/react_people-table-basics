import { memo, FC } from 'react';
import { Person } from '../../types/Person';

type Props = {
  header: string[],
  person: Person,
};

export const PersoneRow: FC<Props> = memo(({ person, header }) => {
  return (
    <tr key={person.slug}>
      {header.map(key => <td>{person[key as keyof Person]}</td>)}
    </tr>
  );
});
