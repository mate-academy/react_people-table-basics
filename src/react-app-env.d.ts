// eslint-disable-next-line
/// <reference types="react-scripts" />
export interface PersonFromServer {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName?: string,
  motherName?: string,
  slug: string,
}

export interface Person extends PersonFromServer {
  mother?: Person,
  father?: Person,
}
