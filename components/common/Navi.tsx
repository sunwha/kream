import {
  Camera01Icon,
  SunglassesIcon,
  UserCircle02Icon,
} from "hugeicons-react";
import Link from "next/link";

export default function Navi() {
  return (
    <nav className="fixed bottom-0 w-full">
      <ul className="grid grid-cols-3 justify-between items-center h-14 bg-white shadow-[0_-2px_10px_0_rgba(0,0,0,0.1)]">
        <li className="h-full">
          <Link
            href="/"
            className="h-full flex justify-center items-center"
            aria-label="Home"
          >
            <SunglassesIcon />
          </Link>
        </li>
        <li className="h-full">
          <Link
            href="/upload"
            className="flex justify-center items-center h-full"
            aria-label="Upload post"
          >
            <Camera01Icon />
          </Link>
        </li>
        <li className="h-full">
          <Link
            href="/mypage"
            className="flex justify-center items-center h-full"
            aria-label="My page"
          >
            <UserCircle02Icon />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
