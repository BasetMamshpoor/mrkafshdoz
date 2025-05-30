import style from './Information.module.css'
import { FiEdit } from 'react-icons/fi'
import { useContext } from 'react';
import { Authorization } from 'providers/AuthorizationProvider';
import createModal from 'Components/Modal';
import ChangePassword from './ChangePassword';
import { Functions } from 'providers/FunctionsProvider';
import EditModal from './EditModal';
import { IoMdCloseCircle } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';

const Information = () => {
    const { tokens, user } = useContext(Authorization)
    const { SwalStyled } = useContext(Functions)
    return (
        <>
            <div className={style.UBtgvIR4}>
                {Object.keys(user).length > 0 && <div className='grid sm:grid-cols-2 gap-4 grid-cols-1'>
                    <div className={style.kLRx8Fh}>
                        <EditModal value={user.first_name} titleFa='نام' titleEn='name' type='text' />
                        <div className={style.GvrclT4}>
                            <div className={style.Rcinpte}>
                                <p>نام و نام خانوادگی</p>
                            </div>
                            <p className={style.RcnlEx}>{user?.name}</p>
                        </div>
                    </div>
                    <div className={style.kLRx8Fh}>
                        <EditModal value={user.mobile} titleFa='شماره موبایل' titleEn='mobile' type='tel' verify />
                        <div className={style.GvrclT4}>
                            <div className={style.Rcinpte}>
                                <p className='flex items-center gap-2'>شماره موبایل<span>
                                    {user?.mobile_verified_at ? <FaCheckCircle className={`w-[20px] h-[20px] fill-green-500`} /> : <IoMdCloseCircle className={`w-[20px] h-[20px] fill-red-500`} />}</span></p>
                            </div>
                            <p className={style.RcnlEx}>{user?.mobile}</p>
                        </div>
                    </div>
                    <div className={style.kLRx8Fh}>
                        <div className={style.nbGr5K} onClick={() => createModal(<ChangePassword Swal={SwalStyled} token={tokens} mobile={user.mobile} />)}>
                            <FiEdit />
                        </div>
                        <div className={style.GvrclT4}>
                            <div className={style.Rcinpte}>
                                <p>رمز عبور</p>
                            </div>
                            <p className={style.RcnlEx}>•••••••</p>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
};

export default Information;