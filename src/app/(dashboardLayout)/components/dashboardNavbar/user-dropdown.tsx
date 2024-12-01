
import { logOut, useCurrentToken } from "@/redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";

const UserDropdown = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  let user:any

  if (token) {
    user = verifyToken(token);
  }
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
          name="Jason Hughes"
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" href="/admin-dashboard/profile">
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

export default UserDropdown;
