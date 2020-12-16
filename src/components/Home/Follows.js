import React from "react";
import { Link } from "react-router-dom";
import { FollowButtonContainer } from "../Reusable/FollowButtonContainer";
export default function Follows(props) {
  let checked = props.data.check;
  return (
    <div className="border-2 rounded-lg border-black">
      <div className="bg-white">
        <div className="flex px-2 items-center justify-center flex-row">
          <Link className="flex items-center" to={`/user/${props.data.username}/`}>
            <img
              className="rounded-full m-1 w-3/12"
              src={props.data.photo}
              alt="userProfile"
            />
            <div className="flex justify-center mx-4 flex-col">
              <div>
                <p className="my-2 text-lg">{props.data.username}</p>
              </div>
              <p className="my-2">{props.data.bio}</p>
            </div>
          </Link>
          <FollowButtonContainer user={props.data.username} />
          <input
            onClick={props.Follow}
            onChange={() => (checked = !checked)}
            defaultChecked={props.data.follow}
            id={props.data.username}
            className="hidden"
            type="checkbox"
          ></input>
        </div>
      </div>
    </div>
  );
}
