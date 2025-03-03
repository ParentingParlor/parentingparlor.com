import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Topic - parentingparlor',
  description: 'Share your parenting experience or ask for advice',
};

export default function CreateLayout({
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