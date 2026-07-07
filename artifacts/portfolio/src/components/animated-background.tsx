import { motion } from "framer-motion";
import { useMemo } from "react";

type ShapeKind = "circle" | "square" | "triangle";

interface P {
  id: number;
  kind: ShapeKind;
  lime: boolean;
  size: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
  rotate: number;
}

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function AnimatedBackground() {
  const particles = useMemo<P[]>(() => {
    const kinds: ShapeKind[] = ["circle", "square", "triangle"];
    return Array.from({ length: 60 }, (_, i) => {
      const r = (o: number) => sr(i * 13 + o);
      return {
        id: i,
        kind: kinds[Math.floor(r(0) * 3)],
        lime: r(1) > 0.45,
        size: 10 + r(2) * 18,
        left: `${r(3) * 100}%`,
        top: `${r(4) * 100}%`,
        duration: 8 + r(5) * 14,
        delay: r(6) * -12,
        dx: (r(7) - 0.5) * 160,
        dy: (r(8) - 0.5) * 160,
        rotate: (r(9) - 0.5) * 360,
      };
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden"
      style={{ background: "#000" }}
    >
      {particles.map((p) => {
        const color = p.lime ? "#a3e635" : "#fb923c";
        const opacity = 0.1 + (p.id % 5) * 0.03;

        let shapeStyle: React.CSSProperties = {};
        if (p.kind === "circle") {
          shapeStyle = { borderRadius: "50%", background: color };
        } else if (p.kind === "square") {
          shapeStyle = {
            background: "transparent",
            border: `2px solid ${color}`,
          };
        } else {
          shapeStyle = {
            background: color,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            borderRadius: 0,
          };
        }

        return (
          <motion.div
            key={p.id}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity,
              filter: "blur(0.8px)",
              ...shapeStyle,
            }}
            animate={{
              x: [0, p.dx, p.dx * 0.4, -p.dx * 0.6, 0],
              y: [0, p.dy * 0.5, p.dy, p.dy * 0.3, 0],
              rotate: [0, p.rotate * 0.4, p.rotate, p.rotate * 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop",
            }}
          />
        );
      })}
    </div>
  );
}
