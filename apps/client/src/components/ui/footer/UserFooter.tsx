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
          EULA
        </a>{' '}
        <a
          href="https://www.twitter.com"
          className={dashboardStyles.footer_links}
        >
            <FaTwitter />
          Customer Support
        </a>{' '}
        <a
          href="https://www.tiktok.com"
          className={dashboardStyles.footer_links}
        >
            <FaTiktok />
          Service Desk
        </a>{' '}
      </div>
    </footer>
  )
}

export default UserFooter