import React from 'react';
import { motion } from 'framer-motion';

const IridescenceBackground: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
      ></motion.div>
    </div>
  );
};

export default IridescenceBackground;