import { NavbarUser } from "./navbarUser";
import BodyWrapper from "./BodyWrapper";

export const UserSidebar = ({ children }) => {
  return (
    <BodyWrapper>
      <div className="flex h-screen bg-gray-200">
        <NavbarUser />

        <div className="flex flex-col flex-1 overflow-auto">

          <div
            className="content-box"
            style={{ flexGrow: 2, flexBasis: "0%" }}
          >
            {children}
          </div>
        </div>
      </div>
    </BodyWrapper>
  );
};
