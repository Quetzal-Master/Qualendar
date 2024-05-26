import React from "react";
import { motion } from "framer-motion";

const StepVisual = ({ step, setStep }) => {
  return (
      <div className="min-h-[10%] mt-8 px-16 items-center flex justify-between w-full">
        {Array.from({ length: 3 }, (_, i) => (
            <React.Fragment key={i}>
              <motion.div
                  className="h-11 w-11 rounded-full"
                  style={{
                    backgroundColor: step > i ? "#a091dc" : "rgba(27, 27, 27, 0.4)",
                    border: "1px solid black",
                    padding: "4px",
                    boxSizing: "border-box",
                    backgroundClip: "content-box"
                  }}
                  animate={{
                    backgroundColor: step > i ? "#a091dc" : "rgba(27, 27, 27, 0.4)",
                    borderColor: step > i ? "#a091dc" : "rgba(27, 27, 27, 0.4)",
                  }}
                  transition={{
                    backgroundColor: { delay: 0.5, duration: 0.5 },
                    borderColor: { delay: 0.5, duration: 0.5 },
                  }}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setStep(i + 1)}
              />
              {i < 2 && (
                  <div className="flex-grow h-[6px]" style={{ backgroundColor: "rgba(27, 27, 27, 0.4)" }}> {/* Static line */}
                    <motion.div
                        className="h-full"
                        style={{ backgroundColor: step > i + 1 ? "#a091dc" : "rgba(27, 27, 27, 0.4)", scaleX: 0, originX: 0 }}
                        animate={{ backgroundColor: step > i + 1 ? "#a091dc" : "rgba(27, 27, 27, 0.4)", scaleX: step > i + 1 ? 1 : 0 }}
                        transition={{ backgroundColor: { duration: 0.5 }, scaleX: { duration: 0.5 } }}
                    />
                  </div>
              )}
            </React.Fragment>
        ))}
      </div>
  );
};

export default StepVisual;