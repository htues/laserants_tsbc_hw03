import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import { toggleSidebar } from '../components/redux/sidebarSlice'
import Dashboard from '../components/dashboard/Dashboard'
import ViewProduct from '../components/dashboard/products/ViewProduct'

function AppRoutes() {
  const isSideBarCollapsed = useSelector(toggleSidebar)

  let marginLeftClass = isSideBarCollapsed ? 'ml-0' : 'ml-[250px]'

  return (
    <div
      className={`flex flex-grow ${marginLeftClass} max-w-screen-xl overflow-auto items-start justify-center`}
    >
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<ViewProduct />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
