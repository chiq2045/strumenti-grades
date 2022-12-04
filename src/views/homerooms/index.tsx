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

  const renderGradeWithSuffix = (grade: number) => {
    let suffix = 'th';

    switch (grade) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      // no default
    }
    return `${grade}${suffix}`;
  };

  console.log(homerooms);
  return (
    <div>
      <h2>Homerooms</h2>
      <ul>
        {homerooms?.data.map(({ id, title, teacher, grade }) => (
          <li key={id}>
            <h2>{title}</h2>
            <p>{teacher}</p>
            <p>{renderGradeWithSuffix(grade)} Grade</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
