import { motion, type HTMLMotionProps } from "framer-motion";

export const softSpring = { type: "spring", stiffness: 100, damping: 20 } as const;

export function Reveal({ delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...softSpring, delay }}
      {...props}
    />
  );
}
