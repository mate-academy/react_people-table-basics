import React from 'react';
import { TableColumn } from '../../types/TableColumn';
import { PersonLink } from '../PersonLink/PersonLink';
import { ParentCell } from '../ParentCell/ParentCell';

export const tableColumns: TableColumn[] = [
  {
    title: 'Name',
    key: 'name',
    render: person => <PersonLink person={person} />,
  },
  {
    title: 'Sex',
    key: 'sex',
  },
  {
    title: 'Born',
    key: 'born',
  },
  {
    title: 'Died',
    key: 'died',
  },
  {
    title: 'Mother',
    key: 'motherName',
    render: (person, people) => (
      <ParentCell parentName={person.motherName} people={people} />
    ),
  },
  {
    title: 'Father',
    key: 'fatherName',
    render: (person, people) => (
      <ParentCell parentName={person.fatherName} people={people} />
    ),
  },
];
