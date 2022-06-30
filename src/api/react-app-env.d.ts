interface Person {
  name: string,
  sex: string
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
  mother: Person,
  father: Person,
}

interface PeopleParrents extends Person {
  father: People | null;
  mother: People | null;
}
