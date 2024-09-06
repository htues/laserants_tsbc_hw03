import { FaBars, FaSearch, FaDollarSign, FaShoppingBasket } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { APP_NAME } from '../../utils/envvars'
import { ActionBarTypes } from '../../../types/ui.types'
import { dashboardStyles } from '../twind/styles'
import OrderOption from '../buttons/OrderOption'

function ActionBar({
  sidebarToggle,
  setSidebarToggle,
}: Readonly<ActionBarTypes>) {
  return (
    <nav className={dashboardStyles.header_actionbar_nav}>
      <div className="flex items-center text-xl">
        <FaBars
          className="text-white me-4 cursor-pointer"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
        <span className="text-white font-semibold">{APP_NAME}</span>
      </div>

      <div className="flex items-center gap-x-5">
        <div className="relative md:w-65">
          <span className="relative md:absolute inset-y-0-left-0 flex items-center pl-2">
            <button className="p-1 focus:outline-none text-white md:text-black">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            className="w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block"
          />
        </div>

        <div className="relative">
          <button className="text-white group">
            <FaDollarSign className="w-6 h-6 mt-1" />
            <div className="z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0">
              <ul className="py-2 text-sm text-gray-950">
                <li className={dashboardStyles.header_actionbar_orderOption}>
                  <OrderOption label="Lowest to Highest" path="/profile" />
                </li>

                <li className={dashboardStyles.header_actionbar_orderOption}>
                  <OrderOption label="Highest to Lowest" path="/settings" />
                </li>
              </ul>
            </div>
          </button>
        </div>

        <div className="text-white">
          <FaShoppingBasket className="w-6 h-6" />
        </div>

      </div>
    </nav>
  )
}

export default ActionBar;