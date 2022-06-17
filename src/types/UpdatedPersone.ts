import { Persone } from './Persone';

export interface UpdatedPersone {
  name: string,
  sex: string,
  born: number,
  died: number,
  father: Persone | null,
  mother: Persone | null,
  id: number,
  fatherName: string,
  motherName: string,
  slug: string,
}
