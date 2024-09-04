import { useSelector } from 'react-redux'
import Categories from '../../dashboard/sidebar/Categories'
import { RootState } from '../../redux/rootSlice'
import { dashboardStyles } from '../twind/styles'

function SideBar() {
  const sidebarToggle = useSelector((state: RootState) => state.sidebar.isOpen)

  return (
    <div
      className={`${
        sidebarToggle ? ' hidden ' : ' block '
      } w-64 bg-gray-600 fixed h-full px-4 py-2`}
    >
      <div className={dashboardStyles.sidebar_header_div}>
        <h1 className={dashboardStyles.sidebar_header_h1}>Categories</h1>
      </div>
      <Categories />
    </div>
  )
}

export default SideBar
