import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TerminalIcon from '@mui/icons-material/Terminal';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import {
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Home from '../routes/Home';
import Architect from '../routes/Architect';
import Developer from '../routes/Developer';


const breadcrumbNameMap = {
  '/architect': 'Solutions Architect',
  '/architect/portfolio': 'Portfolio Project',
  '/developer': 'Software Developer',
  '/developer/portfolio': 'Portfolio Project',

};

function ListItemLink(props) {
  const { to, expand, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  let expandIcon = null;
  if (breadcrumbNameMap[to] === 'Solutions Architect') icon = <ArchitectureIcon />
  if (breadcrumbNameMap[to] === 'Software Developer') icon = <TerminalIcon />
  if (expand != null) {
    expandIcon = expand ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={primary} />
        {expandIcon}
      </ListItem>
    </li>
  );
}

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const Page = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};

const drawerWidth = 260;

function ResponsiveDrawer(props) {
  const theme = useTheme();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [expand, setExpand] = React.useState({
    architect: (pathnames[0] === 'architect'),
    developer: (pathnames[0] === 'developer')
  });
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleClick = (target) => {
    if (target === 'architect') setExpand({ ...expand, architect: !expand.architect });
    else setExpand({ ...expand, developer: !expand.developer });

  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Nicholas Deckard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItemLink to="/architect" expand={expand.architect} onClick={() => handleClick('architect')} />
        <Collapse component="li" in={expand.architect} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemLink sx={{ pl: 4 }} to="/architect/portfolio" />
          </List>
        </Collapse>
        <ListItemLink to="/developer" expand={expand.developer} onClick={() => handleClick('developer')} />
        <Collapse component="li" in={expand.developer} timeout="auto" unmountOnExit>
          <List disablePadding>
            <ListItemLink sx={{ pl: 4 }} to="/developer/portfolio" />
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        {['LinkedIn', 'GitHub', 'Contact'].map((text, index) => (
          <Link href={index === 0 ?
            "https://www.linkedin.com/in/nicholasscottdeckard/" : index === 1 ?
              "https://github.com/zytalus" :
              "mailto:nicholas.deckard@crazymagic.studio"} target="_blank" underline='none' key={text}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <LinkedInIcon /> : index === 1 ? <GitHubIcon /> : <ContactPageIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>

        ))}
      </List>
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="*" element={<Page />} />
            </Routes>
          </Box>
          <IconButton onClick={props.colorMode.toggleColorMode} color="inherit" edge="end">
            {theme.palette.mode === 'light' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="main navigation"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/architect" element={<Architect />} />
          <Route path="/developer" element={<Developer />} />

          <Route path="*" element={<>Page Under Construction!</>} />
        </Routes>

      </Box>

    </Box>
  );
}

export default ResponsiveDrawer;
