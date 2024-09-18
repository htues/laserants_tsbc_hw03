import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../../redux/sidebarSlice'
import { RootState } from '../../redux/rootSlice'
import ActionBar from './ActionBar'

function UserHeader() {
  const sidebarToggle = useSelector((state: RootState) => state.sidebar.isOpen)
  const dispatch = useDispatch()

  const setSidebarToggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div
      className={`relative ${sidebarToggle ? 'w-full' : 'w-[calc(100%-16rem)] ml-64'}`}
    >
      <ActionBar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    </div>
  )
}

export default UserHeader
