import { Person } from '../types/Person';

type Props = {
  person: Person | null;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({ person, className }) => {
  if (!person) {
    return <>-</>;
  }

  const classes = [className];

  if (person.sex === 'f') {
    classes.push('has-text-danger');
  }

  return (
    <a
      href={`#/people/${person.slug}`}
      className={classes.filter(Boolean).join(' ')}
    >
      {person.name}
    </a>
  );
};
