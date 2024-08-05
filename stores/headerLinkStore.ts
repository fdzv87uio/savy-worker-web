import { create } from 'zustand'
import { persistNSync } from "persist-and-sync";

export const useHeaderLinkStore = create(
    persistNSync(
        (set, get) => ({
            headerLink: "home",
            setHeaderLink: (page: string) => set({ headerLink: page }),
        }),
        {
            name: 'header-link-store'
        },
    ),
)
