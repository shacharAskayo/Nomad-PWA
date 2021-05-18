import { useEffect, useState } from "react";
import { Post } from "./Post";

export function Posts({posts}){
  const [sortedFeed, setSortedFeed] = useState([])



  useEffect(() => {
      if(posts){
          const copyPosts=JSON.parse(JSON.stringify(posts))
          const sortedFeedCopy = copyPosts.sort((a, b) => b.createdAt - a.createdAt)
          setSortedFeed(sortedFeedCopy)
        }
  }, [posts])

    return (
        <div className="posts-container">
            {sortedFeed?.map(post => <Post key={Math.random(20000)}  post = { post } /> )}
        </div>
    )
}