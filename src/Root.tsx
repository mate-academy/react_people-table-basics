import { Navigate, Route, Routes } from 'react-router-dom';
import { Person } from './types';
import { MainLayout } from './components/MainLayout/MainLayout';
import { HomePage } from './components/HomePage/HomePage';
import { PagenotFound } from './components/PagenotFound/PagenotFound';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

type Props = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

export const Root: React.FC<Props> = (
  {
    people,
    setPeople,
  },
) => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="*"
          element={<PagenotFound />}
        />
        <Route
          path="people"
          element={<PeoplePage people={people} setPeople={setPeople} />}
        >
          <Route
            path=":personSlug"
            element={<PeoplePage people={people} setPeople={setPeople} />}
          />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
