import { useState } from "react";

const Payments = ({ data }) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <div className="w-full p-4 border rounded-lg mt-3">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setShow(!show)}>
                    <h5>تاریخچه تراکنش ها</h5>
                    <div className="centerOfParent">
                        {show ? <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg> : <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg>}
                    </div>
                </div>
                {show && <div className="mt-3">
                    <ul className="flex flex-col gap-2">
                        {data.map((p, i) => {
                            return <li key={i} className="flex items-center border p-2 rounded-lg gap-4">
                                <p>بیت پی</p>
                                <span className={`${p.payment_status_id === 1 ? 'text-blue-500' : p.payment_status_id == 2 ? 'text-red-500' : 'text-green-500'}`}>
                                    {p.payment_status}
                                </span>
                                <div className="flex items-center gap-2">
                                    کد پیگیری
                                    <span>{p.authority}</span>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>}
            </div>
        </>
    );
};

export default Payments;