import Link from "next/link";
import { AxiosPublic } from "../../config/axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import addComma from "Functions/addComma";
import { Functions } from "providers/FunctionsProvider";
import { Chip } from "@heroui/react";

const Search = () => {
    const { push } = useRouter()
    const [searchText, setSearchText] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const searchInput = useRef(null)
    const absolute = useRef(null)
    const { SwalStyled } = useContext(Functions)

    useEffect(() => {
        window.addEventListener('click', (e) => (!e.target.closest('#absolute')) && setData(null));
        return () => {
            clearTimeout(searchInput.current);
            window.removeEventListener('click', (e) => (!e.target.closest('#absolute')) && setData(null));
        };
    }, []);

    const HandelSearch = async (e) => {
        e.preventDefault()
        if (!searchText.trim()) SwalStyled.fire("", 'چیزی برای جستوجو وجود ندارد')
        if (searchText.trim().length < 3) SwalStyled.fire("", 'حداقل 3 حرف وارد کنید')
        else {
            setSearchText('')
            push(`/search?text=${searchText}`);
            setLoading(false)
            setData([])
        }
    }
    
    const handleChange = async (e) => {
        const { value } = e.target
        setSearchText(value)
        if (value.trim().length < 3)
            return
        if (value.length) {
            setLoading(true)
            clearTimeout(searchInput.current);
            searchInput.current = setTimeout(async () => {
                await AxiosPublic.get(`q_search?query=${value}`)
                    .then(res => {
                        setData(res.data)
                        setLoading(false)
                    })
                    .catch(err => {
                        SwalStyled.fire({
                            title: "انجام نشد",
                            text: err.response?.data.message || 'نتیجه ای پیدا نشد',
                            icon: "error",
                        })
                        setLoading(false)
                    })
            }, 1000);
        } else setData([])
    }

    return (
        <>
            <div className="relative flex-1 max-w-[500px]" dir="ltr">
                <form
                    onSubmit={HandelSearch}
                    className={`bg-white border flex-1 flex rounded-t-lg ${absolute.current?.children[0] ? '' : 'rounded-b-lg'} overflow-hidden`}>
                    <input
                        dir="auto"
                        className="focus:outline-none p-1 flex-1 placeholder:text-right text-right text-black"
                        type="text"
                        placeholder="... جستجو"
                        value={searchText}
                        onChange={handleChange}
                    />
                    <button className="bg-primary border-l px-2 py-1 centerOfParent" aria-label="سرچ">
                        <svg className='text-xl fill-white' stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 16 16" class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0">
                            </path>
                        </svg>
                    </button>
                </form>
                {(loading || !!data) && <div id="absolute"
                    className="absolute w-full z-10 bg-white text-black overflow-hidden rounded-b-lg border-b border-x" dir="rtl" ref={absolute}>
                    {loading ? <p className="p-3 text-sm">در حال بارگزاری ...</p> :
                        !!(data.length)
                            ? <div className="flex flex-col">
                                {data.map(r => {
                                    return <Link key={r.id} href={`/products/${r.id}`} className="w-full border-b px-2 cursor-pointer hover:bg-slate-100 duration-200">
                                        <div className="text-sm flex items-stretch gap-2 p-2">
                                            <div className="centerOfParent max-w-[64px] h-fit max-h-32 overflow-hidden rounded-lg">
                                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={0} height={0} sizes='100vw' className='w-full h-full object-cover' src={r.image} alt={r.name} />
                                            </div>
                                            <div className="flex flex-col gap-2 w-full p-2">
                                                <p className="grow line-clamp-1">{r.name}</p>
                                                {r.is_major && <Chip color="primary" size="sm">عمده</Chip>}
                                                {!r.is_major && <div className='self-end w-full space-y'>
                                                    <div className="flex justify-between items-center w-full">
                                                        {r.price !== r.offPrice && <span className="bg-red-500 text-white rounded p-1 text-xs">%{r.offPercent}</span>}
                                                        <span className='font-semibold hasToman self-end'>{addComma(r.offPrice.toString())}</span>
                                                    </div>
                                                    {r.price !== r.offPrice && <del className="block text-left text-gray-500 w-full">{addComma(r.price.toString())}</del>}
                                                </div>}
                                            </div>
                                        </div>
                                    </Link>
                                })}
                                {!!(data.length) &&
                                    <div onClick={HandelSearch} className="w-full border-b py-1 px-3 line-clamp-1 cursor-pointer hover:bg-slate-100 duration-200">
                                        <p className="text-sm italic text-center gap-2">
                                            دیدن تمام نتایج
                                        </p>
                                    </div>}
                            </div>
                            : searchText.length > 0 && <p className="p-3 text-sm">نتیجه ای پیدا نشد</p>
                    }
                </div>}
            </div>
        </>
    );
};

export default Search;