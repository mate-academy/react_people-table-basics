import { useParams } from 'react-router-dom';

const PersonPage = () => {
  const { personSlug } = useParams();

  return (
    <div>
      <h1>Person Details</h1>
      <p>Slug: {personSlug}</p>
    </div>
  );
};

export default PersonPage;
