import React from "react";

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <h1 className="text-2xl font-bold">My Blog</h1>
                <nav className="flex gap-6">
                    <a href={'/post'} className="text-white hover:text-gray-300 transition">
                        NEW POST
                    </a>
                    <a href={'/posts'} className="text-white hover:text-gray-300 transition">
                        POSTS
                    </a>
                    <a href={'/auth'} className="text-white hover:text-gray-300 transition">
                        LOGIN | SIGN UP
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
