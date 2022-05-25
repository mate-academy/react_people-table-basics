import './Dashboard.scss';
import { useOutletContext } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Content from '../Content/Content';

type ContextType = {
  data: Data[],
  setData: React.Dispatch<React.SetStateAction<Data[]>>,
};

export default function Dashboard() {
  const { data, setData } = useOutletContext<ContextType>();

  const handleClick = () => {
    const newItem: Data = {
      id: data.length + 1,
      title: '',
      password: '',
      login: '',
    };

    setData([...data, newItem]);
  };

  return (
    <div>
      {data.map(item => (
        <Content item={item} />
      ))}

      <Button
        variant="primary"
        type="submit"
        onClick={handleClick}
        className="Dashboard__add"
      >
        Add more
      </Button>
    </div>
  );
}
