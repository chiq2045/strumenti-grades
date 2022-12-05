import { CreateStandaloneToastReturn } from '@chakra-ui/react';
import { Homeroom } from 'types';
import { instance, responseBody, errorBody } from '../constants';

export const homeroomRequests = (
  toast: CreateStandaloneToastReturn['toast']
) => ({
  getHomerooms: async () => {
    console.log('here');
    return instance('/homerooms')
      .get('/')
      .then((v) => {
        toast({
          title: 'Success',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        return responseBody<Homeroom>(v);
      })
      .catch((e) => {
        toast({
          title: 'Error: Could not retrieve Homerooms',
          description: JSON.stringify(errorBody(e).error),
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
        return errorBody<Homeroom>(e);
      });
  },
});
