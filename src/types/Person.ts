interface PersonBase {
  sex: 'm' | 'f';
  born: number;
  died: number;
  name: string;
  slug: string;
}

export interface PersonFromServer extends PersonBase {
  fatherName?: string;
  motherName?: string;
}

export interface Person extends PersonBase {
  father: string;
  mother: string;
}
