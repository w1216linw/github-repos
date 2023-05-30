import { cacheRepos, repoUrl } from "@/atoms/searchAtom";
import { octokit } from "@/lib/octokit";
import { sortByStars } from "@/utility/sortByStars";
import {
  DocumentDuplicateIcon,
  LanguageIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function Home() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("Netflix");
  const [repos, setRepos] = useState([]);
  const setRepoURL = useSetRecoilState(repoUrl);
  const [cache, setCache] = useRecoilState(cacheRepos);

  const fetchOrgsRepo = async () => {
    const res = await octokit.request("GET /orgs/{org}/repos", {
      org: "netflix",
    });

    let temp = res.data;
    temp.sort(sortByStars);
    setCache(temp);
    setRepos(temp);
  };

  const goCommits = (repo) => {
    setRepoURL(repo.commits_url);
    router.push(`/commits/${repo.name}`);
  };

  useEffect(() => {
    if (cache.length >= 1) {
      setRepos(cache);
    }
  }, []);

  return (
    <main className="min-h-screen">
      <header className="flex justify-center h-20 items-center gap-3 mb-8">
        <input type="text" className="w-full max-w-xs py-2 px-1" />
        <button onClick={fetchOrgsRepo}>
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </header>
      {repos?.length >= 1 && (
        <div className="grid grid-cols-3 gap-4 max-w-6xl m-auto">
          {repos?.map((repo) => (
            <div
              key={repo.id}
              className="bg-white shadow-lg py-3 px-2 min-h-[15rem] flex flex-col gap-2 rounded-md"
            >
              <div className="flex justify-between">
                <h1 className="font-bold">{repo.name}</h1>
                <button
                  className="border-b hover:border-orange-400"
                  onClick={() => goCommits(repo)}
                >
                  Commits
                </button>
              </div>
              <div>
                <p>Description:</p>
                <p>{repo.description}</p>
              </div>
              <div className="flex justify-between mt-auto">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <LanguageIcon className="w-5 h-5" />
                    <p>{repo.language}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-5 h-5" />
                    <p>{repo.stargazers_count}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <DocumentDuplicateIcon className="w-5 h-5" />
                    <p>{repo.forks_count}</p>
                  </div>
                </div>
                <p>{repo.created_at.slice(0, repo.created_at.indexOf("T"))}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
