import { FC } from 'react';
import { Section } from '../Section/Section';
import { Table } from '../Table/Table';

export const PeoplePage: FC = () => {
  return (
    <Section>
      <h1 className="title">People Page</h1>
      <Table />
    </Section>
  );
};
