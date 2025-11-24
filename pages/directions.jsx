import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Directions = () => {
    const { query, push } = useRouter()
    const { latlng } = query
    useEffect(() => {
        // if (!latlng) {
        //     push('/')
        // }
    }, [latlng])
    const [lat, lng] = (latlng || '').split(',')
    return (
        <>
            <div className="centerOfParent w-full my-6">
                <div className="flex flex-col items-center gap-4">
                    <h1 className='sm:text-xl font-bold'>روش مسیریابی خود را انتخاب کنید</h1>
                    <div className="flex items-center gap-8">
                        <Link target='_blank' href={`https://www.google.com/maps/place/${lat},${lng}`}>
                            <Image src='/Images/googlemap.png' width={100} height={100} />
                        </Link>
                        <Link target='_blank' href={`https://balad.ir/directions/driving?destination=${lng}%2C${lat}`}>
                            <Image src='/Images/balad.jpg' width={100} height={100} />
                        </Link>
                        <Link target='_blank' href={`https://nshn.ir/?lat=${lat}&lng=${lng}`}>
                            <Image src='/Images/neshan.png' width={100} height={100} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Directions;