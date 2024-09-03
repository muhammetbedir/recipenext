//react
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
//third party
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
//context
import { useAuth } from "@/contexts/authContext";
//services
import { loginRequest } from "@/services/userService";
//helpers
import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";
//validation
import LoginValidation from "@/validations/LoginValidation";

//components

const Login = () => {
  //context
  const { login } = useAuth();

  //state
  const [showPassword, setShowPassword] = useState(false);

  //useForm
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(LoginValidation),
  });

  //react-query
  const signInMutation = useMutation({
    mutationFn: (data) => {
      return loginRequest({
        userName: data?.userName,
        password: data?.password,
        email: data?.email,
      });
    },
    onSuccess: (response) => {
      login({
        user: {
          userName: response.data?.userName,
          id: response.data?.id,
          token: response.data?.token,
          expiration: response.data?.expiration,
          profilePicture: response.data?.profilePicture,
        },
        role: response.data?.role,
      });
    },
  });

  //function
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Head>
        <title>Kayıt Ol - Yemeğiniz</title>
      </Head>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          container
          item
          xs={12}
          md={8}
          mt={5}
          elevation={6}
          component={Box}
          className="shadow-md"
          borderRadius={1}
        >
          <Grid item md={6} className="hidden md:block">
            <img
              src="/image/kahvalti.jpg"
              alt="Yemek Resmi"
              className="object-cover h-full w-full rounded-l"
            />
          </Grid>
          <Grid item xs={12} md={6} p={6}>
            <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
            <form
              onSubmit={handleSubmit((data) => signInMutation.mutate(data))}
            >
              <Box mb={4}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { ref, ...field }, formState }) => (
                    <TextField
                      fullWidth
                      label="Email"
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                      variant="outlined"
                      error={!!formState.errors?.email}
                      helperText={errors?.email?.message}
                    />
                  )}
                />
              </Box>
              <Box mb={4}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { ref, ...field }, formState }) => (
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      label="Şifre"
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                      variant="outlined"
                      error={!!formState.errors?.password}
                      helperText={errors?.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              <Box mb={4}>
                <Controller
                  name="remember"
                  control={control}
                  render={({ field: { ref, ...field }, formState }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="remember"
                          onChange={(val) => field.onChange(val)}
                          value={field.value}
                          error={!!formState.errors?.remember}
                          helperText={errors?.remember?.message}
                        />
                      }
                      label="Beni hatırla"
                    />
                  )}
                />
              </Box>
              <Box mb={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="bg-secondary hover:bg-secondary-dark"
                >
                  Giriş Yap
                </Button>
              </Box>
              <p className="text-sm">
                Hesabınız yok mu?{" "}
                <Link href="/kayit-ol" className="text-blue-500 cursor-pointer">
                  Kaydol
                </Link>
              </p>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Login.acl = {
  action: actions.read,
  subject: pages.login,
};
export default Login;
