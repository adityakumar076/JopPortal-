import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
                setIsMenuOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white border-b'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/student">Student Portal</Link></li>
                        <li><Link to="/company">Company Portal</Link></li>
                        <li><Link to="/admin/jobs">Manage Jobs</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                        <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                                <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className='md:hidden flex items-center gap-4'>
                    {user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer w-8 h-8">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                    <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 mr-4">
                                <div className=''>
                                    <div className='flex gap-2 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                            <AvatarFallback>{user?.fullname?.charAt(0) || "U"}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {
                                            user && user.role === 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='md:hidden bg-white border-t'>
                    <div className='px-4 pt-2 pb-6 space-y-4 shadow-lg'>
                        <ul className='flex flex-col font-medium gap-4'>
                            <li><Link to="/" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:text-[#F83002]'>Home</Link></li>
                            <li><Link to="/student" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:text-[#F83002]'>Student Portal</Link></li>
                            <li><Link to="/company" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:text-[#F83002]'>Company Portal</Link></li>
                            <li><Link to="/admin/jobs" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:text-[#F83002]'>Manage Jobs</Link></li>
                            <li><Link to="/jobs" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:text-[#F83002]'>Jobs</Link></li>
                            <li><Link to="/browse" onClick={() => setIsMenuOpen(false)} className='block py-2 hover:text-[#F83002]'>Browse</Link></li>
                        </ul>
                        {!user && (
                            <div className='flex flex-col gap-3 pt-4 border-t'>
                                <Link to="/login" onClick={() => setIsMenuOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
                                <Link to="/signup" onClick={() => setIsMenuOpen(false)}><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white w-full">Signup</Button></Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar