import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UsersPage from './Dashboard_components/UsersPage';
import Conversation from './Dashboard_components/Conversation';
import { CardMedia } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase_config';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase_config';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const { user } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [compIndex, setIndex] = React.useState(0)
  const [userList, setList] = React.useState([])
  const components = [<UsersPage userList = {userList} />, <Conversation/>]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleIndex = (index) => {
    setIndex(index)
    setMobileOpen(false)
  }

  React.useEffect(()=>{
    const collectionRef = collection(db, "users")

    const getUsers = async () =>{
      const data = await getDocs(collectionRef)
      setList(data.docs)
    }
    getUsers()
  },[])
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Users', 'Inbox'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>handleIndex(index)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>signOut(auth)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
          <CardMedia 
          sx={{height: 50, width: 50, borderRadius: 50, marginRight: 2, referrerPolicy: 'no-refer'}}
          image={user.photoURL}
          alt={user.displayName}
          referrerPolicy="no-referrer" 
          />
          <Typography variant="h6" noWrap component="div">
            {user.displayName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
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
        {components[compIndex]}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
