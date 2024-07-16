import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Disaster Management</h1>
      <div>
        <Link to="/home"><button>Home</button></Link>
        <Link to="/admin_user/login"><button>Admin Login</button></Link>
        <Link to="/admin_user/signup"><button>Admin Signup</button></Link>
        <Link to="/authority_user/login"><button>Authority Login</button></Link>
        <Link to="/authority_user/signup"><button>Authority Signup</button></Link>
      </div>
    </div>
  );
}

export default LandingPage;
