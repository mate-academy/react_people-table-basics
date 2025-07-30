import { useParams } from 'react-router-dom';
import { PeopleList } from './PeopleList';

export const PersonDetails: React.FC = () => {
  const { slug } = useParams();

  return <PeopleList slug={slug} />;
};
