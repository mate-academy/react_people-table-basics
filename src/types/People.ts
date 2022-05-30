export type People = {
  name: string,
  sex: string,
  born: number,
  died: number
  fatherName: string,
  motherName: string,
  slug: string,
};

export interface PeopleWithParents extends People {
  father?: People,
  mother?: People,
}
