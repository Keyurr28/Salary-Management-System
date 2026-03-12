import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../pages styles/DashboardHome.css';

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell,
    BarChart, Bar, Legend,
} from 'recharts';

/* ── Data ─────────────────────────────────────── */
const attendanceTrend = [
    { month: 'Jan', Present: 42, Absent: 8, Leave: 5 },
    { month: 'Feb', Present: 38, Absent: 12, Leave: 7 },
    { month: 'Mar', Present: 45, Absent: 6, Leave: 4 },
    { month: 'Apr', Present: 40, Absent: 9, Leave: 6 },
    { month: 'May', Present: 48, Absent: 5, Leave: 3 },
    { month: 'Jun', Present: 44, Absent: 7, Leave: 5 },
];

const onLeaveData = [
    { name: 'Sick', value: 3, color: '#2563EB' },
    { name: 'Paid + Type', value: 3, color: '#10B981' },
    { name: 'Paid', value: 2, color: '#F59E0B' },
];

const payrollBar = [
    { month: 'Fay', amt: 45000 },
    { month: 'May', amt: 52000 },
    { month: 'Jun', amt: 56200 },
    { month: 'Jul', amt: 48000 },
    { month: 'Sep', amt: 61000 },
    { month: 'Nov', amt: 56200 },
];

const deptSalary = [
    { name: 'Dept $50k', value: 50000, color: '#F59E0B' },
    { name: 'Dept $250k', value: 250000, color: '#2563EB' },
    { name: 'Sales $120k', value: 120000, color: '#10B981' },
    { name: '$10k', value: 10000, color: '#6B7280' },
];

const activityFeed = [
    { initials: 'JD', name: 'John Doe (EMP001) joined Sales', time: 'Jan 17, 2022 · 8:38 PM', color: '#2563EB' },
    { initials: 'LS', name: 'Lisa Smith marked Present', time: 'Jan 17, 2022 · 8:05 PM', color: '#10B981' },
    { initials: 'MJ', name: 'Mike Johnson updated profile', time: 'Jan 17, 2022 · 6:38 PM', color: '#EF4444' },
];

const employees = [
    { name: 'John Doe', id: 'EMP001', role: '', img: 'JD', bg: '#2563EB' },
    { name: 'Saart Brom', id: '', role: 'Tom Mate', img: 'SB', bg: '#10B981' },
];

const snapEmployees = [
    { name: 'John Doe', id: 'EMP001', bg: '#2563EB' },
    { name: 'Sarah Brown', id: 'Sales', bg: '#F59E0B' },
    { name: 'Mike Johnson', id: 'Internal', bg: '#EF4444' },
];

/* Calendar helpers */
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
function buildCal(year, month) {
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    return { first, days };
}

/* Circular progress */
function CircleProgress({ value, max = 120, size = 80 }) {
    const r = 30, cx = 40, cy = 40;
    const circ = 2 * Math.PI * r;
    const pct = value / max;
    return (
        <svg width={size} height={size} viewBox="0 0 80 80">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E5E7EB" strokeWidth="8" />
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10B981" strokeWidth="8"
                strokeDasharray={`${pct * circ} ${circ}`}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
            />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                fontSize="16" fontWeight="700" fill="#111827">{value}</text>
        </svg>
    );
}

/* Sparkline (mini area) */
function Sparkline() {
    const d = [30, 45, 35, 50, 40, 55, 48];
    const maxV = Math.max(...d);
    const pts = d.map((v, i) => `${(i / (d.length - 1)) * 100},${100 - (v / maxV) * 100}`).join(' ');
    return (
        <svg viewBox="0 0 100 60" width="90" height="40" preserveAspectRatio="none">
            <polyline points={pts} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
    );
}

/* ── Component ──────────────────────────────── */
export default function DashboardHome() {
    const { first, days } = buildCal(2022, 0);
    const cells = Array(first).fill(null).concat(Array.from({ length: days }, (_, i) => i + 1));

    return (
        <div className="cn-root">
            {/* Desktop sidebar */}
            <aside className="cn-aside">
                <Sidebar isMobile={false} />
            </aside>

            {/* Mobile Bootstrap Offcanvas Sidebar */}
            <div className="offcanvas offcanvas-start cn-offcanvas-bs d-lg-none" tabIndex="-1" id="cnMobileSidebar" aria-labelledby="cnMobileSidebarLabel">
                <div className="offcanvas-header border-bottom border-white border-opacity-10 py-3" style={{ backgroundColor: '#1E2A4A' }}>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-0" style={{ backgroundColor: '#1E2A4A' }}>
                    <Sidebar isMobile />
                </div>
            </div>

            {/* Main */}
            <div className="cn-main">
                <Header />

                <main className="cn-content">

                    {/* ── Row 1: Stat Cards ── */}
                    <div className="cn-stats-row">

                        {/* Total Employees */}
                        <div className="cn-card cn-stat-card">
                            <div className="cn-stat-label">Total Employees</div>
                            <div className="d-flex align-items-end justify-content-between mt-2">
                                <div className="cn-stat-num">120</div>
                                <Sparkline />
                            </div>
                        </div>

                        {/* Today Present */}
                        <div className="cn-card cn-stat-card">
                            <div className="cn-stat-label">Today Present</div>
                            <div className="d-flex align-items-center gap-3 mt-2">
                                <div className="cn-stat-num">95</div>
                                <CircleProgress value={95} max={120} size={72} />
                            </div>
                        </div>

                        {/* On Leave */}
                        <div className="cn-card cn-stat-card">
                            <div className="cn-stat-label">On Leave</div>
                            <div className="d-flex align-items-center gap-2 mt-2">
                                <PieChart width={80} height={80}>
                                    <Pie data={onLeaveData} cx={35} cy={35} innerRadius={22} outerRadius={36}
                                        dataKey="value" startAngle={90} endAngle={-270}>
                                        {onLeaveData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                    </Pie>
                                    <text x={37} y={39} textAnchor="middle" dominantBaseline="middle"
                                        fontSize="13" fontWeight="700" fill="#111827">8</text>
                                </PieChart>
                                <div className="cn-legend-list">
                                    {onLeaveData.map((item, i) => (
                                        <div key={i} className="cn-legend-item">
                                            <span className="cn-dot" style={{ background: item.color }} />
                                            <span className="cn-legend-text">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Payroll */}
                        <div className="cn-card cn-stat-card">
                            <div className="cn-stat-label">This Month Payroll</div>
                            <div className="cn-stat-num cn-payroll-num mt-1">$56,200</div>
                            <ResponsiveContainer width="100%" height={45}>
                                <BarChart data={payrollBar} barSize={8} margin={{ top: 4, bottom: 0, left: 0, right: 0 }}>
                                    <Bar dataKey="amt" radius={[3, 3, 0, 0]}>
                                        {payrollBar.map((_, i) => (
                                            <Cell key={i} fill={i === 2 || i === 5 ? '#2563EB' : '#BFDBFE'} />
                                        ))}
                                    </Bar>
                                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                    </div>

                    {/* ── Row 2: Charts ── */}
                    <div className="cn-charts-row">

                        {/* Attendance Trend */}
                        <div className="cn-card cn-chart-card cn-trend-card">
                            <div className="cn-card-header">
                                <span className="cn-card-title">Attendance Trend</span>
                                <div className="d-flex gap-2">
                                    <select className="cn-select"><option>Month</option></select>
                                    <select className="cn-select"><option>over-month</option></select>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={180}>
                                <AreaChart data={attendanceTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="gPresent" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="gAbsent" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="gLeave" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false}
                                        tickFormatter={v => `${v}%`} domain={[0, 55]} />
                                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,.1)', fontSize: 12 }} />
                                    <Area type="monotone" dataKey="Present" stroke="#2563EB" fill="url(#gPresent)" strokeWidth={2} dot={{ r: 3, fill: '#2563EB' }} />
                                    <Area type="monotone" dataKey="Absent" stroke="#10B981" fill="url(#gAbsent)" strokeWidth={2} dot={{ r: 3, fill: '#10B981' }} />
                                    <Area type="monotone" dataKey="Leave" stroke="#F59E0B" fill="url(#gLeave)" strokeWidth={2} dot={{ r: 3, fill: '#F59E0B' }} />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Dept Salary Distribution */}
                        <div className="cn-card cn-chart-card">
                            <div className="cn-card-title mb-3">Department Salary Distribution</div>
                            <PieChart width={240} height={180}>
                                <Pie data={deptSalary} cx={115} cy={85} innerRadius={50} outerRadius={82}
                                    dataKey="value" startAngle={90} endAngle={-270} paddingAngle={2}>
                                    {deptSalary.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={v => `$${(v / 1000).toFixed(0)}k`}
                                    contentStyle={{ borderRadius: 8, border: 'none', fontSize: 11 }} />
                            </PieChart>
                            <div className="cn-legend-grid">
                                {deptSalary.map((item, i) => (
                                    <div key={i} className="cn-legend-item">
                                        <span className="cn-dot" style={{ background: item.color }} />
                                        <span className="cn-legend-text">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* ── Row 3: Activity + Quick Actions + Directory + Calendar ── */}
                    <div className="cn-bottom-row">

                        {/* Left column */}
                        <div className="cn-bottom-left">

                            {/* Recent Activity */}
                            <div className="cn-card cn-activity-card">
                                <div className="cn-card-title mb-3">Recent Activity Feed</div>
                                {activityFeed.map((a, i) => (
                                    <div key={i} className="cn-activity-item">
                                        <div className="cn-activity-avatar" style={{ background: a.color }}>
                                            {a.initials}
                                        </div>
                                        <div>
                                            <div className="cn-activity-name">{a.name}</div>
                                            <div className="cn-activity-time">{a.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Employee Directory Snapshot */}
                            <div className="cn-card mt-3">
                                <div className="cn-card-title mb-3">Employee Directory Snapshot</div>
                                <div className="cn-snap-row">
                                    {snapEmployees.map((e, i) => (
                                        <div key={i} className="cn-snap-item">
                                            <div className="cn-snap-avatar" style={{ background: e.bg }}>
                                                {e.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="cn-snap-name">{e.name}</div>
                                            <div className="cn-snap-id">{e.id}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right column */}
                        <div className="cn-bottom-right">

                            {/* Quick Actions */}
                            <div className="cn-card cn-qa-card">
                                <div className="cn-card-title mb-3">Quick Actions</div>
                                <div className="cn-qa-grid">
                                    <button className="cn-qa-primary">
                                        <i className="bi bi-person-plus me-2" />Add New Employee
                                        <i className="bi bi-chevron-right ms-auto" />
                                    </button>
                                    <button className="cn-qa-btn">
                                        <i className="bi bi-play-circle me-2" />Run Payroll
                                    </button>
                                    <button className="cn-qa-btn">
                                        <i className="bi bi-calendar-check me-2" />Review Leave Requests
                                    </button>
                                    <button className="cn-qa-btn">
                                        <i className="bi bi-file-earmark-bar-graph me-2" />Access Reports
                                    </button>
                                </div>
                            </div>

                            {/* Employee Directory */}
                            <div className="cn-card mt-3 cn-dir-card">
                                <div className="cn-card-title mb-2">Employee Directory</div>
                                <div className="cn-dir-row">
                                    {employees.map((e, i) => (
                                        <div key={i} className="cn-dir-item">
                                            <div className="cn-dir-avatar" style={{ background: e.bg }}>
                                                {e.img}
                                            </div>
                                            <div className="cn-dir-name">{e.name}</div>
                                            <div className="cn-dir-id">{e.id || e.role}</div>
                                        </div>
                                    ))}
                                </div>
                                <button className="cn-view-btn mt-2">View Full List</button>
                            </div>

                            {/* Calendar Preview */}
                            <div className="cn-card mt-3 cn-cal-card">
                                <div className="cn-card-header mb-2">
                                    <span className="cn-card-title">Calendar Preview</span>
                                    <div>
                                        <button className="cn-cal-nav">‹</button>
                                        <button className="cn-cal-nav">›</button>
                                    </div>
                                </div>
                                <div className="cn-cal-grid cn-cal-head">
                                    {DAYS.map(d => <div key={d} className="cn-cal-dh">{d}</div>)}
                                </div>
                                <div className="cn-cal-grid">
                                    {cells.map((day, i) => (
                                        <div key={i} className={`cn-cal-day
                      ${day === 5 ? 'cn-cal-today' : ''}
                      ${day === 18 ? 'cn-cal-key' : ''}
                      ${!day ? 'cn-cal-empty' : ''}
                    `}>
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div className="cn-cal-legend mt-2">
                                    <span className="cn-dot" style={{ background: '#EF4444' }} /> Holidays
                                    <span className="cn-dot ms-2" style={{ background: '#F59E0B' }} /> Date
                                    <span className="cn-dot ms-2" style={{ background: '#10B981' }} /> Key dates
                                </div>
                            </div>

                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
