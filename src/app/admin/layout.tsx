import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/admin/Sidebar';

export const metadata = {
  title: 'Admin Panel - ErgoPack India',
  description: 'Manage your ErgoPack India website',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated (except for login page)
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
