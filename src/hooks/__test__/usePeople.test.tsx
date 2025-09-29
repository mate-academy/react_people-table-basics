import { renderHook } from '@testing-library/react-hooks';
import { usePeople } from '../usePeople';

interface PersonResponse {
  name: string;
  sex: 'm' | 'f' | string;
  born?: number;
  died?: number;
  motherName?: string;
  fatherName?: string;
  slug: string;
}

const mockPeople: PersonResponse[] = [
  {
    name: 'Emma de Milliano',
    sex: 'f',
    born: 1876,
    died: 1956,
    fatherName: 'Petrus de Milliano',
    motherName: 'Sophia van Damme',
    slug: 'emma-de-milliano-1876',
  },
];

type FetchMock = jest.Mock<Promise<Response>, [RequestInfo, RequestInit?]>;

describe('usePeople', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    const mockJson = () =>
      Promise.resolve(mockPeople) as Promise<PersonResponse[]>;
    const mockResponse = {
      ok: true,
      json: mockJson,
    } as unknown as Response;

    global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as FetchMock;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.resetAllMocks();
  });

  it('loads people', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePeople());

    await waitForNextUpdate();
    expect(result.current.people.length).toBeGreaterThan(0);
  });
});
