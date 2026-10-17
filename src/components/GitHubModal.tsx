import React, { useState, useEffect } from 'react';
import { 
  Github, 
  ExternalLink, 
  GitBranch, 
  GitCommit, 
  Star, 
  Users, 
  FolderGit2, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  Terminal, 
  Code2,
  X
} from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUsername?: string;
}

interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location?: string;
  blog?: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose, defaultUsername = 'xusanovmuhammadyusuf' }) => {
  const [username, setUsername] = useState(defaultUsername);
  const [searchQuery, setSearchQuery] = useState(defaultUsername);
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'gitGuide' | 'repoInfo'>('profile');

  // Load GitHub Profile on Mount / Search
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function fetchGithubData() {
      setLoading(true);
      setError(null);
      try {
        const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username.trim())}`);
        if (!userRes.ok) {
          if (userRes.status === 404) {
            throw new Error(`GitHub-da "${username}" foydalanuvchisi topilmadi.`);
          } else {
            throw new Error(`GitHub ma'lumotlarini yuklashda xatolik yuz berdi (${userRes.status})`);
          }
        }
        const userData: GithubUser = await userRes.json();
        
        // Fetch Repos
        const repoRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username.trim())}/repos?sort=updated&per_page=6`);
        let repoData: GithubRepo[] = [];
        if (repoRes.ok) {
          repoData = await repoRes.json();
        }

        if (isMounted) {
          setUser(userData);
          setRepos(repoData);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
          setUser(null);
          setRepos([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchGithubData();

    return () => {
      isMounted = false;
    };
  }, [isOpen, username]);

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setUsername(searchQuery.trim());
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const openDirectGithub = () => {
    if (user?.html_url) {
      window.open(user.html_url, '_blank', 'noopener,noreferrer');
    } else {
      window.open('https://github.com', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-white border border-zinc-700/60 shadow-inner">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold tracking-tight text-white font-display">GitHub Markazi</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                  Integratsiya
                </span>
              </div>
              <p className="text-xs text-zinc-400">GitHub profilingizga to‘g‘ridan-to‘g‘ri kirish va repozitoriylarni boshqarish</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={openDirectGithub}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
              title="GitHub saytini yangi tabda ochish"
            >
              <span>GitHub-ga o'tish</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-zinc-800 bg-zinc-900/50">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>GitHub Profil & Repozitoriylar</span>
          </button>
          <button
            onClick={() => setActiveTab('gitGuide')}
            className={`pb-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'gitGuide'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Git Buyruqlari & Qo'llanma</span>
          </button>
          <button
            onClick={() => setActiveTab('repoInfo')}
            className={`pb-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'repoInfo'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Loyiha Klonlash (Clone)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Search user on GitHub */}
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="GitHub username (masalan: xusanovmuhammadyusuf, torvalds)..."
                    className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Yuklanmoqda..." : "Qidirish"}
                </button>
              </form>

              {/* Status or Error */}
              {loading && (
                <div className="py-12 flex flex-col items-center justify-center text-zinc-400 gap-3">
                  <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm">GitHub API orqali ma'lumotlar olinmoqda...</p>
                </div>
              )}

              {error && !loading && (
                <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/40 text-red-300 text-sm flex items-center justify-between">
                  <span>{error}</span>
                  <a
                    href={`https://github.com/search?q=${encodeURIComponent(searchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 underline hover:text-white"
                  >
                    <span>GitHub-da qidirish</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Loaded User Profile */}
              {user && !loading && (
                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar_url}
                        alt={user.name || user.login}
                        className="w-16 h-16 rounded-full border-2 border-zinc-700 shadow-md object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                          {user.name || user.login}
                        </h4>
                        <p className="text-sm text-zinc-400">@{user.login}</p>
                        {user.bio && (
                          <p className="text-xs text-zinc-300 mt-1 max-w-md">{user.bio}</p>
                        )}
                      </div>
                    </div>

                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors shadow-lg shadow-cyan-950/30 cursor-pointer self-start sm:self-auto"
                    >
                      <Github className="w-4 h-4" />
                      <span>Profilni GitHub-da ochish</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Profile Stats */}
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-800/70 text-center">
                    <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                      <div className="text-lg font-bold text-white tabular-nums">{user.public_repos}</div>
                      <div className="text-[11px] text-zinc-400">Repozitoriylar</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                      <div className="text-lg font-bold text-white tabular-nums">{user.followers}</div>
                      <div className="text-[11px] text-zinc-400">Obunachilar</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                      <div className="text-lg font-bold text-white tabular-nums">{user.following}</div>
                      <div className="text-[11px] text-zinc-400">Kuzatmoqda</div>
                    </div>
                  </div>

                  {/* Repositories preview */}
                  <div>
                    <div className="flex items-center justify-between mb-3 mt-4">
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                        <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Oxirgi Repozitoriylar</span>
                      </h5>
                      <a
                        href={`${user.html_url}?tab=repositories`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        Barchasini ko'rish ({user.public_repos})
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {repos.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {repos.map((repo) => (
                          <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 transition-all group flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-semibold text-sm text-cyan-300 group-hover:text-cyan-200 truncate">
                                  {repo.name}
                                </span>
                                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
                              </div>
                              <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                                {repo.description || "Tavsif berilmagan"}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 mt-3 text-[11px] text-zinc-500 pt-2 border-t border-zinc-800/60">
                              {repo.language && (
                                <span className="text-zinc-400 flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                                  {repo.language}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3" /> {repo.stargazers_count}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitBranch className="w-3 h-3" /> {repo.forks_count}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-zinc-500 bg-zinc-900/40 rounded-xl">
                        Hozircha ommaviy repozitoriy mavjud emas
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'gitGuide' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs text-cyan-200">
                <span className="font-semibold">Maslahat:</span> Ushbu loyihani Git orqali kompyuteringizda boshqarish yoki o‘z GitHub akkauntingizga yuklash uchun quyidagi buyruqlardan foydalanishingiz mumkin.
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'cmd-init',
                    title: '1. Git repozitoriyni boshlash',
                    cmd: 'git init\ngit add .\ngit commit -m "Initial commit: ApexPhone Smartfon Ko\'rgazmasi"'
                  },
                  {
                    id: 'cmd-remote',
                    title: '2. GitHub masofaviy repozitoriyga bog‘lash',
                    cmd: `git remote add origin https://github.com/${username || 'username'}/apex-phone-showcase.git\ngit branch -M main\ngit push -u origin main`
                  },
                  {
                    id: 'cmd-status',
                    title: '3. Holatni tekshirish va yangi o‘zgarishlarni yuborish',
                    cmd: 'git status\ngit add .\ngit commit -m "Yangilangan telefonlar dizayni va GitHub tugmasi"\ngit push'
                  }
                ].map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-300">{item.title}</span>
                      <button
                        onClick={() => copyToClipboard(item.cmd, item.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-800/70 hover:bg-zinc-700 transition-colors cursor-pointer"
                      >
                        {copiedCmd === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Nusxalandi!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Nusxa olish</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-2.5 rounded-lg bg-zinc-900 text-xs font-mono text-zinc-200 overflow-x-auto whitespace-pre">
                      {item.cmd}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'repoInfo' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">ApexPhone Showcase Repozitoriyasi</h4>
                    <p className="text-xs text-zinc-400">React + Vite + Tailwind CSS + Lucide Icons</p>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-xs text-zinc-400 mb-1.5 block">Klonlash buyrug'i (HTTPS):</label>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-cyan-300">
                    <span className="flex-1 truncate">git clone https://github.com/apex-phone/showcase-store.git</span>
                    <button
                      onClick={() => copyToClipboard('git clone https://github.com/apex-phone/showcase-store.git', 'clone-cmd')}
                      className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Nusxa olish"
                    >
                      {copiedCmd === 'clone-cmd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <span className="text-zinc-500 block mb-1">Dasturlash tili</span>
                    <span className="font-semibold text-zinc-200">TypeScript / React 19</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <span className="text-zinc-500 block mb-1">Dizayn kutubxonasi</span>
                    <span className="font-semibold text-zinc-200">Tailwind CSS 4.0</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/trending"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-semibold text-zinc-200">GitHub Trending Repozitoriylar</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-200" />
                </a>

                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <GitCommit className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-zinc-200">Yangi Repozitoriy Ochish</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-200" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>GitHub API integratsiyasi faol</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>github.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
