// =========================================================
// DASHBOARD COMPONENT
// =========================================================
// Features:
// - Summary KPI Cards
// - Order Status Analytics
// - Revenue Analytics
// - Recent Orders
// - Top Customers
// - Responsive Layout
//
// Recommended Packages:
// npm install recharts react-icons
// =========================================================

import React, { useMemo } from "react";
import {
  FiShoppingCart,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Dashboard = ({ orders = [], customers = [], loading = false }) => {
  // =========================================================
  // 🔹 CALCULATIONS
  // =========================================================

  const stats = useMemo(() => {
    const totalOrders = orders.length;

    const completedOrders = orders.filter(
      (o) => o.orderStatus?.toLowerCase() === "completed",
    ).length;

    const pendingOrders = orders.filter(
      (o) => o.orderStatus?.toLowerCase() === "pending",
    ).length;

    const openOrders = orders.filter(
      (o) => o.orderStatus?.toLowerCase() === "open",
    ).length;

    const cancelledOrders = orders.filter(
      (o) => o.orderStatus?.toLowerCase() === "cancelled",
    ).length;

    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.totalAmount || order.total || 0),
      0,
    );

    return {
      totalOrders,
      completedOrders,
      pendingOrders,
      openOrders,
      cancelledOrders,
      totalRevenue,
    };
  }, [orders]);

  // =========================================================
  // 🔹 STATUS CHART DATA
  // =========================================================

  const statusData = [
    {
      name: "Completed",
      value: stats.completedOrders,
    },
    {
      name: "Pending",
      value: stats.pendingOrders,
    },
    {
      name: "Open",
      value: stats.openOrders,
    },
    {
      name: "Cancelled",
      value: stats.cancelledOrders,
    },
  ];

  const COLORS = ["#22c55e", "#facc15", "#3b82f6", "#ef4444"];

  // =========================================================
  // 🔹 MONTHLY REVENUE DATA
  // =========================================================

  const monthlyRevenue = useMemo(() => {
    const months = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);

      const month = date.toLocaleString("default", {
        month: "short",
      });

      const amount = Number(order.totalAmount || order.total || 0);

      if (!months[month]) {
        months[month] = 0;
      }

      months[month] += amount;
    });

    return Object.keys(months).map((month) => ({
      month,
      revenue: months[month],
    }));
  }, [orders]);

  // =========================================================
  // 🔹 TOP CUSTOMERS
  // =========================================================

  const topCustomers = useMemo(() => {
    const customerTotals = {};

    orders.forEach((order) => {
      const customerName = order.customer?.name || "Unknown";

      const amount = Number(order.totalAmount || order.total || 0);

      if (!customerTotals[customerName]) {
        customerTotals[customerName] = 0;
      }

      customerTotals[customerName] += amount;
    });

    return Object.entries(customerTotals)
      .map(([name, total]) => ({
        name,
        total,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [orders]);

  // =========================================================
  // 🔹 RECENT ORDERS
  // =========================================================

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // =========================================================
  // 🔹 LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading Dashboard...</div>
    );
  }

  // =========================================================
  // 🔹 MAIN JSX
  // =========================================================

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* ========================================================= */}
      {/* 🔹 PAGE TITLE */}
      {/* ========================================================= */}

      {/* <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Order & customer analytics overview
        </p>
      </div> */}

      {/* ========================================================= */}
      {/* 🔹 KPI CARDS */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<FiShoppingCart />}
        />

        <StatCard
          title="Completed Orders"
          value={stats.completedOrders}
          icon={<FiCheckCircle />}
        />

        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={<FiClock />}
        />

        <StatCard
          title="Cancelled Orders"
          value={stats.cancelledOrders}
          icon={<FiXCircle />}
        />

        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={<FiDollarSign />}
        />

        <StatCard
          title="Customers"
          value={customers.length}
          icon={<FiUsers />}
        />
      </div>

      {/* ========================================================= */}
      {/* 🔹 CHARTS */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        {/* STATUS CHART */}

        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* REVENUE CHART */}

        {/* <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="revenue" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div> */}
      </div>

      {/* ========================================================= */}
      {/* 🔹 RECENT ORDERS + TOP CUSTOMERS */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        {/* RECENT ORDERS */}

        {/* <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between border rounded-xl p-3"
              >
                <div>
                  <div className="font-semibold">{order.orderNo}</div>

                  <div className="text-sm text-gray-500">
                    {order.customer?.name || "Unknown"}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">
                    ₹
                    {Number(
                      order.totalAmount || order.total || 0,
                    ).toLocaleString()}
                  </div>

                  <div className="text-xs text-gray-500">
                    {order.orderStatus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* TOP CUSTOMERS */}
        {/* 
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-lg font-semibold mb-4">Top Customers</h2>

          <div className="space-y-3">
            {topCustomers.map((customer, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-xl p-3"
              >
                <div>
                  <div className="font-semibold">{customer.name}</div>

                  <div className="text-sm text-gray-500">Customer</div>
                </div>

                <div className="font-bold">
                  ₹{customer.total.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

// =========================================================
// 🔹 REUSABLE KPI CARD
// =========================================================

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>

      <div className="text-3xl text-gray-700">{icon}</div>
    </div>
  );
};

export default Dashboard;
