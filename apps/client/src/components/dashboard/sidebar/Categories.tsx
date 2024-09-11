import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loadData from '../../../api/loadData'
import { getCategories } from '../../redux/categorySlice'
import { setSelectedCategory } from '../../redux/categorySlice'
import { selectCategories } from '../../redux/categorySelector'
import { FaHome, FaRegFileAlt } from 'react-icons/fa'
import { dashboardStyles } from '../../ui/twind/styles'


function Categories() {
  const [tries, setTries] = useState(0)
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)

  useEffect(() => {
    const fetchCategories = async () => {
      await loadData(tries, setTries, getCategories, dispatch)
    }
    fetchCategories()
  }, [tries, dispatch])

  const handleCategoryClick = (id: number | null) => {
    dispatch(setSelectedCategory(id))
  }

  return (
    <span>
      <ul className={dashboardStyles.sidebar_ul}>
        <li
          className={dashboardStyles.sidebar_li_active}
          onClick={() => handleCategoryClick(null)}
        >
          <a href="#" className={dashboardStyles.sidebar_a}>
            <FaHome className={dashboardStyles.sidebar_li_icon} />
            All Products
          </a>
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            className={dashboardStyles.sidebar_li}
            onClick={() => handleCategoryClick(category.id)}
          >
            <a href="#" className={dashboardStyles.sidebar_a}>
              <FaRegFileAlt className={dashboardStyles.sidebar_li_icon} />
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </span>
  )
}

export default Categories
