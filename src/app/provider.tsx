'use client';

import { ChakraProvider } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { pressdSystem } from './theme';

type ProviderProps = {
	children: ReactNode;
};

export function Provider({ children }: ProviderProps) {
	return <ChakraProvider value={pressdSystem}>{children}</ChakraProvider>;
}
