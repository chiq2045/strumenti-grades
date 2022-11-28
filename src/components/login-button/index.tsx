import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@adobe/react-spectrum';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="primary"
      onPress={() => {
        loginWithRedirect();
      }}
    >
      Log In
    </Button>
  );
};
