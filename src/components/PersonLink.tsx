import { NavLink } from 'react-router-dom';

type Props = {
  personSlug: string;
  personName: string;
  personSex: string;
};

export const PersonLink: React.FC<Props> = ({
  personSlug,
  personName,
  personSex,
}: Props) => {
  return (
    <NavLink
      className={personSex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${personSlug}`}
    >
      {personName}
    </NavLink>
  );
};
