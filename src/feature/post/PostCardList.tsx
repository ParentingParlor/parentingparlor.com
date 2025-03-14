import PostCard from "./PostCard"
import { PostProvider } from "./postContext"
import { RelatedPost } from "./postTypes"

export default function PostCardList(props: {
  posts: RelatedPost[]
}) {
  const cards = props.posts.map(post => {
    return (
      <PostProvider key={post.id} row={post}>
        <PostCard />
      </PostProvider>
    )
  })
  return <>{cards}</>
}