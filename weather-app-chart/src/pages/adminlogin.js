import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.loginAdmin(email, password);
      toast.success("Logged In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Log In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#e0f7fa"
    >
      <Box
        width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        padding={4}
        boxShadow="10px 10px 20px #000"
        borderRadius="10px"
        bgcolor="white"
      >
        <Typography
          variant="h4"
          textAlign="center"
          marginBottom={4}
          fontWeight={600}
          color="#00796b"
        >
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                borderRadius: 2,
                bgcolor: "#00796b",
                color: "white",
                ":hover": {
                  bgcolor: "#004d40",
                  color: "white",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AdminLogin;
