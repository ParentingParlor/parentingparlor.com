import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - parentingparlor',
  description: 'View and manage your parentingparlor profile',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-8xl mx-auto px-4 py-4">
      {children}
    </div>
  );
}