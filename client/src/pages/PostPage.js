import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const { currentUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:4040/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <div className="post-page mt-16 bg-[#F8FAFC]  rounded-3xl sm:py-8 sm:px-12 drop-shadow-sm  lg:items-center lg:p-8 border border-slate-50 hover:bg-secondary hover:text-accent group-hover:block group-hover:opacity-100">
      <h1 className="postTitle text-2xl font-bold tracking-tight st-current">{postInfo.title}</h1>
      <p className="info">
        <time>
          {format(new Date(postInfo.createdAt), "MMM dd, yyyy  hh:mm a")}
        </time>
        <a className="author">
          <span className="author">by</span> @{postInfo.author.username}
        </a>
      </p>
      {currentUserInfo.id === postInfo.author._id && (
        <div className="edit-row mt-2">
          <Link to={`/edit/${postInfo._id}`} className="edit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Update Post
          </Link>
        </div>
      )}
      <div className="image">
        <img
          src={`http://localhost:4040/${postInfo.image}`}
          className="max-w-xl rounded-md"
        />
      </div>
      <div className="text-lg mt-16 leading-7 text-gray-900" dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
    </div>
  );
}
