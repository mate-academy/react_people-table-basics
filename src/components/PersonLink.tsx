import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  link: string;
  text: string;
  personSex: string;
};

export const PersonLink: FC<Props> = ({ link, text, personSex }) => {
  return (
    <Link
      to={link}
      className={classNames({
        'has-text-danger': personSex === 'f',
      })}
    >
      {text}
    </Link>
  );
};
