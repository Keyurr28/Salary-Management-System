import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);

    const toggleTheme = () => {
        document.body.classList.add('theme-transition');

        if (!isDarkMode) {
            setIsDarkMode(true);
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            setIsDarkMode(false);
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }

        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500); // Wait for transition to finish
    };

    return (
        <header className="cn-header">
            {/* Mobile hamburger */}
            <button
                className="btn btn-link cn-hamburger d-lg-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#cnMobileSidebar"
                aria-controls="cnMobileSidebar"
            >
                <i className="bi bi-list fs-3" />
            </button>

            {/* Search */}
            <div className="cn-search-wrap">
                <i className="bi bi-search cn-search-icon" />
                <input
                    type="search"
                    className="cn-search-input"
                    placeholder="Search for employees, documents, or actions..."
                />
            </div>

            {/* Right icons */}
            <div className="cn-header-right">
                <button className="cn-icon-btn" onClick={toggleTheme} title="Toggle Dark/Light Mode">
                    {isDarkMode ? <i className="bi bi-sun" /> : <i className="bi bi-moon" />}
                </button>
                <button className="cn-icon-btn position-relative">
                    <i className="bi bi-bell" />
                    <span className="cn-badge" />
                </button>
                <button className="cn-icon-btn">
                    <i className="bi bi-chat-dots" />
                </button>
                <div className="cn-avatar-wrap">
                    <img
                        src="https://ui-avatars.com/api/?name=MK&background=3B5BDB&color=fff"
                        alt="User" width="34" height="34" className="rounded-circle"
                    />
                    <i className="bi bi-chevron-down cn-chevron" />
                </div>
            </div>
        </header>
    );
};

export default Header;
