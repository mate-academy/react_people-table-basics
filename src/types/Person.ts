/**
 * Represents a person in the family tree
 */
export interface Person {
  /** Full name of the person */
  name: string;
  /** Gender: 'm' for male, 'f' for female */
  sex: 'm' | 'f';
  /** Year of birth */
  born: number;
  /** Year of death */
  died: number;
  /** Name of the father (if known) */
  fatherName: string | null;
  /** Name of the mother (if known) */
  motherName: string | null;
  /** URL-friendly identifier */
  slug: string;
  /** Reference to mother object (populated after processing) */
  mother?: Person;
  /** Reference to father object (populated after processing) */
  father?: Person;
}
