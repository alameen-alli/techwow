import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  title,
  summary,
  content,
  image,
  createdAt,
  author,
  _id
}) {
  return (
    <div className="post px-6 py-4 bg-[#F8FAFC] drop-shadow-sm  rounded-3xl sm:py-8 sm:px-12 lg:flex lg:items-center lg:p-8 border border-slate-50 hover:bg-secondary hover:text-accent group-hover:block group-hover:opacity-100">
      <div className="image">
        <Link to={`post/${_id}`}>
          <img src={"http://localhost:4040/" + image} className="rounded-xl" />
        </Link>
      </div>
      <div className="title">
        <Link to={`post/${_id}`}>
        <h2 className="postTitle font-bold tracking-tight st-current">{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{format(new Date(createdAt), "MMM dd, yyyy  hh:mm a")}</time>
        </p>
        <p className="summary">{summary}</p>
        {/* <p>{_id}</p> */}
      </div>
    </div>
  );
}
