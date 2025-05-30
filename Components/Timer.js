import { Progress } from "@heroui/react";
import React, { useEffect, useState } from 'react';

const Timer = ({ time, message, classNameTimer, classNameEtmam, withHour = true, withProgress = true }) => {
    const [seconds, setSeconds] = useState(time)
    const formatSeconds = (sec) => {
        if (sec < 0) return message
        const pad = (n) => n < 10 ? `0${n}` : n;
        const h = Math.floor(sec / 3600);
        const m = Math.floor(sec / 60) - (h * 60);
        const s = Math.floor(sec - h * 3600 - m * 60);
        return `${withHour ? `${(pad(h))} : ` : ''}${(pad(m))} : ${(pad(s))}`;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='flex flex-col gap-2 justify-end'>
            {withProgress && seconds > 0 && <Progress size='sm' aria-label="Loading..." color="danger" minValue={0} maxValue={1} value={1 - (seconds / 86400)} />}
            <span dir='ltr' className={seconds < 0 ? classNameEtmam : classNameTimer}>
                {formatSeconds(seconds)}
            </span>
        </div>
    );
};

export default Timer;