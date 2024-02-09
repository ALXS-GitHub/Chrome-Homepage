import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLocation } from 'react-router-dom';

import './Cursor.css'

const Cursor = () => {
    const location = useLocation();
    const cursor = useRef(null);
    const cursorInner = useRef(null);
    const cursorOuter = useRef(null);
    const cursorOuterInner = useRef(null);
    const cursorOuterOuter = useRef(null);


    // & cursor movement and click effects
    useEffect(() => {

        const links = document.querySelectorAll('a, button, .link, input');

        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            gsap.to(cursorInner.current, {
                x: clientX,
                y: clientY,
                xPercent: -50,
                yPercent: -50,
                duration: 0,
            });
            gsap.to(cursorOuter.current, {
                x: clientX,
                y: clientY,
                xPercent: -50,
                yPercent: -50,
                duration: 0.5,
            });
            
        };

        const clickIn = () => {
            gsap.killTweensOf(cursorOuterOuter.current);
            gsap.to(cursorOuterOuter.current, {
                scale: 0.8,
                opacity: 0.8,
                duration: 0.05,
            });
        };

        const clickOut = () => {
            gsap.killTweensOf(cursorOuterOuter.current);
            gsap.to(cursorOuterOuter.current, {
                scale: 1,
                opacity: 1,
                duration: 0.05,
            });
        };

        const growCursor = () => {
            gsap.killTweensOf(cursorOuterOuter.current);
            gsap.killTweensOf(cursorOuterInner.current);
            gsap.to(cursorOuterOuter.current, {
                width: 50,
                height: 50,
                opacity: 0,
                duration: 0.4,
            });
            gsap.to(cursorOuterInner.current, {
                scale: 1,
                duration: 0.05,
            });
        };
        
        const shrinkCursor = () => {
            gsap.killTweensOf(cursorOuterOuter.current);
            gsap.killTweensOf(cursorOuterInner.current);
            gsap.to(cursorOuterOuter.current, {
                width: 40,
                height: 40,
                opacity: 1,
                duration: 0.4,
            });
            gsap.to(cursorOuterInner.current, {
                scale: 0.01,
                duration: 0.05,
            });
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', clickIn);
        window.addEventListener('mouseup', clickOut);

        const addLinkListeners = (link) => {
            link.addEventListener('mouseover', growCursor);
            link.addEventListener('mouseleave', shrinkCursor);
        };
    
        links.forEach(addLinkListeners);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const newLinks = document.querySelectorAll('a, button, .link, input');
                    newLinks.forEach((link) => {
                        if (!link.hasGrowCursorListener) {
                            addLinkListeners(link);
                            link.hasGrowCursorListener = true;
                        }
                    });
                }
            });
        });
    
        observer.observe(document.body, { childList: true, subtree: true });


        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', clickIn);
            window.removeEventListener('mouseup', clickOut);
            links.forEach((link) => {
                link.removeEventListener('mouseover', growCursor);
                link.removeEventListener('mouseleave', shrinkCursor);
            });
            observer.disconnect();
        };
    }, []);

    // & reset cursor on location change / route change

    const resetCursor = () => {
        console.log('reset');
        gsap.killTweensOf(cursorOuterOuter.current);
        gsap.killTweensOf(cursorOuterInner.current);
        gsap.to(cursorOuterOuter.current, {
            width: 40,
            height: 40,
            opacity: 1,
            scale: 1,
            duration: 0.1,
        });
        gsap.to(cursorOuterInner.current, {
            scale: 0.01,
            duration: 0.1,
        });
    };

    useEffect(() => {
        resetCursor();
    }, [location]);

    return (
        <div ref={cursor} id="cursor" className="cursor">
            <div ref={cursorInner} className="cursor__inner"></div>
            
            <div ref={cursorOuter} className="cursor__outer">
                <div ref={cursorOuterOuter} className="cursor__outer-outer"></div>
                <div ref={cursorOuterInner} className="cursor__outer-inner"></div>
            </div>
            
        </div>
    );
};

export default Cursor