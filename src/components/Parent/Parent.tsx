import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

type Props = {
  parent: Person | null;
  parentName: string | null;
};

export const Parent: React.FC<Props> = ({ parent, parentName }) => {
  return (
    <>
      {!!parent && <PersonLink person={parent} />}
      {!!parentName && !parent && `${parentName}`}
      {!parentName && '-'}
    </>
  );
};
