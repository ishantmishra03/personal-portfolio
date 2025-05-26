import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedCounter({
  targetNumber,
  fontSize = 64,
  color = "#8df0cc",
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const duration = Math.min(Math.max(targetNumber * 0.03, 1), 5);
    const controls = animate(count, targetNumber, { duration });
    return () => controls.stop();
  }, [count, targetNumber]);

  return (
    <motion.pre
      style={{
        fontSize,
        color,
        margin: 0,
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {rounded}
    </motion.pre>
  );
}
