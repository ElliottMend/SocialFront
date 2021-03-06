import React, { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./Homepage";
import { usernameContext } from "../Context/usernameContext";
import history from "../Routes/History";
export default function HomepageContainer() {
  const [state, setState] = useState({
    radiusName: "",
    radius: 0.8,
    sorting: "recent",
  });
  const [username] = useState(usernameContext);
  const [error, setError] = useState();
  const [posts, setPosts] = useState();
  const [follows, setFollows] = useState();
  const [more] = useState(true);
  useEffect(() => {
    let isCancelled = false;
    getPosts().then((items) => {
      if (!isCancelled) {
        setPosts(items);
      }
    });
    getFollows().then((items) => {
      if (!isCancelled) {
        setFollows(items);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [state.radius]);
  const getPosts = async () => {
    const posts = await axios({
      method: "post",
      url: "http://localhost:5000/locationPosts",
      data: {
        radius: state.radius,
      },
      withCredentials: true,
    });
    if (posts.status === 200) {
      return posts.data;
    } else {
      history.push(`/users/${username}/edit`);
    }
  };
  const getFollows = async () => {
    const follow = await axios({
      method: "get",
      url: "http://localhost:5000/follows",
      withCredentials: true,
    });
    return follow.data;
  };
  const changeRadius = (e) => {
    switch (e.target.value) {
      case "Global":
        setState({ ...state, radius: 1000 });
        return;
      default:
        setState({ ...state, radius: 0.8 });
        return;
    }
  };
  const newPost = async (e) => {
    e.preventDefault();
    if (state.body.length > 140) {
      setError("The maximum length of a post is 140 characters");
      return;
    } else {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/newpost",
        data: {
          body: state.body,
        },
        withCredentials: true,
      });
      const data = res.data;
      setTimeout(() => {
        setPosts([data, ...posts]);
      }, 100);
    }
  };
  const sortPostDate = () => {
    let arr = [];
    arr = posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    setPosts([...arr]);
  };
  const sortPostLikes = () => {
    let arr = [];
    arr = posts.sort((a, b) => (a.likes > b.likes ? 1 : -1));
    setPosts([...arr]);
  };
  const postSort = (e) => {
    switch (e.target.value) {
      case "liked":
        sortPostLikes("liked");
        return;
      default:
        sortPostDate("recent");
        return;
    }
  };
  const handleChange = (e) => {
    if (e.target.value.length === 140) {
      setError("The maximum length of a post is 140 characters");
    } else {
      setError("");
      setState({
        ...state,
        body: e.target.value,
      });
    }
  };
  return (
    <div>
      <Homepage
        more={more}
        error={error}
        newPost={newPost}
        postSort={postSort}
        changeRadius={changeRadius}
        handleChange={handleChange}
        data={state}
        follows={follows}
        posts={posts}
      />
    </div>
  );
}
