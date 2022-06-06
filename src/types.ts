export interface Persone {
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  name: string;
  sex: string;
  slug: string;
}

export interface NewPersone {
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  name: string;
  sex: string;
  slug: string;
  mother: Persone;
  father: Persone;
  id: string;
}