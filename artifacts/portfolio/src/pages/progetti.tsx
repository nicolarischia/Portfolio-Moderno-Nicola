import { useState, useEffect } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, Calendar, Code2, Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface GHRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
  private: boolean;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python:     "#3776AB",
  HTML:       "#E34F26",
  CSS:        "#1572B6",
  PHP:        "#777BB4",
  Java:       "#ED8B00",
  "C":        "#A8B9CC",
  "C++":      "#00599C",
  "C#":       "#239120",
  Vue:        "#4FC08D",
  Svelte:     "#FF3E00",
  Ruby:       "#CC342D",
  Go:         "#00ADD8",
  Rust:       "#CE422B",
  Shell:      "#89E051",
  Kotlin:     "#7F52FF",
  Swift:      "#F05138",
  Dart:       "#0175C2",
};

const PER_PAGE = 9;

/** Follows GitHub Link-header pagination to fetch every repo. */
async function fetchAllRepos(): Promise<GHRepo[]> {
  const all: GHRepo[] = [];
  let url: string | null =
    "https://api.github.com/users/nicolarischia/repos?sort=updated&per_page=100&type=owner";

  while (url) {
    const res: Response = await fetch(url);
    if (!res.ok) throw new Error(`Errore GitHub API: ${res.status}`);
    const page: GHRepo[] = await res.json();
    all.push(...page.filter(r => !r.fork && !r.private));

    const link: string = res.headers.get("Link") ?? "";
    const next: RegExpMatchArray | null = link.match(/<([^>]+)>;\s*rel="next"/);
    url = next ? next[1] : null;
  }

  return all;
}

async function fetchReadmeDescription(repoName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/nicolarischia/${repoName}/readme`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const bytes = Uint8Array.from(
      atob(data.content.replace(/\n/g, "")),
      c => c.charCodeAt(0)
    );
    const text = new TextDecoder().decode(bytes);
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t) continue;
      if (t.startsWith("#"))    continue;
      if (t.startsWith("!"))    continue;
      if (t.startsWith("<"))    continue;
      if (t.startsWith("[!"))   continue;
      if (t.startsWith("|"))    continue;
      if (t.startsWith("```"))  continue;
      if (/^[-=]{3,}$/.test(t)) continue;
      if (/^\[.*\]\(.*\)$/.test(t)) continue;
      const clean = t
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`~]/g, "")
        .trim();
      if (clean.length > 20)
        return clean.slice(0, 220) + (clean.length > 220 ? "…" : "");
    }
    return null;
  } catch {
    return null;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    year: "numeric",
    month: "short",
  });
}

function RepoSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 animate-pulse space-y-3">
      <div className="h-4 bg-white/10 rounded w-1/2" />
      <div className="h-3 bg-white/10 rounded w-full" />
      <div className="h-3 bg-white/10 rounded w-3/4" />
      <div className="flex gap-2 mt-4">
        <div className="h-5 bg-white/10 rounded-full w-16" />
        <div className="h-5 bg-white/10 rounded-full w-12" />
      </div>
    </div>
  );
}

export default function Progetti() {
  const [page, setPage] = useState(1);

  const {
    data: repos = [],
    isLoading,
    isError,
    error,
  } = useQuery<GHRepo[]>({
    queryKey: ["gh-repos-nicolarischia"],
    queryFn: fetchAllRepos,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const totalPages = Math.max(1, Math.ceil(repos.length / PER_PAGE));
  const pageRepos = repos.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset to page 1 when repos finish loading
  useEffect(() => {
    if (repos.length > 0) setPage(1);
  }, [repos.length]);

  // Fetch README only for repos visible on the current page
  const readmeResults = useQueries({
    queries: pageRepos.map(repo => ({
      queryKey: ["gh-readme", repo.name],
      queryFn: () => fetchReadmeDescription(repo.name),
      staleTime: 10 * 60 * 1000,
      retry: false,
      enabled: pageRepos.length > 0,
    })),
  });

  const goToPage = (n: number) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build page number list with ellipsis
  const pageNumbers: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++)
      pageNumbers.push(i);
    if (page < totalPages - 2) pageNumbers.push("…");
    pageNumbers.push(totalPages);
  }

  return (
    <section id="progetti" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="p-5 sm:p-8">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 sm:mb-10"
            >
              <div className="flex items-end justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                    Progetti
                  </h2>
                  <div className="w-12 h-0.5 bg-primary mb-4" />
                  <p className="text-muted-foreground text-base">
                    Repository pubblici aggiornati da{" "}
                    <a
                      href="https://github.com/nicolarischia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub
                    </a>
                    {repos.length > 0 && (
                      <span className="text-muted-foreground/50">
                        {" "}· {repos.length} repository
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Loading */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: PER_PAGE }).map((_, i) => (
                  <RepoSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <AlertCircle className="h-10 w-10 text-red-400/70" />
                <div>
                  <p className="text-foreground/80 font-medium mb-1">
                    Impossibile caricare i progetti
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {(error as Error)?.message ?? "Controlla la connessione e riprova."}
                  </p>
                </div>
                <a
                  href="https://github.com/nicolarischia?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm hover:bg-primary/20 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Apri GitHub
                </a>
              </div>
            )}

            {/* Grid */}
            {!isLoading && !isError && repos.length > 0 && (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {pageRepos.map((repo, i) => {
                      const readmeDesc = readmeResults[i]?.data ?? null;
                      const description = readmeDesc ?? repo.description;
                      const langColor = repo.language
                        ? (LANG_COLORS[repo.language] ?? "#6e7681")
                        : null;

                      return (
                        <motion.a
                          key={repo.id}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          className="group flex flex-col bg-white/4 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-xl p-5 transition-all duration-200 cursor-pointer"
                        >
                          {/* Name */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                              {repo.name}
                            </h3>
                            <ExternalLink className="h-3.5 w-3.5 text-white/30 group-hover:text-primary/60 shrink-0 transition-colors mt-0.5" />
                          </div>

                          {/* Description */}
                          <div className="flex-1 mb-4">
                            {description ? (
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                {description}
                              </p>
                            ) : readmeResults[i]?.isLoading ? (
                              <div className="flex items-center gap-1.5 text-muted-foreground/40 text-xs">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                <span>Carico…</span>
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground/40 italic">
                                Nessuna descrizione
                              </p>
                            )}
                          </div>

                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground/60">
                            {repo.language && (
                              <span className="flex items-center gap-1">
                                <span
                                  className="inline-block w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: langColor ?? "#6e7681" }}
                                />
                                {repo.language}
                              </span>
                            )}
                            {repo.stargazers_count > 0 && (
                              <span className="flex items-center gap-0.5">
                                <Star className="h-3 w-3" />
                                {repo.stargazers_count}
                              </span>
                            )}
                            {repo.forks_count > 0 && (
                              <span className="flex items-center gap-0.5">
                                <GitFork className="h-3 w-3" />
                                {repo.forks_count}
                              </span>
                            )}
                            <span className="flex items-center gap-0.5 ml-auto">
                              <Calendar className="h-3 w-3" />
                              {formatDate(repo.updated_at)}
                            </span>
                          </div>

                          {/* Topics */}
                          {repo.topics && repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-white/5">
                              {repo.topics.slice(0, 4).map(t => (
                                <span
                                  key={t}
                                  className="px-2 py-0.5 rounded-full bg-primary/10 text-primary/70 text-[10px] font-medium"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.a>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 mt-10">
                    {/* Prev */}
                    <button
                      onClick={() => goToPage(page - 1)}
                      disabled={page === 1}
                      className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      aria-label="Pagina precedente"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* Page numbers */}
                    {pageNumbers.map((n, i) =>
                      n === "…" ? (
                        <span key={`ellipsis-${i}`} className="px-1 text-white/30 text-sm select-none">
                          …
                        </span>
                      ) : (
                        <button
                          key={n}
                          onClick={() => goToPage(n)}
                          className={`min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium transition-all ${
                            page === n
                              ? "bg-primary text-black"
                              : "text-white/60 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {n}
                        </button>
                      )
                    )}

                    {/* Next */}
                    <button
                      onClick={() => goToPage(page + 1)}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      aria-label="Pagina successiva"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Empty */}
            {!isLoading && !isError && repos.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <Code2 className="h-10 w-10 text-white/20" />
                <p className="text-muted-foreground text-sm">Nessun repository trovato.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
