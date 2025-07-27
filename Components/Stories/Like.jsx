import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import axios from 'axios';
import Cookies from 'js-cookie';

const Like = ({ is_like, likes_count, id }) => {
    const [liked, setLiked] = useState(is_like);
    const [count, setCount] = useState(likes_count);

    const handleLike = async () => {
        try {
            const token = JSON.parse(Cookies.get('token'));
            await axios.post(
                `/stories/like/${id}`,
                {},
                {
                    headers: {
                        Authorization: `${token?.token_type} ${token?.access_token}`,
                    },
                }
            );
            setLiked(!liked);
            setCount(prev => liked ? prev - 1 : prev + 1);
        } catch (error) {
        }
    };

    return (
        <div className="flex items-center cursor-pointer flex-col gap-2" onClick={handleLike}>
            <div>
                {liked ? <FaHeart className="fill-red-500" /> : <FaRegHeart />}
            </div>
            <span className="text-xs">{count}</span>
        </div>
    );
};

export default Like;