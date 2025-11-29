import React, {useEffect, useState} from 'react';
import useSwipeScroll from "hooks/useHorizontalScroll";
import Story from "./Story";
import {FaChevronRight, FaChevronLeft} from "react-icons/fa6";

const Stories = ({data: Stories = []}) => {
    const scroll = useSwipeScroll()
    const [isScrollable, setIsScrollable] = useState(false);

    useEffect(() => {
        const slider = scroll.current;
        if (!slider) return;

        const checkScrollable = () => {
            setIsScrollable(slider.scrollWidth > slider.clientWidth);
        };

        checkScrollable();

        const resizeObserver = new ResizeObserver(checkScrollable);
        resizeObserver.observe(slider);

        return () => {
            resizeObserver.disconnect();
        };
    }, [scroll]);


    return (
        <>
            <div className="container flex flex-col gap-4 mt-10">
                <div className="flex items-center justify-between gap-4">
                    <h2 className='text-primary-950 font-semibold sm:text-base text-sm'>استوری ها</h2>
                    <div className="centerOfParent gap-4">
                        {isScrollable && (
                            <>
                                <button
                                    onClick={() => scroll.current.scrollBy({left: 200, behavior: 'smooth'})}
                                    className="centerOfParent w-8 h-8 rounded-full border border-primary-400 bg-primary-100"
                                >
                                    <FaChevronRight className="fill-primary-600"/>
                                </button>
                                <button
                                    onClick={() => scroll.current.scrollBy({left: -200, behavior: 'smooth'})}
                                    className="centerOfParent w-8 h-8 rounded-full border border-primary-400 bg-primary-100"
                                >
                                    <FaChevronLeft className="fill-primary-600"/>
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div dir='rtl' ref={scroll}
                     className="container flex scrollbar-hide items-stretch overflow-x-auto lg:gap-6 sm:gap-5 gap-4">
                    {Stories.map((story, index) => (
                        <div key={story.id}
                             className="centerOfParent flex-col gap-4 sm:max-w-[120px] w-full max-w-32">
                            <Story story={story} Stories={Stories} index={index}/>
                            <div className="sm:text-sm text-xs line-clamp-2 grow text-center">{story.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Stories;