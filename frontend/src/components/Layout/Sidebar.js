import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  Assignment,
  FitnessCenter,
  AttachMoney,
  Favorite,
  EmojiEvents,
  People,
  Home,
  MenuBook,
  Analytics,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
  { text: "Task Manager", path: "/tasks", icon: <Assignment /> },
  { text: "Habit Tracker", path: "/habits", icon: <FitnessCenter /> },
  { text: "Finance Hub", path: "/finance", icon: <AttachMoney /> },
  { text: "Health Tracker", path: "/health", icon: <Favorite /> },
  { text: "Goal Manager", path: "/goals", icon: <EmojiEvents /> },
  { text: "Relationships", path: "/relationships", icon: <People /> },
  { text: "Home & Lifestyle", path: "/home", icon: <Home /> },
  { text: "Knowledge Base", path: "/knowledge", icon: <MenuBook /> },
  { text: "Analytics", path: "/analytics", icon: <Analytics /> },
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 100%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
              },
              
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                
                "&::before": {
                  opacity: 1,
                },
              },
              
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                transform: "scale(1.02)",
                fontWeight: 600,
                
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "primary.contrastText",
                  borderRadius: "0 4px 4px 0",
                },
                
                "&:hover": {
                  backgroundColor: "primary.dark",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                  transform: "scale(1.02) translateY(-1px)",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === item.path
                    ? "primary.contrastText"
                    : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
