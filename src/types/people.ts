export interface People {
  name: string,
  sex: 'm' | 'f',
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
}

export interface PeopleWithParents extends People {
  father?: People,
  mother?: People,
}
