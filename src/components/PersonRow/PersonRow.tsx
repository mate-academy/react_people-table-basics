import classNames from 'classnames';
import { Person } from '../../types/Person';

import './PersonRow.scss';

type Props = { className?: string } & Person;

export const PersonRow: React.FC<Props> = ({
  name,
  sex,
  born,
  died,
  motherName,
  fatherName,
  className,
}) => {
  return (
    <tr className={classNames('PersonRow', className)}>
      <td className="PersonRow__row-data">{name}</td>
      <td className="PersonRow__row-data">{sex}</td>
      <td className="PersonRow__row-data">{born}</td>
      <td className="PersonRow__row-data">{died}</td>
      <td className="PersonRow__row-data">{motherName || 'Unknown'}</td>
      <td className="PersonRow__row-data">{fatherName || 'Unknown'}</td>
    </tr>
  );
};
