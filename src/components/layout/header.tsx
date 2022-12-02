import { Box, Center, Link, Stack } from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';

export const Header = () => (
  <Box h="16">
    <Center h="100%">
      <Stack direction="row" spacing="1" justify="space-between" align="center">
        <Box>
          <Link role="button" as={NavLink} to="/">
            Home
          </Link>
        </Box>
        <Box>
          <Link role="button" as={NavLink} to="/homerooms">
            Homerooms
          </Link>
        </Box>
        <Box>
          <Link role="button" as={NavLink} to="/students">
            Students
          </Link>
        </Box>
        <Box>
          <Link role="button" as={NavLink} to="/grades">
            Grades
          </Link>
        </Box>
      </Stack>
    </Center>
  </Box>
);
