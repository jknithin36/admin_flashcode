import { SearchBar } from "@/components/SearchBar";

export default function page() {
  const uniqueTagCount = 21;
  return (
    <>
      <div className="p-4">
        <h2 className="text-md text-white mb-4">Search Tags</h2>
        <SearchBar />
        <h2 className="text-xl font-bold">
          {uniqueTagCount !== null
            ? `We have ${uniqueTagCount} unique tags!`
            : "Loading unique tags..."}
        </h2>
      </div>
    </>
  );
}
