import React, { useState } from "react";
import { IPost } from "./PostContainer";
import axios from "axios";
interface IProps {
  data: IPost;
}
interface IState {
  liked: boolean;
  likes: number;
}
export const Likes = (props: IProps) => {
  const [state, setState] = useState<IState>({ liked: false, likes: 0 });
  const handleLike = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const check = e.target.checked;
    setState({ ...state, liked: e.target.checked });
    await axios({
      method: "put",
      url: `http://localhost:5000/${check ? "like" : "unlike"}`,
      data: { id: props.data.post_id },
      withCredentials: true,
    });
    setState((prevState) => ({
      ...prevState,
      likes: check ? prevState.likes + 1 : prevState.likes - 1,
    }));
  };
  return (
    <div>
      <p className="ml-10">{state.likes}</p>
      <label className="flex" htmlFor={String(props.data.post_id)}>
        <svg
          xmlns="https://www.w3.org/2000/svg"
          fill={state.liked ? "salmon" : "none"}
          viewBox="0 0 24 24"
          stroke="salmon"
          className="w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </label>
      <input
        id={String(props.data.post_id)}
        className="hidden"
        defaultChecked={state.liked}
        type="checkbox"
        onChange={handleLike}
      />
    </div>
  );
};