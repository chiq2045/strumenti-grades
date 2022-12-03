import { Link as NavLink, useRouteError } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Center,
  Link,
} from '@chakra-ui/react';

export const ErrorBoundary = () => {
  const routerError = useRouteError() as { error: Error };

  console.error(routerError);

  return (
    <div>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{routerError.error.message}</AlertDescription>
      </Alert>
      <Box h="16">
        <Center h="100%">
          <Link role="button" as={NavLink} to="/">
            Go Home
          </Link>
        </Center>
      </Box>
    </div>
  );
};
