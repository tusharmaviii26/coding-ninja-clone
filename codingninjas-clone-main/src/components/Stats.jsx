import { useEffect, useRef, useState } from "react";
import {
  FaUserGraduate,
  FaChartLine,
  FaBuilding,
  FaRupeeSign,
} from "react-icons/fa";

/* ---------------- STATIC DATA (OUTSIDE COMPONENT) ---------------- */

const headingLines = ["9 years of", "transforming", "tech careers"];

const stats = [
  {
    icon: <FaUserGraduate className="text-[40px]" />,
    color: "#7C3AED",
    title: "1.5 Lac+ learners",
    subtitle: "cracked dream roles at top tech companies",
  },
  {
    icon: <FaBuilding className="text-[40px]" />,
    color: "#22C55E",
    title: "1,400 Alumni in MAANG",
    subtitle: "& more in 103/111 Unicorns",
  },
  {
    icon: <FaRupeeSign className="text-[40px]" />,
    color: "#EC4899",
    title: "1 Cr+ highest CTC",
    subtitle: "after completing the course",
  },
  {
    icon: <FaChartLine className="text-[40px]" />,
    color: "#3B82F6",
    title: "128% average hike",
    subtitle: "via our placement cell",
  },
];

function Stats() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeLine, setActiveLine] = useState(-1);
  const [lineProgress, setLineProgress] = useState({});

  const sectionsRef = useRef([]);
  const headingRef = useRef(null);
  const headingWrapperRef = useRef(null);

  /* ---------------- INTERSECTION OBSERVER (FIXED) ---------------- */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setActiveIndex((prev) => (prev !== index ? index : prev));
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ---------------- HEADING SCROLL ANIMATION ---------------- */

  useEffect(() => {
  let rafId = null;

  const onScroll = () => {
    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      const wrapper = headingWrapperRef.current;
      const heading = headingRef.current;
      if (!wrapper || !heading) return;

      const rect = wrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // ✅ HARD VISIBILITY CHECK
      const isVisible =
        rect.top < viewportHeight * 0.6 &&
        rect.bottom > viewportHeight * 0.4;

      // ❌ If wrapper is leaving screen → RESET EVERYTHING
      if (!isVisible) {
        setActiveLine(-1);
        return;
      }

      const viewportCenter = viewportHeight / 2;
      const children = Array.from(heading.children);

      let bestIndex = -1;
      let bestDistance = Infinity;

      children.forEach((child, idx) => {
        const r = child.getBoundingClientRect();
        const childCenter = r.top + r.height / 2;
        const dist = Math.abs(childCenter - viewportCenter);

        if (dist < bestDistance) {
          bestDistance = dist;
          bestIndex = idx;
        }
      });

      setActiveLine((prev) =>
        prev !== bestIndex ? bestIndex : prev
      );
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}, []);


  /* ---------------- LINE FILL SCROLL SYNC ---------------- */

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const newProgress = {};

        stats.forEach((_, i) => {
          const el = sectionsRef.current[`line-${i}`];
          if (!el) return;

          const rect = el.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const visible =
            1 - Math.min(Math.max(rect.top / viewportHeight, 0), 1);

          newProgress[i] = visible * 100;
        });

        setLineProgress(newProgress);
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    handleScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------- RENDER ---------------- */

  return (
    <section className="relative w-screen flex flex-col items-center bg-[#15181A] text-center overflow-hidden">
      {/* Heading */}
      <div
        ref={headingWrapperRef}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <h2
          ref={headingRef}
          className="flex flex-col space-y-4 text-4xl sm:text-5xl md:text-6xl font-extrabold"
        >
          {headingLines.map((line, i) => {
            const isActive = activeLine === i;
            return (
              <div
                key={i}
                className="transition-all duration-700"
                style={{
                  color: isActive
                    ? "#fff"
                    : "rgba(255,255,255,0.4)",
                  transform: `scale(${isActive ? 1.08 : 0.95})`,
                  opacity: isActive ? 1 : 0.55,
                }}
              >
                {line}
              </div>
            );
          })}
        </h2>
      </div>

      {/* Stats */}
      <div className="flex flex-col items-center w-full space-y-20">
        {stats.map((stat, i) => {
          const isActive = activeIndex === i;
          return (
            <div
              key={i}
              ref={(el) => (sectionsRef.current[i] = el)}
              data-index={i}
              className="flex flex-col items-center transition-all duration-700"
              style={{
                opacity: isActive ? 1 : 0.5,
                transform: `scale(${isActive ? 1.05 : 0.9})`,
              }}
            >
              <div
                className="p-6 rounded-2xl mb-12"
                style={{
                  backgroundColor: isActive
                    ? stat.color
                    : "#1F1F1F",
                }}
              >
                {stat.icon}
              </div>

              <h3 className="text-[28px] md:text-6xl font-semibold mb-8 text-white">
                {stat.title}
              </h3>

              <p className="text-gray-400 text-[16px] md:text-2xl">
                {stat.subtitle}
              </p>

              {i !== stats.length - 1 && (
                <div
                  ref={(el) =>
                    (sectionsRef.current[`line-${i}`] = el)
                  }
                  className="relative w-[3px] h-24 mt-6 mb-6"
                >
                  <div className="absolute inset-0 border-l-[2px] border-dashed border-gray-700 opacity-40" />
                  <div
                    className="absolute top-0 left-0 w-[2px] bg-gray-400"
                    style={{
                      height: `${Math.min(
                        lineProgress[i] || 0,
                        100
                      )}%`,
                      opacity: lineProgress[i] ? 0.9 : 0.3,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Button */}
      <div className="mt-20 mb-24">
        <button
          onClick={() =>
            document
              .getElementById("courses")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-[#ff6d28] px-8 py-3 text-white font-semibold rounded-lg hover:bg-[#ff874a] transition"
        >
          Explore offerings
        </button>
      </div>
    </section>
  );
}

export default Stats;
