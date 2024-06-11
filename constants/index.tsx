
interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
  subMenu?: SidebarLink[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/icons/home.svg",
    route: "/profile",
    label: "Profile",
    subMenu: [
      {
        imgURL: "/icons/home.svg",
        route: "/profile/personal-information",
        label: "Personal Information",
      },
      {
        imgURL: "/icons/home.svg",
        route: "/profile/address",
        label: "Address",
      },
      {
        imgURL: "/icons/home.svg",
        route: "/profile/preferences",
        label: "Preferences",
      },
    ],
  },
  {
    imgURL: "/icons/home.svg",
    route: "/sports",
    label: "Sports",
  },
  {
    imgURL: "/icons/home.svg",
    route: "/gaming",
    label: "Gaming",
  },
  {
    imgURL: "/icons/home.svg",
    route: "/events",
    label: "Events",
  },
  {
    imgURL: "/icons/home.svg",
    route: "#",
    label: "Log out",
  },
];