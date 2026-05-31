// app/page.tsx
// "On-Chain Entropy" — Home Page
// Columns used:
//   articles : id, title, slug, description, image_url, published, author_id, created_at
//   podcasts : id, title, slug, description, audio_url, duration, published, host_id, created_at

import Link from "next/link";
import { createClient } from "../src/utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, description, image_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: podcasts } = await supabase
    .from("podcasts")
    .select("id, title, slug, description, audio_url, duration, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&family=Inter:wght@300;400;500&display=swap');

        :root {
          --green:  #00ff88;
          --green2: #00cc66;
          --dim:    #00ff8833;
          --border: #1a2a1a;
          --bg:     #050a05;
          --panel:  #070f07;
          --text:   #c8d8c8;
          --muted:  #4a6a4a;
        }

        body { background: var(--bg); color: var(--text); }

        .grid-bg {
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .glow-text {
          color: var(--green);
          text-shadow:
            0 0 10px #00ff8880,
            0 0 30px #00ff8840,
            0 0 60px #00ff8820;
        }

        .card-glow {
          border: 1px solid var(--border);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .card-glow:hover {
          border-color: var(--green2);
          box-shadow: 0 0 0 1px var(--green2), 0 0 20px var(--dim), inset 0 0 20px #00ff880a;
        }

        .bracket { position: relative; }
        .bracket::before,
        .bracket::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: var(--green);
          border-style: solid;
        }
        .bracket::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .bracket::after  { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor::after {
          content: '█';
          color: var(--green);
          animation: blink 1s step-end infinite;
          margin-left: 2px;
          font-size: 0.8em;
        }

        @keyframes pulse-bar { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .pulse { animation: pulse-bar 2s ease-in-out infinite; }

        .tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.63rem;
          letter-spacing: 0.08em;
          padding: 2px 8px;
          border: 1px solid var(--muted);
          color: var(--muted);
          background: transparent;
          text-transform: uppercase;
        }
        .card-glow:hover .tag {
          border-color: var(--green2);
          color: var(--green);
        }
      `}</style>

      <div className="min-h-screen grid-bg">
        {/* ── NAV ──────────────────────────────────────────────────── */}
        <nav
          className="sticky top-0 z-50"
          style={{
            borderBottom: "1px solid var(--border)",
            background: "rgba(5,10,5,0.92)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="max-w-7xl mx-auto px-6"
            style={{
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  border: "1px solid var(--green)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2px",
                  padding: "4px",
                }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "var(--green)" : "transparent",
                      opacity: 0.85,
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: 900,
                  fontSize: "0.85rem",
                  letterSpacing: "0.15em",
                  color: "var(--green)",
                }}
              >
                ON-CHAIN ENTROPY
              </span>
            </div>

            {/* Links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
              }}
            >
              <Link href="/articles" style={{ color: "var(--muted)" }}>
                ARTICLES
              </Link>
              <Link href="/podcasts" style={{ color: "var(--muted)" }}>
                PODCASTS
              </Link>
              <div
                style={{
                  width: "1px",
                  height: "16px",
                  background: "var(--border)",
                }}
              />
              <button
                style={{
                  color: "var(--green)",
                  border: "1px solid var(--green)",
                  padding: "4px 14px",
                  fontSize: "0.63rem",
                  letterSpacing: "0.15em",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                CONNECT
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 pb-24">
          {/* ── HERO ─────────────────────────────────────────────────── */}
          <section
            style={{
              paddingTop: "80px",
              paddingBottom: "64px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient glow blob */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "320px",
                height: "320px",
                opacity: 0.07,
                background:
                  "radial-gradient(circle, var(--green) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.68rem",
                color: "var(--muted)",
                letterSpacing: "0.12em",
                marginBottom: "24px",
              }}
            >
              WEB3 × EVM EDUCATION PLATFORM — NODE_ENV: MAINNET
            </div>

            <h1
              className="glow-text cursor"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontWeight: 900,
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "0.04em",
                maxWidth: "18ch",
              }}
            >
              DECODE
              <br />
              THE CHAIN
            </h1>

            <p
              style={{
                marginTop: "24px",
                maxWidth: "52ch",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "var(--muted)",
                lineHeight: 1.75,
              }}
            >
              Deep-signal technical writing on EVM internals, smart contract
              security, and the protocols reshaping decentralised
              infrastructure.
            </p>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "40px",
                marginTop: "40px",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
              }}
            >
              {[
                { label: "ARTICLES", val: articles?.length ?? 0 },
                { label: "EPISODES", val: podcasts?.length ?? 0 },
                { label: "NETWORK", val: "ETH MAINNET" },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span style={{ color: "var(--muted)" }}>{label}</span>
                  <span style={{ color: "var(--green)", fontSize: "1.1rem" }}>
                    {val}
                  </span>
                </div>
              ))}
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(to right, var(--green2), transparent)",
                }}
              />
            </div>
          </section>

          {/* ── ARTICLES ─────────────────────────────────────────────── */}
          <section style={{ marginBottom: "80px" }}>
            <SectionHeader
              label="SIGNAL_FEED"
              subtitle="Latest technical dispatches"
              index="01"
            />

            {!articles?.length ? (
              <EmptyTerminal message="NO ARTICLES INDEXED" />
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1px",
                  background: "var(--border)",
                }}
              >
                {articles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </div>
            )}

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link
                href="/articles"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  color: "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                VIEW ALL DISPATCHES{" "}
                <span style={{ color: "var(--green)" }}>→</span>
              </Link>
            </div>
          </section>

          {/* ── PODCASTS ─────────────────────────────────────────────── */}
          <section>
            <SectionHeader
              label="AUDIO_LOG"
              subtitle="On-chain conversations"
              index="02"
            />

            {!podcasts?.length ? (
              <EmptyTerminal message="NO EPISODES TRANSMITTED" />
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "4px",
                }}
              >
                {podcasts.map((ep, i) => (
                  <PodcastCard key={ep.id} episode={ep} index={i} />
                ))}
              </div>
            )}
          </section>
        </main>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "24px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.62rem",
              color: "var(--muted)",
              letterSpacing: "0.1em",
            }}
          >
            ON-CHAIN ENTROPY © {new Date().getFullYear()} — ALL TRANSMISSIONS
            IMMUTABLE
          </span>
          <div
            className="pulse"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--green)",
            }}
          />
        </footer>
      </div>
    </>
  );
}
// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

// 1. Define the exact shapes of our data so TypeScript stops complaining
interface Article {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface Podcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  created_at: string;
}

function SectionHeader({
  label,
  subtitle,
  index,
}: {
  label: string;
  subtitle: string;
  index: string;
}) {
  return (
    <div
      className="flex items-end justify-between mb-6 pb-4"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.6rem",
            color: "var(--muted)",
            letterSpacing: "0.15em",
            marginBottom: "4px",
          }}
        >
          [{index}]
        </div>
        <h2
          style={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 700,
            fontSize: "1.15rem",
            letterSpacing: "0.12em",
            color: "var(--green)",
          }}
        >
          {label}
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            color: "var(--muted)",
            marginTop: "2px",
          }}
        >
          {subtitle}
        </p>
      </div>
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.6rem",
          color: "var(--muted)",
          letterSpacing: "0.1em",
        }}
      >
        STATUS: LIVE
      </div>
    </div>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const date = article.created_at
    ? new Date(article.created_at).toISOString().split("T")[0]
    : "—";

  return (
    // We changed article.slug to article.id to perfectly match our folder structure!
    <Link href={`/articles/${article.id}`} className="block">
      <article
        className="card-glow bracket relative h-full"
        style={{
          background: "var(--panel)",
          padding: "24px",
          minHeight: "220px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          height: "100%",
        }}
      >
        {/* Cover image */}
        {article.image_url && (
          <div
            style={{
              overflow: "hidden",
              height: "120px",
              marginBottom: "4px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image_url}
              alt={article.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.8) contrast(1.05)",
                display: "block",
              }}
            />
          </div>
        )}

        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.58rem",
            color: "var(--muted)",
            letterSpacing: "0.12em",
          }}
        >
          {String(index + 1).padStart(2, "0")} / ARTICLE
        </div>

        <h3
          style={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "0.04em",
            color: "#e8f4e8",
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {article.title}
        </h3>

        {article.description && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              color: "var(--muted)",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.description}
          </p>
        )}

        <div
          className="flex items-center justify-between mt-auto pt-3"
          style={{
            borderTop: "1px solid var(--border)",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.62rem",
            color: "var(--muted)",
            letterSpacing: "0.08em",
          }}
        >
          <span>{date}</span>
          <span style={{ color: "var(--green)" }}>READ →</span>
        </div>
      </article>
    </Link>
  );
}

function PodcastCard({ episode, index }: { episode: Podcast; index: number }) {
  const date = episode.created_at
    ? new Date(episode.created_at).toISOString().split("T")[0]
    : "—";

  return (
    <div
      className="card-glow bracket relative"
      style={{
        background: "var(--panel)",
        padding: "20px",
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 44,
          height: 44,
          border: "1px solid var(--green)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          padding: "8px",
        }}
      >
        {[3, 6, 4, 7, 5, 6, 3].map((h, i) => (
          <div
            key={i}
            className="pulse"
            style={{
              width: 2,
              height: `${h * 3}px`,
              background: "var(--green)",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      <div className="flex-1 min-w-0">
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.6rem",
            color: "var(--muted)",
            letterSpacing: "0.12em",
            marginBottom: "6px",
          }}
        >
          EPISODE · {date}
        </div>

        <h3
          style={{
            fontFamily: "'Orbitron', monospace",
            fontWeight: 700,
            fontSize: "0.88rem",
            letterSpacing: "0.03em",
            color: "#e8f4e8",
            lineHeight: 1.35,
            marginBottom: "8px",
          }}
        >
          {episode.title}
        </h3>

        {episode.description && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: "var(--muted)",
              lineHeight: 1.55,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {episode.description}
          </p>
        )}

        <div
          className="flex items-center justify-between mt-3"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
          }}
        >
          <span style={{ color: "var(--muted)" }}>
            DURATION:{" "}
            <span style={{ color: "var(--green)" }}>{episode.duration}</span>
          </span>
          <span style={{ color: "var(--green)" }}>▶ PLAY</span>
        </div>
      </div>
    </div>
  );
}

function EmptyTerminal({ message }: { message: string }) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.7rem",
        color: "var(--muted)",
        letterSpacing: "0.15em",
      }}
    >
      <span style={{ marginRight: "8px", color: "var(--green)" }}>$</span>{" "}
      {message}
      <span className="cursor" />
    </div>
  );
}

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

// function SectionHeader({
//   label,
//   subtitle,
//   index,
// }: {
//   label: string;
//   subtitle: string;
//   index: string;
// }) {
//   return (
//     <div
//       style={{
//         borderBottom: "1px solid var(--border)",
//         marginBottom: "24px",
//         paddingBottom: "16px",
//         display: "flex",
//         alignItems: "flex-end",
//         justifyContent: "space-between",
//       }}
//     >
//       <div>
//         <div
//           style={{
//             fontFamily: "'Share Tech Mono', monospace",
//             fontSize: "0.6rem",
//             color: "var(--muted)",
//             letterSpacing: "0.15em",
//             marginBottom: "4px",
//           }}
//         >
//           [{index}]
//         </div>
//         <h2
//           style={{
//             fontFamily: "'Orbitron', monospace",
//             fontWeight: 700,
//             fontSize: "1.1rem",
//             letterSpacing: "0.12em",
//             color: "var(--green)",
//           }}
//         >
//           {label}
//         </h2>
//         <p
//           style={{
//             fontFamily: "'Inter', sans-serif",
//             fontSize: "0.8rem",
//             color: "var(--muted)",
//             marginTop: "2px",
//           }}
//         >
//           {subtitle}
//         </p>
//       </div>
//       <span
//         style={{
//           fontFamily: "'Share Tech Mono', monospace",
//           fontSize: "0.6rem",
//           color: "var(--muted)",
//           letterSpacing: "0.1em",
//         }}
//       >
//         STATUS: LIVE
//       </span>
//     </div>
//   );
// }

// function ArticleCard({ article, index }: { article: any; index: number }) {
//   // ── uses: id, title, slug, description, image_url, created_at ──
//   const date = article.created_at
//     ? new Date(article.created_at).toISOString().split("T")[0]
//     : "—";

//   return (
//     <Link href={`/articles/${article.slug}`}>
//       <article
//         className="card-glow bracket"
//         style={{
//           background: "var(--panel)",
//           padding: "24px",
//           minHeight: "220px",
//           display: "flex",
//           flexDirection: "column",
//           gap: "12px",
//           height: "100%",
//         }}
//       >
//         {/* Cover image — only rendered when image_url is present */}
//         {article.image_url && (
//           <div
//             style={{
//               overflow: "hidden",
//               height: "120px",
//               marginBottom: "4px",
//               position: "relative",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 backgroundImage:
//                   "repeating-linear-gradient(0deg, transparent, transparent 2px, #00000020 2px, #00000020 4px)",
//                 zIndex: 1,
//                 pointerEvents: "none",
//               }}
//             />
//             <img
//               src={article.image_url}
//               alt={article.title}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 filter: "brightness(0.8) contrast(1.05)",
//                 display: "block",
//               }}
//             />
//           </div>
//         )}

//         {/* Index badge */}
//         <div
//           style={{
//             fontFamily: "'Share Tech Mono', monospace",
//             fontSize: "0.58rem",
//             color: "var(--muted)",
//             letterSpacing: "0.12em",
//           }}
//         >
//           {String(index + 1).padStart(2, "0")} / ARTICLE
//         </div>

//         {/* Title */}
//         <h3
//           style={{
//             fontFamily: "'Orbitron', monospace",
//             fontWeight: 700,
//             fontSize: "0.92rem",
//             letterSpacing: "0.04em",
//             color: "#e8f4e8",
//             lineHeight: 1.4,
//             flex: 1,
//           }}
//         >
//           {article.title}
//         </h3>

//         {/* Description — maps to `description` column */}
//         {article.description && (
//           <p
//             style={{
//               fontFamily: "'Inter', sans-serif",
//               fontSize: "0.8rem",
//               color: "var(--muted)",
//               lineHeight: 1.6,
//               display: "-webkit-box",
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: "vertical",
//               overflow: "hidden",
//             }}
//           >
//             {article.description}
//           </p>
//         )}

//         {/* Footer meta */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginTop: "auto",
//             paddingTop: "12px",
//             borderTop: "1px solid var(--border)",
//             fontFamily: "'Share Tech Mono', monospace",
//             fontSize: "0.62rem",
//             color: "var(--muted)",
//             letterSpacing: "0.08em",
//           }}
//         >
//           <span>{date}</span>
//           <span style={{ color: "var(--green)" }}>READ →</span>
//         </div>
//       </article>
//     </Link>
//   );
// }

// function PodcastCard({ episode, index }: { episode: any; index: number }) {
//   // ── uses: id, title, slug, description, audio_url, duration, created_at ──

//   // `duration` is stored as an integer (seconds) per the schema
//   const duration = episode.duration
//     ? `${Math.floor(episode.duration / 60)}:${String(episode.duration % 60).padStart(2, "0")}`
//     : "—";

//   const date = episode.created_at
//     ? new Date(episode.created_at).toISOString().split("T")[0]
//     : "—";

//   return (
//     <div
//       className="card-glow bracket"
//       style={{
//         background: "var(--panel)",
//         padding: "20px",
//         display: "flex",
//         gap: "16px",
//         alignItems: "flex-start",
//       }}
//     >
//       {/* Animated waveform icon */}
//       <div
//         style={{
//           flexShrink: 0,
//           width: "44px",
//           height: "44px",
//           border: "1px solid var(--green)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "2px",
//           padding: "8px",
//         }}
//       >
//         {[3, 6, 4, 7, 5, 6, 3].map((h, i) => (
//           <div
//             key={i}
//             className="pulse"
//             style={{
//               width: "2px",
//               height: `${h * 3}px`,
//               background: "var(--green)",
//               animationDelay: `${i * 0.15}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div style={{ flex: 1, minWidth: 0 }}>
//         {/* Date label */}
//         <div
//           style={{
//             fontFamily: "'Share Tech Mono', monospace",
//             fontSize: "0.6rem",
//             color: "var(--muted)",
//             letterSpacing: "0.12em",
//             marginBottom: "6px",
//           }}
//         >
//           EPISODE · {date}
//         </div>

//         {/* Title */}
//         <h3
//           style={{
//             fontFamily: "'Orbitron', monospace",
//             fontWeight: 700,
//             fontSize: "0.88rem",
//             letterSpacing: "0.03em",
//             color: "#e8f4e8",
//             lineHeight: 1.35,
//             marginBottom: "8px",
//           }}
//         >
//           {episode.title}
//         </h3>

//         {/* Description — maps to `description` column */}
//         {episode.description && (
//           <p
//             style={{
//               fontFamily: "'Inter', sans-serif",
//               fontSize: "0.78rem",
//               color: "var(--muted)",
//               lineHeight: 1.55,
//               display: "-webkit-box",
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: "vertical",
//               overflow: "hidden",
//             }}
//           >
//             {episode.description}
//           </p>
//         )}

//         {/* Duration + play link */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginTop: "12px",
//             fontFamily: "'Share Tech Mono', monospace",
//             fontSize: "0.62rem",
//             letterSpacing: "0.1em",
//           }}
//         >
//           <span style={{ color: "var(--muted)" }}>
//             DURATION: <span style={{ color: "var(--green)" }}>{duration}</span>
//           </span>
//           <Link
//             href={`/podcasts/${episode.slug}`}
//             style={{
//               color: "var(--green)",
//               display: "flex",
//               alignItems: "center",
//               gap: "6px",
//             }}
//           >
//             ▶ PLAY
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// function EmptyTerminal({ message }: { message: string }) {
//   return (
//     <div
//       style={{
//         border: "1px solid var(--border)",
//         padding: "40px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontFamily: "'Share Tech Mono', monospace",
//         fontSize: "0.7rem",
//         color: "var(--muted)",
//         letterSpacing: "0.15em",
//       }}
//     >
//       <span style={{ marginRight: "8px", color: "var(--green)" }}>$</span>
//       {message}
//       <span className="cursor" />
//     </div>
//   );
// }
