import Loader from 'react-loader-spinner';

export const Spinner: React.FC = () => {
  return (
    <div className="spinner">
      <Loader
        type="ThreeDots"
        color="#11192d"
        height={100}
        width={100}
      />
    </div>
  );
};
