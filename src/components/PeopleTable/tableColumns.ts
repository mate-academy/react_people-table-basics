interface TableColumn {
  id: number;
  value: 'name' | 'sex' | 'born' | 'died' | 'mother' | 'father';
  title: string;
}

export const tableColumns: TableColumn[] = [
  { id: 1, value: 'name', title: 'Name' },
  { id: 2, value: 'sex', title: 'Sex' },
  { id: 3, value: 'born', title: 'Born' },
  { id: 4, value: 'died', title: 'Died' },
  { id: 5, value: 'mother', title: 'Mother' },
  { id: 6, value: 'father', title: 'Father' },
];
