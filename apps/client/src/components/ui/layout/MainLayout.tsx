import { useSelector } from 'react-redux'

import UserHeader from '../header/UserHeader'
import UserFooter from '../footer/UserFooter'
import SideBar from '../header/SideBar'
import AppRoutes from '../../../routes/AppRoutes'

import { dashboardStyles } from '../twind/styles'

function MainLayout() {
  return (
    <div className={dashboardStyles.container_main_layout}>
      <div className={dashboardStyles.container_main_header}>
        <UserHeader />
      </div>
      <div className={dashboardStyles.container_main_sidebar}>
        <SideBar />
      </div>
      <div
        className={`${dashboardStyles.container_main_content} flex items-center justify-center overflow-hidden`}
      >
        <div className={dashboardStyles.container_main_routes}>
          <AppRoutes />
        </div>
      </div>

      <div className={dashboardStyles.container_main_footer}>
        <UserFooter />
      </div>
    </div>
  )
}

export default MainLayout
