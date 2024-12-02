import { usePathname } from "next/navigation";
import { useSidebarContext } from "../../layout/layout-context";
import Link from "next/link";
import { Avatar, Tooltip } from "@nextui-org/react";
import { Sidebar } from "./sidebarStyles";
import {  CalendarDays, Home, HomeIcon, PersonStanding, Settings } from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import SidebarItem from "./SidebarItem";

 const TraineeSidebarWrapper = () => {

  const pathname = usePathname();
  const { collapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          {" "}
          <Link className="flex" href="/">
          <PersonStanding/>
            <p className="font-bold text-inherit px-4">GYMFIT</p>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<Home />}
              isActive={pathname === "/trainer-dashboard"}
              href="/trainer-dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/trainer-dashboard/view-classes"}
                title="View Classes"
                icon={<CalendarDays />}
                href="/trainer-dashboard/view-classes"
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Home"} color="primary">
              <div className="max-w-fit">
                <Link href='/'><Home/></Link>
              </div>
            </Tooltip>
            <Tooltip content={"settings"} color="primary">
              <div className="max-w-fit">
                <Settings />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary" >
              <Link href="/admin-dashboard/profile">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TraineeSidebarWrapper