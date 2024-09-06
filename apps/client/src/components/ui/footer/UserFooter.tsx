import { FaFacebook, FaTwitter, FaTiktok } from 'react-icons/fa'
import { dashboardStyles } from '../twind/styles'

function UserFooter() {
  return (
    <footer className={dashboardStyles.footer_body}>
      <p className={dashboardStyles.footer_links}>Developed by Tamayo & Co</p>
      <div className="flex">
        <a
          href="https://www.facebook.com"
          className={dashboardStyles.footer_links}
        >
          <FaFacebook />
        </a>{' '}
        <a
          href="https://www.twitter.com"
          className={dashboardStyles.footer_links}
        >
          <FaTwitter />
        </a>{' '}
        <a
          href="https://www.tiktok.com"
          className={dashboardStyles.footer_links}
        >
          <FaTiktok />
        </a>{' '}
      </div>
    </footer>
  )
}

export default UserFooter
