import { useEffect } from 'react';

type UseOutsideClickClose = {
  isOpen: boolean;
  rootRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
};

export const useOutsideClickClose = ({
  isOpen,
  rootRef,
  onClose,
}: UseOutsideClickClose): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent): void => {
      const target = event.target;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleMouseDown);

    return (): void => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, rootRef, onClose]);
};
