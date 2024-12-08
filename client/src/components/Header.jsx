import { Link, useLocation } from "react-router-dom";
const navigation = [
  {
    name: "Blogs",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Post a Blog",
    href: "/new-blog",
  },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 inset-x-0">
      <nav className="flex flex-wrap items-center justify-between gap-2 lg:px-10 px-6 lg:pt-10 pt-6">
        <a href="/" className="lg:text-xl text-lg tracking-tight font-semibold">
          Awesome Blogs
        </a>
        <ul className="flex items-center gap-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm ${
                  location.pathname === item.href
                    ? "bg-indigo-800 text-white"
                    : "bg-indigo-700 text-white hover:bg-indigo-800"
                }`}
                aria-label={item.name}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
