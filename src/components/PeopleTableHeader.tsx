import { FC } from 'react';

interface PeopleTableHeaderProps {
  titles: string[]
}

export const PeopleTableHeader: FC<PeopleTableHeaderProps> = ({ titles }) => (
  <thead>
    <tr>
      {titles.map(title => (
        <th key={title}>{title}</th>
      ))}
    </tr>
  </thead>
);
