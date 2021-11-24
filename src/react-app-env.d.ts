// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Human {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: stirng,
  slug: string,
}

interface PreparedHuman extends Human {
  mother?: Human,
  father?: Human,
}
