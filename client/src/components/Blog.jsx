export default function Blog({
    postId,
    title,
    author,
    content,
    onOpen,
    onEdit,
    onDelete,
  }) {
    return (
      <>
        <section className="p-4 w-full rounded-lg bg-gray-200 ring-1 ring-gray-300 shadow-inner">
          <div className="bg-gray-300 w-fit px-2 py-1 rounded-lg shadow mb-8">
            <span className="text-gray-600 text-sm">
              Post ID: {postId || "N/A"}
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl tracking-tight">{title || "Untitled Post"}</h2>
            <p className="text-gray-600 text-sm">
              By {author || "Unknown Author"}
            </p>
            <p className="text-gray-700 pt-6">
              {content ||
                "No content available for this post. Please check back later!"}
            </p>
          </div>
          <div className="grid grid-cols-12 gap-2 mt-4">
            <button
              onClick={onOpen}
              className="col-span-4 flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 transition duration-300 ease-in-out px-4 py-2 rounded-lg text-white"
            >
              Open
            </button>
            <button
              onClick={onEdit}
              className="col-span-4 flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 transition duration-300 ease-in-out px-4 py-2 rounded-lg text-white"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="col-span-4 flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 transition duration-300 ease-in-out px-4 py-2 rounded-lg text-white"
            >
              Delete
            </button>
          </div>
        </section>
      </>
    );
  }
  