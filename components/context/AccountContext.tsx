import { createContext } from 'react';

// Create a context with an initial empty value
const AccountContext = createContext<string | null>(null);

export default AccountContext;
