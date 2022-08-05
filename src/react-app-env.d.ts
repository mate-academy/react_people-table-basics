// eslint-disable-next-line
/// <reference types="react-scripts" />
interface PersonaData {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
}

interface Person extends PersonaData {
  mother: PersonaData | null;
  father: PersonaData | null;
}
