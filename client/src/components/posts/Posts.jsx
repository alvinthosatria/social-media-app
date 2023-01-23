import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  //fetch all posts using react query, but you can also use useState, useEffect and redux
  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );
  
  return (
    <div className="posts">
        {error 
          ? "Something went wrong!" 
          : isLoading 
          ? "loading" 
          : data.map((post) => <Post post={post} key={post.id} />)
        }
    </div>
  )
};

export default Posts;
