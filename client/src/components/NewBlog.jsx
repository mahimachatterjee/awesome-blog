import { useState } from "react";

export default function NewBlog({ onBlogCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          author,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to create blog");
      }

      const newBlog = await response.json();
      setSuccess("Blog created successfully!");
      setTitle("");
      setContent("");
      setAuthor("");
      setError(null);

      if (onBlogCreated) onBlogCreated(newBlog);
    } catch (err) {
      console.error("Error creating blog:", err.message);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 border rounded shadow-sm">
      <h3 className="font-semibold text-lg">Create New Blog</h3>
      <form className="mt-4 flex flex-col space-y-4" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <input
          type="text"
          placeholder="Blog Title"
          className="p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Blog Content"
          className="p-2 border rounded"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Blog Author"
          className="p-2 border rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
