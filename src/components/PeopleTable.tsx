import { FC, memo } from 'react';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = memo(({ people }) => (
  <div>
    {people.map(person => (
      <p>{person.name}</p>
    ))}
  </div>
));
