"use client";

import Link from "next/link";
import { dropdownData } from "@/data/dropdown-data";
import { DropdownItem, FeaturedItem } from "@/types/dropdown";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownMenuProps {
  isOpen: boolean;
  dropdownKey: keyof typeof dropdownData | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DropdownMenu({
  isOpen,
  dropdownKey,
  onMouseEnter,
  onMouseLeave,
}: DropdownMenuProps) {
  if (!dropdownKey) return null;

  const content = dropdownData[dropdownKey];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{
            duration: 0.4, // Slower animation (from 0.2 to 0.4s)
            ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth easing
            height: { duration: 0.3 },
          }}
          className="fixed top-30 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40 overflow-hidden"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="container-8xl px-6 py-8"
          >
            <div className="flex">
              {/* MAIN */}
              <div className="flex-1">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="text-[15px] font-semibold text-gray-900 mb-4 tracking-tight"
                >
                  {content.title}
                </motion.h2>

                <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                  {content.items.map((item: DropdownItem, index: number) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.2 + index * 0.02, // Staggered animation
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <Link href={item.href} className="group block">
                        <div className="px-3 py-2.5 rounded-lg hover:bg-primary-50 transition-all duration-300 group-hover:shadow-sm">
                          <div className="flex items-start gap-3">
                            <motion.span
                              className="text-primary-500 font-bold select-none text-lg"
                              whileHover={{ scale: 1.2 }}
                              transition={{ duration: 0.2 }}
                            >
                              |
                            </motion.span>
                            <div>
                              <motion.h3
                                className="font-medium text-[13px] text-gray-900 leading-snug group-hover:text-primary-600 mb-1"
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.label}
                              </motion.h3>
                              <p className="text-[11px] text-gray-600 leading-snug line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FEATURED */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="w-80 ml-12 pl-8 border-l border-gray-200"
              >
                <h3 className="text-[14px] font-semibold text-gray-900 mb-3">
                  Featured in {content.title}
                </h3>

                <div className="space-y-4">
                  {content.featured.map((feature: FeaturedItem, index: number) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.3 + index * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href={feature.href}
                        className="block px-4 py-3 bg-linear-to-r from-gray-50 to-white rounded-xl hover:from-gray-100 hover:to-gray-50 transition-all duration-300 hover:shadow-md border border-gray-100"
                      >
                        {feature.isBreaking && (
                          <motion.div
                            className="flex items-center gap-2 mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                          >
                            <motion.span
                              className="h-2 w-2 rounded-full bg-red-500"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                            <span className="text-xs font-semibold text-red-500">
                              BREAKING
                            </span>
                          </motion.div>
                        )}
                        <h4 className="text-[13px] font-medium text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <motion.p
                          className="text-[11px] text-gray-600 leading-snug flex items-center gap-1"
                          whileHover={{ gap: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          Read full story →
                        </motion.p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}