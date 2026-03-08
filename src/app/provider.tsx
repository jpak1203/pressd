import { ChakraProvider } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { pressdSystem } from './theme';

type ProviderProps = {
	children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
	return <ChakraProvider value={pressdSystem}>{children}</ChakraProvider>;
};

export default Provider;
