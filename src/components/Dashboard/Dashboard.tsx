import { useOutletContext } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Password from '../Password/Password';

type ContextType = {
  data: Data[],
  setData: React.Dispatch<React.SetStateAction<Data>>,
};

export default function Dashboard() {
  const { data, setData } = useOutletContext<ContextType>();

  const handleClick = () => {
    const newItem: Data = {
      title: '',
      password: '',
      login: '',
    };

    if (newItem.title && newItem.login && newItem.password) {
      setData([...data, newItem]);
    }
  };

  return (
    <div>
      {data.map(item => (
        <Password data={item} />
      ))}

      <Button
        variant="primary"
        type="submit"
        onClick={handleClick}
      >
        Add more
      </Button>
    </div>
  );
}
