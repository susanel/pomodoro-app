import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const NavigationBar = () => {
  return (
    <Box sx={{ width: '620px', margin: '0 auto' }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'inherit' }}
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button href="/" variant="text" startIcon={<CheckCircleIcon />}>
            Pomofocus
          </Button>
          <Box>
            <Button variant="contained" sx={{ ml: 1.25 }}>
              <AssessmentOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
              Report
            </Button>
            <Button variant="contained" sx={{ ml: 1.25 }}>
              <SettingsIcon fontSize="small" sx={{ mr: 0.5 }} />
              Setting
            </Button>
            <Button variant="contained" sx={{ ml: 1.25 }}>
              <AccountCircleRoundedIcon fontSize="small" sx={{ mr: 0.5 }} />
              Sign In
            </Button>
            <IconButton variant="contained" sx={{ ml: 1.25 }}>
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
