import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { themeChange } from "theme-change";
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];
export default function Header() {
  const { data: sessionData } = useSession();
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        {sessionData?.user?.name ? `Jots for ${sessionData.user.name}` : ""}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown grid grid-cols-2">
          <select
            className="select-ghost select select-sm m-auto flex-1"
            data-choose-theme
          >
            <option value="">Default</option>
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
          {sessionData?.user ? (
            <label
              tabIndex={0}
              className="btn-ghost btn-circle avatar btn ml-auto"
              onClick={() => void signOut()}
            >
              <div className="w-10 rounded-full">
                <img
                  src={sessionData.user.image || ""}
                  alt={sessionData.user.name || ""}
                />
              </div>
            </label>
          ) : (
            <button
              className="btn-ghost rounded-btn btn ml-auto"
              onClick={() => void signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
