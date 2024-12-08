import Blog from "./Blog";

export default function Overview({ blogs }) {
  const onOpen = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch blog details");

      const blog = await response.json();
      console.log("Blog Details:", blog);
      alert(`Blog Details:\n\nTitle: ${blog.title}\nContent: ${blog.content}`);
    } catch (error) {
      console.error("Error fetching blog:", error.message);
      alert("Error fetching blog details");
    }
  };

  const onEdit = async (postId) => {
    const newTitle = prompt("Enter the new title");
    const newContent = prompt("Enter the new content");

    if (!newTitle || !newContent) {
      alert("Both title and content are required to update the blog.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle, content: newContent }),
        }
      );

      if (!response.ok) throw new Error("Failed to update blog");

      const updatedBlog = await response.json();
      console.log("Updated Blog:", updatedBlog);
      alert("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error.message);
      alert("Error updating blog");
    }
  };

  const onDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 204) throw new Error("Failed to delete blog");

      console.log("Blog deleted successfully");
      alert("Blog deleted successfully!");

      window.location.reload();
    } catch (error) {
      console.error("Error deleting blog:", error.message);
      alert("Error deleting blog");
    }
  };

  return (
    <main className="max-w-lg mx-auto my-10 pt-0 p-6">
      <h3 className="font-semibold text-lg">All Blogs</h3>
      <div className="flex flex-col items-center justify-center space-y-6 my-6">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Blog
              key={blog.id}
              postId={blog.id}
              title={blog.title}
              author={blog.author}
              content={blog.content}
              onOpen={() => onOpen(blog.id)}
              onEdit={() => onEdit(blog.id)}
              onDelete={() => onDelete(blog.id)}
            />
          ))
        ) : (
          <p className="text-gray-600 py-20 text-lg tracking-tight">
            No blogs to display.
          </p>
        )}
      </div>
    </main>
  );
}
