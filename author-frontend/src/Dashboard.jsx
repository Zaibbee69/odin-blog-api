import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:3000";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-sm bg-white" />
          <span className="text-sm font-semibold tracking-tight text-white">
            Author CMS
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400">admin@blog.com</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-white">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

const Sidebar = () => {
  const navItems = [
    {
      label: "Dashboard",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
      active: true,
    },
    {
      label: "Posts",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      ),
    },
    {
      label: "New Post",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      ),
    },
    {
      label: "Comments",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
      ),
    },
  ];

  return (
    <aside className="fixed bottom-0 left-0 top-14 w-56 border-r border-zinc-800 bg-zinc-950 p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              item.active
                ? "bg-zinc-900 text-white"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

const StatCard = ({ label, value, loading }) => {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      {loading ? (
        <div className="mt-2 h-8 w-16 animate-pulse rounded bg-zinc-800" />
      ) : (
        <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      )}
    </div>
  );
};

const PostTable = ({
  posts,
  loading,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
}) => {
  if (loading) {
    return (
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <div className="border-b border-zinc-800 bg-zinc-900/30 px-6 py-4">
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
        </div>
        <div className="divide-y divide-zinc-800">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4">
              <div className="h-4 w-48 animate-pulse rounded bg-zinc-800" />
              <div className="h-4 w-20 animate-pulse rounded bg-zinc-800" />
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-800" />
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <div className="border-b border-zinc-800 bg-zinc-900/30 px-6 py-4">
          <h2 className="text-sm font-semibold text-white">Recent Posts</h2>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-sm text-zinc-400">No posts found.</p>
          <p className="mt-1 text-xs text-zinc-500">
            Create your first post to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/30 px-6 py-4">
        <h2 className="text-sm font-semibold text-white">Recent Posts</h2>
        <a
          href="#"
          className="text-xs text-zinc-400 hover:text-white transition-colors"
        >
          View all
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/50 text-zinc-400">
            <tr>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Created</th>
              <th className="px-6 py-3 font-medium">Updated</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-zinc-900/40 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-white max-w-xs truncate">
                  {post.title}
                </td>
                <td className="px-6 py-4">
                  {post.status === "PUBLISHED" ? (
                    <span className="inline-flex items-center rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-500">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  {formatDate(post.createdAt)}
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  {formatDate(post.updatedAt)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit?.(post.id)}
                      className="rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete?.(post.id)}
                      className="rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      Delete
                    </button>
                    {post.status === "PUBLISHED" ? (
                      <button
                        onClick={() => onUnpublish?.(post.id)}
                        className="rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => onPublish?.(post.id)}
                        className="rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        Publish
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ActivityFeed = ({ activities, loading }) => {
  if (loading) {
    return (
      <div className="mt-8 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="border-b border-zinc-800 bg-zinc-900/30 px-6 py-4">
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
        </div>
        <div className="divide-y divide-zinc-800">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3 px-6 py-4">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-zinc-800" />
              <div className="space-y-2">
                <div className="h-3 w-64 animate-pulse rounded bg-zinc-800" />
                <div className="h-2 w-20 animate-pulse rounded bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const defaultActivities = [
    {
      id: 1,
      text: "Published",
      target: "Understanding React Server Components",
      time: "2 hours ago",
    },
    {
      id: 2,
      text: "Updated",
      target: "The Future of Web Development",
      time: "5 hours ago",
    },
    {
      id: 3,
      text: "Deleted comment on",
      target: "Designing for Accessibility",
      time: "1 day ago",
    },
  ];

  const displayActivities = activities || defaultActivities;

  return (
    <div className="mt-8 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="border-b border-zinc-800 bg-zinc-900/30 px-6 py-4">
        <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
      </div>
      <div className="divide-y divide-zinc-800">
        {displayActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 px-6 py-4 hover:bg-zinc-900/40 transition-colors"
          >
            <div className="mt-0.5 h-2 w-2 rounded-full bg-zinc-500" />
            <div>
              <p className="text-sm text-zinc-300">
                {activity.text}{" "}
                <span className="font-medium text-white">
                  {activity.target}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE}/posts/all`);
        const data = await response.json();
        setPosts(data.slice(0, 5));
        setStats({
          total: data.length,
          published: data.filter((p) => p.status === "PUBLISHED").length,
          drafts: data.filter((p) => p.status === "NOT_PUBLISHED").length,
        });
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setStats({ total: 0, published: 0, drafts: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit post:", id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`${API_BASE}/posts/${id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setStats((prev) => ({ ...prev, total: prev.total - 1 }));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handlePublish = async (id) => {
    try {
      await fetch(`${API_BASE}/posts/${id}/publish`, { method: "PATCH" });
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "PUBLISHED" } : p)),
      );
      setStats((prev) => ({
        ...prev,
        published: prev.published + 1,
        drafts: prev.drafts - 1,
      }));
    } catch (error) {
      console.error("Failed to publish post:", error);
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await fetch(`${API_BASE}/posts/${id}/unpublish`, { method: "PATCH" });
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "NOT_PUBLISHED" } : p)),
      );
      setStats((prev) => ({
        ...prev,
        published: prev.published - 1,
        drafts: prev.drafts + 1,
      }));
    } catch (error) {
      console.error("Failed to unpublish post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Header />
      <Sidebar />
      <main className="ml-56 mt-14 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Overview of your content and activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          <StatCard label="Total Posts" value={stats.total} loading={loading} />
          <StatCard
            label="Published"
            value={stats.published}
            loading={loading}
          />
          <StatCard label="Drafts" value={stats.drafts} loading={loading} />
        </div>

        <PostTable
          posts={posts}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPublish={handlePublish}
          onUnpublish={handleUnpublish}
        />

        <ActivityFeed loading={loading} />
      </main>
    </div>
  );
};

export default Dashboard;
