"use client";
import { logOut } from "@/redux/features/Auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";

const NavbarDropDown = ({ user }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logOut())
    router.push("/");
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user?.name}
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem
          key="dashboard"
          href={
            user?.role === "Admin"
              ? "/admin-dashboard"
              : user?.role === "Trainer"
              ? "/trainer-dashboard"
              : user?.role === "Trainee"
              ? "/trainee-dashboard"
              : "/"
          }
        >
          Dashboard
        </DropdownItem>
        <DropdownItem key="settings" href="/profile">
          My Profile
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={() => handleLogout()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
