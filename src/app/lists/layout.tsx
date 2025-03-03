import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Lists - parentingparlor',
  description: 'Manage your parenting lists and registries',
};

export default function ListsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}