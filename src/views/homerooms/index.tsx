import { useLoaderData } from 'react-router-dom';
import { CreateStandaloneToastReturn } from '@chakra-ui/react';
import { homeroomRequests } from '../../utils/requests/homerooms';

export const homeroomLoader = async (
  toast: CreateStandaloneToastReturn['toast']
) => {
  return homeroomRequests(toast).getHomerooms();
};

export const Homerooms = () => {
  const homerooms = useLoaderData() as Awaited<
    ReturnType<typeof homeroomLoader>
  >;

  console.log(homerooms);
  return (
    <div>
      <h2>Homerooms</h2>
      <ul>
        {homerooms?.data.map((homeroom) => (
          <li key={homeroom.id}>
            <h2>{homeroom.title}</h2>
            <p>{homeroom.teacher}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
