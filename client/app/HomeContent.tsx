import UserWelcome from "./components/common/UserWelcome";
import Header from "./components/common/Header";
import ThemeSelector from "./components/theme/ThemeSelector";

export function HomeContent({ username }: { username: string }) {
  return (
    <>
      <Header />
      <div className="mx-10 mt-5">
        <UserWelcome username={username ?? "User"} />
        <ThemeSelector />
      </div>
    </>
  );
}
