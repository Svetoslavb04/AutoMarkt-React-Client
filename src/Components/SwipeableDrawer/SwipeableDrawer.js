import { useState, useEffect, useCallback } from 'react';
import {
  SwipeableDrawer
} from '../../mui-imports.js';

import './SwipeableDrawer.scss';

export default function Drawer({ isOpen, setIsOpen, side, drawerWrapperClassName, children }) {

  const [isOpenInternal, setIsOpenInternal] = useState(isOpen);

  const rememberedSetIsOpen = useCallback((value) => setIsOpen(value), [setIsOpen]);

  useEffect(() => {

    rememberedSetIsOpen(isOpenInternal);

  }, [isOpenInternal, rememberedSetIsOpen])

  useEffect(() => {

    setIsOpenInternal(isOpen);

  }, [isOpen])

  const toggleDrawer = (open) => (e) => {
    if (
      e &&
      e.type === 'keydown' &&
      (e.key === 'Tab' || e.key === 'Shift')
    ) {
      return;
    }

    setIsOpenInternal(open);
  };

  return (
    <div>
      <SwipeableDrawer
        anchor={side}
        open={isOpenInternal}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          className={drawerWrapperClassName}
          role="presentation"
        >
          {children}
        </div>
      </SwipeableDrawer>
    </div>
  );
}
