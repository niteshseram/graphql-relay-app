'use client';
import { RelayEnvironmentProvider } from 'react-relay';
import { getCurrentEnvironment } from './environment';

export default function RelayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const environment = getCurrentEnvironment();
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
