import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import SearchBar from "../functional/SearchBar";

const pages = [
  { name: "Menüler", link: "/menu" },
  { name: "Tarifler", link: "/tarifler" },
];

const CustomAppBar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
      return;
    }
    setIsLogin(false);
  }, [user]);

  const settings = [
    {
      name: "Profil",
      fnc: () => router.push("/profil" + "/" + user?.userName),
    },
    { name: "Tarif Oluştur", fnc: () => router.push("/tarif-olustur") },
    { name: "Panel", fnc: () => null },
    { name: "Çıkış Yap", fnc: logout },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" className="bg-background text-primary shadow-md ">
      <Container maxWidth="xl">
        <Toolbar className="flex justify-between">
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href={"/"}>YEMEGINIZ</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                  <Link href={page.link}>
                    <Typography
                      textAlign="center"
                      className="text-foreground"
                      variant="h6"
                      fontSize={15}
                    >
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href={"/"}>YEMEGINIZ</Link>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={page.link}>
                  <Typography
                    textAlign="center"
                    variant="h6"
                    fontSize={15}
                    className="text-foreground"
                  >
                    {page.name}
                  </Typography>
                </Link>
              </Button>
            ))}
          </Box>
          <SearchBar isLogin={isLogin} />
          {/* SearchBar bileşenini buraya ekliyoruz */}
          {isLogin ? (
            <Box sx={{ flexGrow: 0, mr: 2 }}>
              <Tooltip title="Ayarları aç">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.userName}
                    src={
                      process.env.NEXT_PUBLIC_BASEIMAGEURL +
                      user?.profilePicture
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      setting.fnc();
                      handleCloseUserMenu(setting);
                    }}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <Box sx={{ flexGrow: 0, mr: 2 }}>
                <Button
                  onClick={() => router.push("/kayit-ol")}
                  className="text-foreground p-1 hover:bg-buttonBg  hover:opacity-80 hover:text-white"
                >
                  Kayıt Ol
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  onClick={() => router.push("/giris-yap")}
                  className="text-foreground p-1 hover:bg-secondary hover:opacity-80 hover:text-white"
                >
                  Giriş Yap
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default CustomAppBar;
