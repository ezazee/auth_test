import React from 'react'
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Topbar from '@/components/Topbar';


const Dashboard = () => {
  return (
    <>
      <Topbar />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div
          className="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90"
          id="sidebarBackdrop"
        />
        <div
          id="main-content"
          className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
        >
          <main>
            <div className='p-5'>
              <h1>Hello Admin</h1>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Dashboard