import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface NavbarProp {
    category: Category[];
}

const Navbar: React.FC<NavbarProp> = ({category}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!keyword.trim()) return;
        navigate(`/tim-kiem?keyword=${encodeURIComponent(keyword)}`);
    };
    return (
        <nav className="bg-gray-900 border-gray-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <span
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >
          <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Logo"
          />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-green-400">
            TRUYENCHANH.VN
          </span>
        </span>

                <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                <div
                    className={`${
                        mobileOpen ? "block" : "hidden"
                    } w-full md:block md:w-auto`}
                >
                    <ul className="font-medium flex flex-col md:flex-row md:space-x-6 p-4 md:p-0 mt-4 md:mt-0 rounded-lg bg-gray-800 md:bg-transparent text-gray-200">
                        <li
                            className="cursor-pointer hover:text-white"
                            onClick={() => {
                                navigate("/danh-sach");
                                setMobileOpen(false);
                            }}
                        >
                            DANH SÁCH
                        </li>
                        <li
                            className="cursor-pointer hover:text-white"
                            onClick={() => {
                                navigate("/hot-nhat");
                                setMobileOpen(false);
                            }}
                        >
                            HOT NHẤT
                        </li>

                        <li
                            className="relative cursor-pointer hover:text-white"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            THỂ LOẠI
                            {showDropdown && (
                                <div
                                    className="absolute top-full left-0 mt-2 w-56 max-w-[90vw] bg-gray-800 shadow-lg rounded-md p-4 grid grid-cols-2 gap-2 z-50">
                                    {category.map((cat) => (
                                        <button
                                            key={cat._id}
                                            onClick={() => {
                                                setMobileOpen(false);
                                                navigate(`/the-loai/${cat.slug}`);
                                            }}
                                            className="block text-left px-2 py-1 text-gray-300 hover:bg-gray-700 hover:text-white rounded w-full"
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </li>

                        <li className="cursor-pointer hover:text-white">COMING SOON</li>

                        <li className="mt-3 md:mt-0">
                            <form
                                className="flex items-center gap-2"
                                onSubmit={handleSearch}
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm Kiếm"
                                        onChange={(e) => setKeyword(e.target.value)}
                                        value={keyword}
                                        className="pl-3 pr-8 py-1 rounded bg-gray-700 text-sm text-gray-200 placeholder-gray-400 focus:outline-none"
                                    />
                                    <button
                                        className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                        type="submit"
                                    >
                                        🔍
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium"
                                >
                                    Đăng nhập
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
