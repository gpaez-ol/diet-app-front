import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Routes } from "../../general/utils/routes";

interface NavTabsProps {
  userType: string | undefined;
}

function NavTabs(props: NavTabsProps) {
  const customerTabs = (
    <>
      <Button title="Dashboard" href={Routes.customerDashboard} color="primary">
        Dashboard
      </Button>
      <Button title="Browse" href={Routes.customerBrowse} color="primary">
        Browse
      </Button>
    </>
  );

  const adminTabs = (
    <>
      <Button
        title="Configurator"
        href={Routes.adminConfigurator}
        color="primary"
      >
        Configurator
      </Button>
    </>
  );

  const defaultTabs = (
    <>
      <Button title="Browse" href={Routes.customerBrowse} color="primary">
        Browse
      </Button>
    </>
  );

  const renderTabs = () => {
    switch (props.userType) {
      case "Customer":
        return customerTabs;
      case "Admin":
        return adminTabs;
      default:
        return defaultTabs;
    }
  };

  return <Box sx={{ width: "100%" }}>{renderTabs()}</Box>;
}

export default NavTabs;
