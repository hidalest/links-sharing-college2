import React, { ForwardedRef } from 'react';

import styles from './Card.module.scss';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  priority: 'grey' | 'white' | 'transparent';
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  isDragging?: boolean;
}

const Card = React.forwardRef(
  (props: CardProps, forwardRef: ForwardedRef<HTMLDivElement>) => {
    const {
      children,
      className,
      priority,
      draggableProps,
      dragHandleProps,
      isDragging,
    } = props;

    const draggingClass = isDragging ? 'card-dragging' : '';
    return (
      <div
        className={`${styles.card} ${styles[priority]} ${styles[draggingClass]} ${className}`}
        ref={forwardRef}
        {...dragHandleProps}
        {...draggableProps}
      >
        {children}
      </div>
    );
  }
);

export default Card;
