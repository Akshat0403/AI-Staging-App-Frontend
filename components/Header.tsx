import React from "react";
import { SparklesIcon } from "./icons/SparklesIcon";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header: React.FC = () => {
  return (
    <header className="py-4 border-b border-gray-700">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <SparklesIcon className="w-8 h-8 text-indigo-400 mr-3" />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            AI Interior Staging
          </h1>
        </div>

        {/* Auth buttons */}
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
