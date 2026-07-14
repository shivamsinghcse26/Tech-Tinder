import { useState, useRef } from "react";
import { Eye, EyeOff, ArrowRight, Heart, X, Flame } from "lucide-react";
import axios from "axios";

const PARTICLES = [
  { icon: "heart", left: "8%", size: 18, delay: "0s", duration: "9s" },
  { icon: "x", left: "22%", size: 14, delay: "2.2s", duration: "7.5s" },
  { icon: "heart", left: "78%", size: 20, delay: "1s", duration: "10s" },
  { icon: "x", left: "88%", size: 15, delay: "3.4s", duration: "8s" },
  { icon: "heart", left: "50%", size: 16, delay: "4.5s", duration: "8.5s" },
  { icon: "heart", left: "65%", size: 12, delay: "0.6s", duration: "7s" },
];

const Login = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const stageRef = useRef(null);

  const maxTilt = 9;

  const handleMouseMove = (e) => {
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * maxTilt, y: -y * maxTilt });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });
  const handleSubmit = (e) => e.preventDefault();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          withCredentials: true, // Include cookies in the request
        },
      );
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-base-200 flex items-center justify-center p-6 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .gm-font-mono { font-family: 'JetBrains Mono', monospace; }
        .gm-font-sans { font-family: 'Inter', sans-serif; }

        @keyframes gm-blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes gm-bob {
          0%, 100% { transform: translateZ(-40px) rotate(var(--rot)) translateY(var(--ty)); }
          50% { transform: translateZ(-40px) rotate(calc(var(--rot) * 1.3)) translateY(calc(var(--ty) - 6px)); }
        }
        @keyframes gm-float-up {
          0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 0; }
          15% { opacity: .55; }
          85% { opacity: .35; }
          100% { transform: translateY(-90vh) scale(1.1) rotate(12deg); opacity: 0; }
        }
        @keyframes gm-flame-pulse {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(255,120,60,.6)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 10px rgba(255,120,60,.75)); transform: scale(1.08); }
        }

        .gm-blob { animation: gm-blob 14s ease-in-out infinite; }
        .gm-ghost { animation: gm-bob 6s ease-in-out infinite; }
        .gm-particle { animation: gm-float-up linear infinite; }
        .gm-flame { animation: gm-flame-pulse 2.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .gm-blob, .gm-ghost, .gm-particle, .gm-flame { animation: none !important; }
        }
      `}</style>

      {/* animated flame-gradient blobs, Tinder-style ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="gm-blob absolute -top-20 -left-20 h-80 w-80 rounded-full bg-linear-to-br from-rose-500 via-orange-400 to-pink-500 opacity-25 blur-3xl" />
        <div
          className="gm-blob absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-linear-to-tr from-fuchsia-500 via-rose-400 to-amber-300 opacity-20 blur-3xl"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="gm-blob absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-linear-to-br from-emerald-400 to-teal-400 opacity-10 blur-3xl"
          style={{ animationDelay: "-9s" }}
        />
        {/* subtle dot grid, code-editor gutter texture */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,.12) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      {/* drifting like / pass particles */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="gm-particle absolute bottom-0"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          >
            {p.icon === "heart" ? (
              <Heart
                size={p.size}
                className="fill-rose-400/70 text-rose-400/70"
              />
            ) : (
              <X
                size={p.size}
                className="text-neutral-400/70"
                strokeWidth={3}
              />
            )}
          </div>
        ))}
      </div>

      {/* brand flame, top-left flourish */}
      <div className="gm-flame absolute top-6 left-6 hidden sm:flex items-center gap-2 text-orange-500">
        <Flame size={22} className="fill-orange-400/40" />
        <span className="gm-font-mono text-xs tracking-wide text-base-content/50">
          v1.0.0-swipe
        </span>
      </div>

      {/* card stack stage */}
      <div
        ref={stageRef}
        className="relative w-full max-w-95"
        style={{ perspective: "1400px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative transition-transform duration-150 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          }}
        >
          {/* ghost swipe cards */}
          <div
            className="gm-ghost absolute inset-0 rounded-[20px] border border-base-300 bg-base-100/80 shadow-xl"
            style={{ "--rot": "-7deg", "--ty": "10px", animationDelay: "0s" }}
          />
          <div
            className="gm-ghost absolute inset-0 rounded-[20px] border border-base-300 bg-base-100/60 shadow-xl"
            style={{ "--rot": "6deg", "--ty": "16px", animationDelay: "-2.4s" }}
          />

          {/* main terminal card */}
          <div
            className="relative z-10 overflow-hidden rounded-[20px] border border-base-300 bg-base-100 shadow-2xl"
            style={{ transform: "translateZ(30px)" }}
          >
            {/* titlebar */}
            <div className="flex items-center gap-2 bg-neutral px-4 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="gm-font-mono ml-2 text-[11px] tracking-wide text-neutral-content/50">
                TechTinder login
              </span>
            </div>

            <div className="gm-font-sans px-7 pb-6 pt-7">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="gm-font-mono bg-linear-to-br from-rose-500 to-emerald-400 bg-clip-text text-xl font-extrabold text-transparent">
                  {"{ }"}
                </span>
                <span className="gm-font-mono text-xl font-bold tracking-tight text-base-content">
                  TechTinder
                </span>
              </div>
              <p className="mb-6 text-sm text-base-content/60">
                Swipe right. <b className="text-base-content">Merge</b> hearts,
                not just branches.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="gm-font-mono mb-1.5 block text-[11px] text-base-content/40"
                  >
                    <span className="text-emerald-600">@ </span>email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.dev"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input input-bordered w-full bg-base-200/60 focus:border-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="gm-font-mono mb-1.5 block text-[11px] text-base-content/40"
                  >
                    <span className="text-emerald-600">* </span>password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••••"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="input input-bordered w-full bg-base-200/60 pr-11 focus:border-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                      className="btn btn-ghost btn-circle btn-xs absolute right-1.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                    >
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="-mt-1 flex items-center justify-center text-xs">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="font-semibold text-rose-500 hover:underline"
                  >
                    forgot?
                  </a>
                </div>

                <button
                  type="submit"
                  className="gm-font-mono group mt-1.5 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-rose-500 to-orange-500 px-5 py-3 text-[13.5px] font-bold text-white shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-500/40 active:translate-y-0"
                  onClick={handleLoginSubmit}
                >
                  commit login
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <div className="divider gm-font-mono text-[11px] text-base-content/40 before:bg-base-300 after:bg-base-300">
                  or continue with
                </div>

                <p className="mt-1 text-center text-xs text-base-content/60">
                  new here?{" "}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="font-semibold text-rose-500 hover:underline"
                  >
                    fork an account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
