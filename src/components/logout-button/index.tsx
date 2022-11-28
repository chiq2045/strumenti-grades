import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@adobe/react-spectrum';

export const LoginButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      variant="primary"
      onPress={() => {
        logout({ returnTo: window.location.origin });
      }}
    >
      Logout
    </Button>
  );
};
