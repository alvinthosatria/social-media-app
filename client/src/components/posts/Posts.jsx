import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  //fetch all posts using react query, but you can also use useEffect and redux

  

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
