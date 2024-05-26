import { motion } from "framer-motion";

const ModernBackdrop = ({ children, onClick }) => {
 
  return (
    <motion.div
      onClick={onClick}
      className="h-[100vh] w-[100vw] absolute top-0 left-0 z-10 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default ModernBackdrop;
