import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Baby Name Wizard - parentingparlor',
  description: 'Find the perfect name for your little one',
};

export default function BabyNamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}