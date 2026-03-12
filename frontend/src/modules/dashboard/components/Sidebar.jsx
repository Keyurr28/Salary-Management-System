import React from 'react';

const navItems = [
    { icon: 'bi-grid-1x2-fill', label: 'Dashboard', active: true },
    { icon: 'bi-people', label: 'Employees' },
    { icon: 'bi-calendar-check', label: 'Attendance' },
    { icon: 'bi-cash-stack', label: 'Payroll' },
    { icon: 'bi-diagram-3', label: 'Departments' },
    { icon: 'bi-calendar-x', label: 'Leave' },
    { icon: 'bi-bar-chart-line', label: 'Reports' },
    { icon: 'bi-gear', label: 'Settings' },
];

const Sidebar = ({ isMobile }) => (
    <div className="cn-sidebar d-flex flex-column h-100"
        style={{ width: isMobile ? '100%' : '180px' }}>

        {/* Logo */}
        <div className="cn-sidebar-logo">
            <div className="cn-logo-icon">
                <i className="bi bi-hexagon-fill" />
            </div>
            <div>
                <div className="cn-logo-name">CorpNet</div>
                <div className="cn-logo-sub">StaffOps</div>
            </div>
        </div>

        {/* Nav */}
        <nav className="cn-nav flex-grow-1">
            {navItems.map((item, i) => (
                <a href="#" key={i}
                    className={`cn-nav-item ${item.active ? 'cn-nav-active' : ''}`}>
                    <i className={`bi ${item.icon}`} />
                    <span>{item.label}</span>
                </a>
            ))}
        </nav>

        {/* User */}
        <div className="cn-sidebar-footer">
            <img src="https://ui-avatars.com/api/?name=Admin&background=3B5BDB&color=fff"
                alt="Admin" width="32" height="32" className="rounded-circle" />
            <div className="cn-footer-text">
                <div className="cn-footer-name">Admin</div>
                <div className="cn-footer-role">HR Manager</div>
            </div>
        </div>
    </div>
);

export default Sidebar;
