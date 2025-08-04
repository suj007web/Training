import Image from "next/image";

import UserWelcome from "./components/UserWelcome";
import ThemeSelector from "./components/ThemeSelector";

export default function Home() {
  return (
    <>
      <div className="mx-10 mt-5">
        <UserWelcome/>
        <ThemeSelector/>
      </div>
    </>
  );
}
