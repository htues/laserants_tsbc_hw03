export const toastStyles = {
  base: 'bg-black text-yellow-500',
  progress: 'bg-blue-600',
}

export const dashboardStyles = {
  container_main_layout: 'min-h-screen grid grid-rows-[auto,1fr,auto]',
  container_main_header: 'col-span-2 fixed left-0 right-0 z-10 top-0',
  container_main_sidebar:
    'h-full fixed top-[header-height] bottom-[footer-height]',
  container_main_content:
    'ml-[sidebar-width] flex items-center justify-center pt-[header-height] pb-[footer-height] min-h-screen',
  container_main_routes: 'w-full max-w-screen-lg px-4',
  container_main_footer: 'col-span-2 fixed left-0 right-0 z-10 bottom-0',
  footer_body: 'flex justify-between items-center bg-black text-white',
  footer_links:
    'mx-3 font-semibold hover:opacity-80 duration-150 hover:text-teal-500 hover:underline',
  sidebar_ul: 'mt-3 text-white font-bold',
  sidebar_li: 'mb-2 rounded hover:shadow hover:bg-blue-900 py-2',
  sidebar_li_active: 'font-semibold text-teal-500',
  sidebar_a: 'px-3',
  sidebar_li_icon: 'inline-block w-6 h-6 mr-2 -mt-2',
  sidebar_header_div: 'my-2 mb-4',
  sidebar_header_h1: 'text-2x text-white font-bold',
  header_actionbar_orderOption:
    'mb-2 rounded hover:shadow hover:bg-gray-600 hover:text-white py-2',
  header_actionbar_nav: 'bg-gray-800 px-4 py-3 flex justify-between',
}

export const productStyles = {
  dboard_card: 'border rounded-lg shadow-lg overflow-hidden',
  dboard_image: 'w-full h-48 object-cover',
  dboard_details: 'p-4',
  dboard_name: 'text-xl font-bold',
  dboard_description: 'text-gray-700',
  dboard_footer: 'flex justify-between items-center mt-4',
  dboard_price: 'text-lg font-semibold text-green-600',
  dboard_cartbutton:
    'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center',
  dboard_listbutton:
    'bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 flex items-center',
  dboard_product_grid:
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8',

}

export const formStyles = {
  modal:
    'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
  modal_content: 'bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl',
  modal_close: "absolute top-4 right-4 text-gray-500 cursor-pointer",
  modal_productdetails_image: 'w-full h-64 object-cover rounded-t-lg',
  modal_productdetails_name: 'text-2xl font-bold mt-4',
  modal_productdetails_description: 'mt-2 text-gray-600',
  modal_productdetails_price: 'block mt-4 text-xl font-semibold text-gray-800',
}