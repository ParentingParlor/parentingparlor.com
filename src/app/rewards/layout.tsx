import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rewards Marketplace - parentingparlor',
  description: 'Redeem your points for exclusive partner offers and products',
};

export default function RewardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}