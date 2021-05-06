import React, { useEffect, useState } from 'react';

export const useClickedOutsideOf = (refs: React.MutableRefObject<any>[], shouldCheckChildren: boolean = true): boolean => {

    const [isClickedOutsideOf, setIsClickedOutsideOf] = useState(false);

    useEffect(() => {

        const clickedOutside = (e: MouseEvent) => {

            if (!e.target) { return; }

            const refList: EventTarget[] = refs.map((ref) => {
                if (!ref.current) { return null; }
                return ref.current;
            });

            let targeted = false;

            /** Recursively check each e.target up to maxRecurse recursion levels */
            function checkChildren(e: MouseEvent, element: HTMLElement, maxRecurses: number, currentRecurse = 0) {

                if (element.childNodes) {

                    element.childNodes.forEach((child) => {

                        if (targeted) { return; }

                        if (e.target === child) {
                            targeted = true;
                        }

                    });

                }

                if (!targeted && currentRecurse < maxRecurses) {
                    checkChildren(e, element, maxRecurses, currentRecurse + 1);
                }

            }

            if (shouldCheckChildren) {

                refList.forEach((ref) => {

                    if (e.target === ref) {
                        targeted = true;
                    }

                    checkChildren(e, ref as HTMLElement, 3);

                });

            } else {

                refList.forEach((ref) => {

                    if (e.target === ref) {
                        targeted = true;
                    }

                });

            }

            if (targeted) {
                setIsClickedOutsideOf(false);
            } else {
                setIsClickedOutsideOf(true);
            }

        };

        document.addEventListener('mousedown', clickedOutside);

        return () => {
            document.removeEventListener('mousedown', clickedOutside);
        }

    });

    return isClickedOutsideOf;
}