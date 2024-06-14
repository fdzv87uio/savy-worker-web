
interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
  subMenu?: SidebarLink[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/icons/profile.svg",
    route: "/profile",
    label: "Profile",
    subMenu: [
      {
        imgURL: "/",
        route: "/profile/personal-information",
        label: "Personal Information",
      },
      {
        imgURL: "/",
        route: "/profile/address",
        label: "Address",
      },
      {
        imgURL: "/",
        route: "/profile/preferences",
        label: "Preferences",
      },
    ],
  },
  {
    imgURL: "/icons/sports.svg",
    route: "/sports",
    label: "Sports",
  },
  {
    imgURL: "/icons/gaming.svg",
    route: "/gaming",
    label: "Gaming",
  },
  {
    imgURL: "/icons/events.svg",
    route: "/events",
    label: "Events",
    subMenu: [
      {
        imgURL: "/",
        route: "/events/create-event",
        label: "Create Event",
      },
      {
        imgURL: "/",
        route: "/events/my-events",
        label: "My events",
      },
      {
        imgURL: "/",
        route: "/events/upcomming-events",
        label: "Upcomming events",
      },
    ],
  },
  // {
  //   imgURL: "/icons/logout.svg",
  //   route: "#",
  //   label: "Log out",
  // },
];