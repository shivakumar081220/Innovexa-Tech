import { create } from 'zustand'

export const useStore = create((set) => ({
  // Theme
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Admin panel state
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Current page in admin
  currentAdminPage: 'dashboard',
  setCurrentAdminPage: (page) => set({ currentAdminPage: page }),

  // Filter and search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  filterStatus: 'all',
  setFilterStatus: (status) => set({ filterStatus: status }),
}))
