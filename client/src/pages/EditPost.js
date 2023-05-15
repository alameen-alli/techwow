import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    fetch("http://localhost:4040/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      });
    });
  }, []);

  async function UpdatePost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files[0]);
    }

    e.preventDefault();
    console.log(files);

    const response = await fetch("http://localhost:4040/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    // <div>
    //   <form onSubmit={UpdatePost}>
    //     <input
    //       type="text"
    //       placeholder="Title"
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //     />
    //     <input
    //       type="text"
    //       placeholder="Summary"
    //       value={summary}
    //       onChange={(e) => setSummary(e.target.value)}
    //     />
    //     <input type="file" onChange={(e) => setFiles(e.target.files)} />
    //     <ReactQuill
    //       value={content}
    //       modules={modules}
    //       formats={formats}
    //       onChange={(newValue) => setContent(newValue)}
    //     />
    //     <button className="post">Update Post</button>
    //   </form>
    // </div>

    <div className="mt-16">

      <form className="update" onSubmit={UpdatePost} >
        <div className="border-b border-gray-900/10">
          <h1 className="text-base font-semibold leading-7 text-gray-900">Update Post</h1>

          <div>
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Edit Post Title</label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>

          <div className="mt-5">
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Edit Post Summary</label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" type="text" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>
          </div>

          <div class="col-span-full mt-5">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                </svg>
                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer rounded-md  font-semibold  focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" onChange={(e) => setFiles(e.target.files)} class="sr-only" />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* <div className="mt-5">
      <label for="Post Image" class="block text-sm font-medium leading-6 text-gray-900">Input Post Image</label>
      <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
        <input className="block flex-1 border-0 bg-transparent py-3 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" type="file" onChange={(e) => setFiles(e.target.files)} />
      </div>
    </div> */}

          <div className="mt-5">
            <label for="Post Content" class="block text-sm font-medium leading-6 text-gray-900">Input Post Content</label>
            <div>
              <ReactQuill value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)} className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end w-full">
          <button className="post loginbtn px-5 py-3 text-gray-50">Update Post</button>
        </div>
      </form>

    </div>
  );
}
