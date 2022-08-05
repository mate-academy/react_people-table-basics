export interface Person {
  name: string,
  sex: 'm' | 'f',
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
}

export interface PeopleTableProps {
  people: Person[],
}
