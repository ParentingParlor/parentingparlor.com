import MainContent from '@/components/MainContent';
import PostFeed from '@/feature/post/PostFeed';

export default function Home() {
  return (
    <div className="flex-1 min-w-0">
      <PostFeed />
    </div>
  );
}