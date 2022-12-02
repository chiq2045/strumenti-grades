import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { SkipNavLink, SkipNavContent } from '@chakra-ui/skip-nav';
import { Header } from './header';

export const Layout = () => {
  return (
    <div>
      <SkipNavLink />
      <Container>
        <Header />
        <SkipNavContent />
        <Outlet />
        {/* <Flex */}
        {/*   direction='column' */}
        {/*   width={{ base: 'calc(100% - size-500', M: 'calc(100% - size-1000)' }} */}
        {/*   gap='size-100' */}
        {/*   height='100%' */}
        {/* > */}
        {/*   <View height='size-800'> */}
        {/*         <ButtonGroup> */}
        {/*             <Link to='/'> */}
        {/*           <Button variant='secondary'> */}
        {/*           Home */}
        {/*           </Button> */}
        {/*           </Link> */}
        {/*           {/1* <Button variant='secondary'> *1/} */}
        {/*           {/1*   <Link to='/'>Home</Link> *1/} */}
        {/*           {/1* </Button> *1/} */}
        {/*           {/1* <Button variant='secondary'> *1/} */}
        {/*           {/1*   <Link to='/'>Home</Link> *1/} */}
        {/*           {/1* </Button> *1/} */}
        {/*           {/1* <Button variant='secondary'> *1/} */}
        {/*           {/1*   <Link to='/'>Home</Link> *1/} */}
        {/*           {/1* </Button> *1/} */}
        {/*         </ButtonGroup> */}
        {/*   </View> */}
        {/*   <View> */}
        {/*     <Outlet /> */}
        {/*   </View> */}
        {/* </Flex> */}
      </Container>
    </div>
  );
};
