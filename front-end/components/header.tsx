import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Language from "./language/Language";
import { User } from "@types";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setLoggedInUser(parsedUser);
      } catch (error) {
        console.error("Error parsing loggedInUser from localStorage:", error);
      }
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center">
      <a className="flex mb-2 md:mb-5 text-white-50 text-3xl text-gray-300">
        {t("app.title")}
      </a>
      <nav className="items-center flex md:flex-row flex-col">
        {/* Home Page Link */}
        <Link
          href="/"
          className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
        >
          {t("header.nav.home")}
        </Link>

        {/* Complaint Page Link */}
        <Link
          href="/complaint"
          className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
        >
          {t("header.nav.complaint")}
        </Link>

        {/* Unit Page Link */}
        <Link
          href="/unit"
          className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
        >
          {t("header.nav.unit")}
        </Link>

        {/* User Link */}
        <Link
          href="/user"
          className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
        >
          {t("header.nav.unit")}
        </Link>

        {/* Army Page Link */}
        <Link
          href="/army"
          className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
        >
          {t("header.nav.army")}
        </Link>

        {/* Login and Logout */}
        {!loggedInUser && (
          <Link
            href="/login"
            className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
          >
            {t("header.nav.login")}
          </Link>
        )}
        {loggedInUser && (
          <a
            href="/login"
            onClick={handleClick}
            className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
          >
            {t("header.nav.logout")}
          </a>
        )}
        {loggedInUser && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            {t("header.welcome")}, {loggedInUser.fullname}!
          </div>
        )}

        {/* Language Switcher */}
        <div className="flex items-center">
          <Language />
        </div>
      </nav>
    </header>
  );
};

export default Header;






