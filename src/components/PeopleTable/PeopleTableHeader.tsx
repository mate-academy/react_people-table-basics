import { memo, FC } from 'react';

type Props = {
  header: string[],
};

export const PeopleTableHeader: FC<Props> = memo(({ header }) => {
  return (
    <thead>
      {header.map((name) => <th key={name}>{name}</th>)}
    </thead>
  );
});
