import { Table } from '../../components/Table';

export const People = () => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">{<Table />}</div>
      </div>
    </>
  );
};
