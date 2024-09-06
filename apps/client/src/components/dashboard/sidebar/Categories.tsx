import { FaHome, FaRegFileAlt } from 'react-icons/fa'
import { dashboardStyles } from '../../ui/twind/styles'

const testCategories = [
  'Electronics',
  'Clothing',
  'Shoes',
  'Accessories',
  'Home',
]

function Categories() {
  return (
    <span>
      <ul className={dashboardStyles.sidebar_ul}>
        <li className={dashboardStyles.sidebar_li_active}>
          <a href="/" className={dashboardStyles.sidebar_a}>
            <FaHome className={dashboardStyles.sidebar_li_icon} />
            All Products
          </a>
        </li>
      </ul>

      {testCategories.map((category) => (
        <ul key={category} className={dashboardStyles.sidebar_ul}>
          <li className={dashboardStyles.sidebar_li}>
            <a href="/categories" className={dashboardStyles.sidebar_a}>
              <FaRegFileAlt className={dashboardStyles.sidebar_li_icon} />
              {category}
            </a>
          </li>
        </ul>
      ))}
    </span>
  )
}

export default Categories
