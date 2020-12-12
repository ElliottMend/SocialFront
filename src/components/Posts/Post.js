import React, { useState, useEffect } from "react";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import PostContainer from "./PostContainer";
import Modal from "react-modal";
export default function Post(props) {
  useEffect(() => {});
  const date = Date.now() / 1000 - props.data.date / 1000;

  return (
    <div className="my-10">
      <div className="rounded-lg font-semibold text-navy bg-seafoam">
        {props.data && (
          <div>
            <div className="flex items-center justify-between flex-row">
              <div>
                <Link to={`/user/${props.data.author}`}>
                  <img
                    className="w-32 m-6 rounded-full"
                    alt="Profile"
                    src={props.img}
                  />
                </Link>
              </div>
              <div>
                <Link to={`/user/${props.data.author}`}>
                  <h6 className="text-2xl mr-32 self-middle align-middle font-bold">
                    {props.data.author}
                  </h6>
                </Link>
              </div>
            </div>
            <p>{props.data.body}</p>

            <div className="flex mt-10 justify-center flex-row">
              {date < 60 ? (
                <p>{Math.round(date)} seconds ago</p>
              ) : date < 3600 ? (
                <p>{Math.round(date / 60)} minutes ago</p>
              ) : date < 86400 ? (
                <p>{Math.round(date / 3600)} hours ago</p>
              ) : date < 604800 ? (
                <p>{Math.round(date / 86400)} days ago</p>
              ) : date < 2.628e6 ? (
                <p>{Math.round(date / 604800)} weeks ago</p>
              ) : date < 31535965.4396976 ? (
                <p>{Math.round(date / 2592000)} months ago</p>
              ) : (
                31535965.4396976 < date && (
                  <p>{Math.round(date / 31104000)}years ago</p>
                )
              )}
              <p className="ml-10">{props.data.likes}</p>
              <label className="flex" htmlFor={props.data._id}>
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  fill={props.data.liked ? "salmon" : "none"}
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
                id={props.data._id}
                className="hidden"
                defaultChecked={props.data.liked}
                type="checkbox"
                onClick={props.onChange}
              />
              <div>{props.data.location}</div>
            </div>
            {props.data.author === props.username && (
              <button
                className="bg-salmon py-4 px-8 m-2 rounded-lg"
                onClick={props.deletePost}
              >
                Delete Post
              </button>
            )}
            <form className="bg-cream px-4" onSubmit={props.createComment}>
              <input
                className="text-2xl px-3 w-2/3 rounded-lg mb-10"
                onChange={props.commentChange}
                placeholder="comment"
              ></input>
              <button className="m-10 text-2xl">Submit</button>
            </form>
          </div>
        )}
      </div>
      <div>
        {props.comments &&
          props.comments
            .slice(0, 3)
            .map(
              (e, index) =>
                e.show && (
                  <Comments
                    postAuthor={props.data.author}
                    deleteComment={() => props.deleteComment(index)}
                    key={e._id}
                    data={e}
                  />
                )
            )}
      </div>
      {props.more && (
        <button className="w-full" onClick={props.openModal}>
          <p className="p-4 bg-lime">See More!</p>
        </button>
      )}
      <Modal
        isOpen={props.modal}
        onAfterOpen={props.afterModalOpen}
        onRequestClose={props.closeModal}
      >
        <PostContainer
          deleteComment={(index) => props.deleteComment(index)}
          onChange={props.onChange}
          createComment={props.createComment}
          commentChange={props.commentChange}
          img={props.img}
          comments={props.comments}
          data={props.data}
        />
      </Modal>
    </div>
  );
}
