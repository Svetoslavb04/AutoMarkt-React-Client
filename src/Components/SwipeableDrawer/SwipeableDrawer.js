import { useState, useEffect } from 'react';
import {
  SwipeableDrawer
} from '../../mui-imports.js';

import './SwipeableDrawer.scss';

export default function Drawer(props) {

  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {

    props.setIsOpen(isOpen);

  }, [isOpen])

  useEffect(() => {

    setIsOpen(props.isOpen);

  }, [props.isOpen])

  const toggleDrawer = (open) => (e) => {
    if (
      e &&
      e.type === 'keydown' &&
      (e.key === 'Tab' || e.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const children = () => (
    <div
      className={props.drawerWrapperClassName}
      role="presentation"
    >
      {props.children}
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={props.side}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {children()}
      </SwipeableDrawer>
    </div>
  );
}
