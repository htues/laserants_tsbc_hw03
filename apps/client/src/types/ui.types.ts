export type ActionBarTypes = {
    sidebarToggle: boolean,
    setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>
}

export type OrderOptionTypes = {
    label: string,
    sortType: string,
}

export type ModalTypes = {
    onClose: () => void,
    children: React.ReactNode
}