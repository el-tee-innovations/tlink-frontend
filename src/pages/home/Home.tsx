import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { Layout } from '../../components/Layout';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout showNavbar={false} className="bg-gray-50">
      {/* Hero Section */}
      <div className="text-center py-16" style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)', color: 'white' }}>
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to TLink 🔗
          </h1>
          <p className="text-xl mb-8" style={{ opacity: 0.9 }}>
            Connect jobseekers with recruiters and build your career
          </p>

          {!isAuthenticated && (
            <div className="grid gap-6 max-w-2xl mx-auto mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <Card className="border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                <CardBody className="text-center p-6">
                  <div className="text-3xl mb-4">👤</div>
                  <h3 className="text-xl font-semibold mb-2">Job Seeker?</h3>
                  <p className="mb-4" style={{ opacity: 0.9 }}>Find your next opportunity</p>
                  <Button variant="outline" className="bg-white text-primary hover:bg-gray-50">
                    Sign Up Now
                  </Button>
                </CardBody>
              </Card>

              <Card className="border-white/20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                <CardBody className="text-center p-6">
                  <div className="text-3xl mb-4">💼</div>
                  <h3 className="text-xl font-semibold mb-2">Recruiter?</h3>
                  <p className="mb-4" style={{ opacity: 0.9 }}>Find top talent</p>
                  <Button variant="outline" className="bg-white text-secondary hover:bg-gray-50">
                    Sign Up Now
                  </Button>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>

      {isAuthenticated ? (
        <div className="container py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {user?.firstName || user?.username}! 👋
            </h2>
            <p className="text-lg text-gray-600">
              Role: <strong className="text-primary">{user?.role?.replace(/_/g, ' ')}</strong>
            </p>
          </div>

          {/* Quick Dashboard Links */}
          <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {user?.role === 'JOB_SEEKER' && (
              <>
                <Card hover className="cursor-pointer">
                  <CardBody className="p-6">
                    <div className="text-2xl mb-3">📊</div>
                    <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
                    <p className="text-gray-600 mb-4">View job listings tailored to your skills</p>
                    <Button variant="primary" size="sm" fullWidth>
                      Go to Dashboard →
                    </Button>
                  </CardBody>
                </Card>

                <Card hover className="cursor-pointer">
                  <CardBody className="p-6">
                    <div className="text-2xl mb-3">👤</div>
                    <h3 className="text-lg font-semibold mb-2">Profile</h3>
                    <p className="text-gray-600 mb-4">Update your profile information</p>
                    <Button variant="secondary" size="sm" fullWidth>
                      Edit Profile →
                    </Button>
                  </CardBody>
                </Card>

                <Card hover className="cursor-pointer">
                  <CardBody className="p-6">
                    <div className="text-2xl mb-3">📋</div>
                    <h3 className="text-lg font-semibold mb-2">Applications</h3>
                    <p className="text-gray-600 mb-4">Track your job applications</p>
                    <Button variant="warning" size="sm" fullWidth>
                      View Applications →
                    </Button>
                  </CardBody>
                </Card>
              </>
            )}

            {user?.role === 'RECRUITER' && (
              <>
                <Card hover className="cursor-pointer">
                  <CardBody className="p-6">
                    <div className="text-2xl mb-3">📊</div>
                    <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
                    <p className="text-gray-600 mb-4">View your posted jobs and applications</p>
                    <Button variant="primary" size="sm" fullWidth>
                      Go to Dashboard →
                    </Button>
                  </CardBody>
                </Card>

                <Card hover className="cursor-pointer">
                  <CardBody className="p-6">
                    <div className="text-2xl mb-3">💼</div>
                    <h3 className="text-lg font-semibold mb-2">Post Job</h3>
                    <p className="text-gray-600 mb-4">Create a new job listing</p>
                    <Button variant="success" size="sm" fullWidth>
                      Post Job →
                    </Button>
                  </CardBody>
                </Card>

                <Card hover className="cursor-pointer">
                  <CardBody className="p-6">
                    <div className="text-2xl mb-3">📈</div>
                    <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                    <p className="text-gray-600 mb-4">View job statistics and metrics</p>
                    <Button variant="outline" size="sm" fullWidth>
                      View Analytics →
                    </Button>
                  </CardBody>
                </Card>
              </>
            )}

            {user?.role === 'ADMIN' && (
              <>
                <Card hover className="cursor-pointer">
                  <CardBody className="p-6">
                    <div className="text-2xl mb-3">📊</div>
                    <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
                    <p className="text-gray-600 mb-4">Platform overview and metrics</p>
                    <Button variant="primary" size="sm" fullWidth>
                      Go to Dashboard →
                    </Button>
                  </CardBody>
                </Card>

                <Card hover className="cursor-pointer">
                  <CardBody className="p-6">
                    <div className="text-2xl mb-3">👥</div>
                    <h3 className="text-lg font-semibold mb-2">Users</h3>
                    <p className="text-gray-600 mb-4">Manage user accounts</p>
                    <Button variant="error" size="sm" fullWidth>
                      Manage Users →
                    </Button>
                  </CardBody>
                </Card>

                <Card hover className="cursor-pointer">
                  <CardBody className="p-6">
                    <div className="text-2xl mb-3">💼</div>
                    <h3 className="text-lg font-semibold mb-2">Jobs</h3>
                    <p className="text-gray-600 mb-4">Manage all job listings</p>
                    <Button variant="success" size="sm" fullWidth>
                      Manage Jobs →
                    </Button>
                  </CardBody>
                </Card>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="container py-12">
          <Card className="max-w-md mx-auto">
            <CardBody className="text-center p-6">
              <p className="text-gray-600 mb-4">Already have an account?</p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" size="sm">
                  Login
                </Button>
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container text-center">
          <p className="mb-2">&copy; 2026 TLink Job Portal. All rights reserved.</p>
          <p className="text-sm opacity-80">Contact: support@tlink.com | Phone: +1 (555) 123-4567</p>
        </div>
      </footer>
    </Layout>
  );
};

