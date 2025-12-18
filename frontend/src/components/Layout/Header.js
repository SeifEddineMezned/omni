import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
  Logout,
  Settings,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import authService from "../../services/auth";

const Header = ({ onMenuClick }) => {
  const { state, dispatch, toggleTheme } = useAppContext();
  const { user, themeMode, notifications } = state;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogout = async () => {
    handleMenuClose();
    await authService.logout();
    dispatch({ type: "SET_USER", payload: null });
    navigate("/login");
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);
  const notificationCount = notifications?.length || 0;

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* 🔥 CLICKABLE OMNI LOGO */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          onClick={() => navigate("/dashboard")}
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: 700,
            userSelect: "none",
            "&:hover": {
              opacity: 0.85,
            },
          }}
        >
          OMNI
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip
            title={`Switch to ${
              themeMode === "light" ? "dark" : "light"
            } mode`}
          >
            <IconButton size="large" color="inherit" onClick={toggleTheme}>
              {themeMode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              size="large"
              color="inherit"
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={notificationCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account settings">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.name?.[0] || "U"}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      {/* Account Menu */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfile}>
          <AccountCircle sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Settings sx={{ mr: 1 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isNotificationMenuOpen}
        onClose={handleNotificationMenuClose}
      >
        {notificationCount === 0 ? (
          <MenuItem disabled>No new notifications</MenuItem>
        ) : (
          notifications.map((notification, index) => (
            <MenuItem key={index} onClick={handleNotificationMenuClose}>
              {notification.message}
            </MenuItem>
          ))
        )}
      </Menu>
    </AppBar>
  );
};

export default Header;
