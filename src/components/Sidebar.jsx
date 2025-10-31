import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
const drawerWidth = 280;

export default function Sidebar({ items = [] }) {
  const [open, setOpen] = React.useState(false);
  const mdUp = useMediaQuery("(min-width:960px)");

  React.useEffect(() => {
    if (mdUp) setOpen(true);
  }, [mdUp]);

  return (
    <div className="flex">
      <AppBar position="fixed" className="bg-white shadow-sm z-30">
        <Toolbar className="flex items-center justify-between bg-orange-500">
          <div className="flex items-center gap-3">
            <IconButton
              edge="start"
              onClick={() => setOpen(!open)}
              aria-label="menu"
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-slate-900">
                App Title
              </h1>
              <p className="text-xs text-slate-500">Subtitle or description</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={"/logout"}
              className="px-3 py-1 rounded-md text-sm border border-red-500 text-red-500 bg-white hover:bg-red-50"
            >
              Logout
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        ModalProps={{ keepMounted: true }}
        variant={mdUp ? "permanent" : "temporary"}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ style: { width: drawerWidth } }}
      >
        <Box className="h-full flex flex-col">
          <header className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                <img src={logo} className="rounded-full" alt="" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Admin</h2>
                <p className="text-xs text-slate-500">Relief Goods Tracker</p>
              </div>
            </div>
          </header>

          <nav className="flex-1 overflow-auto p-4">
            <ul className="space-y-2">
              {items.length === 0 ? (
                <>
                  <li>
                    <Link
                      to={'/admin-dashboard'}
                      className="block p-3 rounded-lg hover:bg-slate-100"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/distributions'}
                      className="block p-3 rounded-lg hover:bg-slate-100"
                    >
                      Distribution Lists
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-3 rounded-lg hover:bg-slate-100"
                    >
                      Transactions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-3 rounded-lg hover:bg-slate-100"
                    >
                      Settings
                    </a>
                  </li>
                </>
              ) : (
                items.map((it, i) => (
                  <li key={i}>
                    <a
                      href={it.href || "#"}
                      className="block p-3 rounded-lg hover:bg-slate-100"
                    >
                      {it.label}
                    </a>
                  </li>
                ))
              )}
            </ul>

            
          </nav>

          <footer className="p-4 border-t">
            <div className="text-sm text-slate-600">2025</div>
          </footer>
        </Box>
      </Drawer>
    </div>
  );
}
