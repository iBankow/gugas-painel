import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/sidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";

const Sidebar = () => {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });
  const { onClose, isOpen } = useSidebarDrawer();
  const { colorMode } = useColorMode();

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement={"left"} onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg={colorMode === 'dark' ? "gray.800" : 'white'} p={"4"}>
            <DrawerCloseButton mt={"6"} />
            <DrawerHeader>Navegacao</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as={"aside"} w={"64"} mr={"8"}>
      <SidebarNav />
    </Box>
  );
};

export { Sidebar };
