import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.scss';

const Modal = (props) => {
    const [portal] = useState(() => document.createElement('div'));

    useEffect(() => {
        const html = document.documentElement;

        document.body.appendChild(portal);

        const scrollBarWidth = window.innerWidth - html.clientWidth;
        html.style.marginRight = scrollBarWidth + 'px';

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.removeChild(portal);
            html.style.marginRight = ''
            document.body.style.overflow = 'auto';
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return createPortal(
        <div className={classes.modal} onClick={props.onClick}>
            <div className={classes.content} onClick={e => e.stopPropagation()}>
                <div className={classes.close}>
                    <i
                        onClick={props.onClick}
                        className={`fa fa-times ${classes.iconClose}`}aria-hidden="true"></i>
                </div>
                {props.children}
            </div>
        </div>,
        portal
    );
}

export default Modal;
