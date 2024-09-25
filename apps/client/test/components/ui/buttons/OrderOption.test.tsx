import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import OrderOption from '../../../../src/components/ui/buttons/OrderOption'
import {
  sortProductsLowToHigh,
  sortProductsHighToLow,
} from '../../../../src/components/redux/productSlice'
import { OrderOptionTypes } from '../../../../src/types/ui.types'

const mockStore = configureMockStore([])
const store = mockStore({})

jest.mock('../../../../src/components/redux/productSlice', () => ({
  sortProductsLowToHigh: jest.fn(() => ({ type: 'sortProductsLowToHigh' })),
  sortProductsHighToLow: jest.fn(() => ({ type: 'sortProductsHighToLow' })),
}))

describe('OrderOption Component', () => {
  it('renders with the correct label', () => {
    const props: OrderOptionTypes = {
      label: 'Sort by Price',
      sortType: 'lowToHigh',
    }
    render(
      <Provider store={store}>
        <OrderOption {...props} />
      </Provider>,
    )

    expect(screen.getByText('Sort by Price')).toBeInTheDocument()
  })

  it('dispatches sortProductsLowToHigh action on click when sortType is lowToHigh', () => {
    const props: OrderOptionTypes = {
      label: 'Sort by Price',
      sortType: 'lowToHigh',
    }
    render(
      <Provider store={store}>
        <OrderOption {...props} />
      </Provider>,
    )

    fireEvent.click(screen.getByText('Sort by Price'))
    expect(sortProductsLowToHigh).toHaveBeenCalled()
  })

  it('dispatches sortProductsHighToLow action on click when sortType is highToLow', () => {
    const props: OrderOptionTypes = {
      label: 'Sort by Price',
      sortType: 'highToLow',
    }
    render(
      <Provider store={store}>
        <OrderOption {...props} />
      </Provider>,
    )

    fireEvent.click(screen.getByText('Sort by Price'))
    expect(sortProductsHighToLow).toHaveBeenCalled()
  })
})
