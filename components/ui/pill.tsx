'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { FC } from 'react';
import { Button } from './button';

interface PillProps {
  selectedCount: number;
  onRemove: () => void;
}

export const Pill: FC<PillProps> = ({ selectedCount, onRemove }) => {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="
            inline-flex items-center gap-2 px-3 py-1.5
            bg-blue-100 text-blue-800 rounded-full
            text-sm font-medium shadow-sm
          "
        >
          <span>{selectedCount}</span>
          <Button size="icon" variant="ghost" className="h-5 w-5 rounded-full hover:bg-blue-200" onClick={onRemove} aria-label="Clear selection">
            <X size={14} className="text-blue-600" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
