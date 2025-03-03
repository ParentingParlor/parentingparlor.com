import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tag - parentingparlor',
  description: 'Browse topics by tag',
};

export default function TagLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}