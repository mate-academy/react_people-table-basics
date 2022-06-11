import { Persone } from './Persone';

export interface UpdatedPersone {
  id: number;
  father: Persone | null;
  mother: Persone | null;
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
}
