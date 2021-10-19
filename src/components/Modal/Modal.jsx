import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export default function  Modal({onClose,children}){

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown',handleKeyDown)
    }
  })


const handleBackdropClick = e =>{
  if(e.currentTarget === e.target){
    onClose();
  }
}

const handleKeyDown = e => {
      if (e.code === 'Escape') {
       onClose();
      }
    };
  

  return createPortal(
          <div className={s.Overlay} onClick={handleBackdropClick}>
          <div className={s.Modal}>{children}</div>
        </div>,
        modalRoot,
        );
}