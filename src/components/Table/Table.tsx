import { Person } from '../../types';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const Table: React.FC<Props> = () => {
  return (
    <h1>Some content</h1>
  );
};
