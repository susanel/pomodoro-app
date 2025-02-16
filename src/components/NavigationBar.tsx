import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

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
