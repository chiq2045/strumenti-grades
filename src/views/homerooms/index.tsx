import { useLoaderData } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  CreateStandaloneToastReturn,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { homeroomRequests } from '../../utils/requests/homerooms';

export const homeroomLoader = async (
  toast: CreateStandaloneToastReturn['toast']
) => {
  return homeroomRequests(toast).getHomerooms();
};

export const Homerooms = () => {
  const { data } = useLoaderData() as Awaited<
    ReturnType<typeof homeroomLoader>
  >;

  const homerooms = data.sort((a, b) => a.grade - b.grade);

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

  return (
    <div>
      <Heading as='h1'>Homerooms</Heading>
      <List spacing={1}>
        {homerooms.map(({ id, title, teacher, grade }) => (
          <ListItem key={id}>
            <Card>
              <CardHeader>
                <Heading size='md'>
                  {title} - {renderGradeWithSuffix(grade)} Grade
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>{teacher}</Text>
              </CardBody>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
