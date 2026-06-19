import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUsers, FaHandHoldingHeart, FaCalendar, FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
  const { api } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/reports/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [api]);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaDollarSign className="text-2xl" />}
          title="Total Donations"
          value={`$${stats?.totalDonations?.toLocaleString() || 0}`}
          color="blue"
        />
        <StatCard
          icon={<FaUsers className="text-2xl" />}
          title="Active Volunteers"
          value={stats?.activeVolunteers || 0}
          color="green"
        />
        <StatCard
          icon={<FaHandHoldingHeart className="text-2xl" />}
          title="Beneficiaries"
          value={stats?.activeBeneficiaries || 0}
          color="purple"
        />
        <StatCard
          icon={<FaCalendar className="text-2xl" />}
          title="Events"
          value={stats?.totalEvents || 0}
          color="orange"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Donations by Category</h2>
        {stats?.donationsByCategory?.map((cat) => (
          <div key={cat.category} className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{cat.category}</span>
              <span>${cat.total?.toLocaleString() || 0}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(cat.total / (stats?.totalDonations || 1)) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className={`${colors[color]} text-white p-3 rounded-lg w-fit mb-4`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-2">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default Dashboard;
