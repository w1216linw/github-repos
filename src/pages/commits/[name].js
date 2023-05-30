import { repoUrl } from "@/atoms/searchAtom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const Commits = () => {
  const router = useRouter();
  const { name } = router.query;
  const commitsUrl = useRecoilValue(repoUrl);
  const [commits, setCommits] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCommits = async () => {
      let newUrl = commitsUrl.replace("{/sha}", "");
      const res = await fetch(newUrl + "?per_page=30" + `&page=${page}`);
      const data = await res.json();
      setCommits(data);
    };

    fetchCommits();
  }, [commitsUrl, page]);

  return (
    <div className="min-h-screen py-10">
      <header className="h-20 px-10 items-center flex">
        <button onClick={() => router.push("/")}>back</button>
        <h1 className="text-3xl flex-grow text-center">{name}</h1>
      </header>
      {commits.length >= 1 && (
        <div className="grid gap-5 max-w-4xl m-auto ">
          {commits.map((commit) => (
            <div
              key={commit.node_id}
              className="bg-white rounded-lg p-4 grid gap-2"
            >
              <dir className="grid gap-1 p-0 m-0">
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={commit?.author?.avatar_url}
                    alt="committer"
                  />
                  <p>{commit?.author?.login}</p>
                </div>
                <p className="text-gray-500">
                  committed on{" "}
                  {commit?.commit?.author?.date.slice(
                    0,
                    commit?.commit?.author?.date.indexOf("T")
                  )}
                </p>
              </dir>
              <div>
                <p>{commit?.commit?.message}</p>
              </div>
              <p className="text-gray-500">{commit.sha}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between max-w-4xl mx-auto">
        <button
          className="border px-4 py-2"
          onClick={() => {
            setPage(page - 1);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          prev
        </button>
        <button
          className="border px-4 py-2"
          onClick={() => {
            setPage(page + 1);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Commits;
