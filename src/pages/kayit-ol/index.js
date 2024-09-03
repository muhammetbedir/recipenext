//react
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
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
//services
import { register } from "@/services/userService";
//helpers
import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";
import { Toast } from "@/helpers/responseHandler";
//validation
import SignUpValidation from "@/validations/SignupValidation";

//components

const Signup = () => {
  //context
  const router = useRouter();
  //state
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
    resolver: yupResolver(SignUpValidation),
  });
  //React Query

  const signUpMutation = useMutation({
    mutationFn: (data) => {
      return register({
        userName: data?.userName,
        password: data?.password,
        email: data?.email,
      });
    },
    onSuccess: (response) => {
      Toast.successToast("Kayıt işleminiz tamamlandı.");
      router.push("/giris-yap");
    },
  });

  //function
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  return (
    <Box>
      <Head>
        <title>Kayıt Ol - Yemeğiniz</title>
      </Head>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        bgcolor="gray.100"
      >
        <Grid
          container
          item
          xs={12}
          md={8}
          mt={4}
          elevation={6}
          className="shadow-md"
          borderRadius={1}
          bgcolor="white"
        >
          <Grid item md={6} className="hidden md:block">
            <img
              src="/image/kahvalti.jpg"
              alt="Yemek Resmi"
              className="object-cover h-full w-full rounded-l"
            />
          </Grid>
          <Grid item xs={12} md={6} p={6}>
            <h1 className="text-2xl font-bold mb-4">Kaydol</h1>
            <form
              onSubmit={handleSubmit((data) => signUpMutation.mutate(data))}
            >
              <Box mb={2}>
                <Controller
                  name="userName"
                  control={control}
                  render={({ field: { ref, ...field }, formState }) => (
                    <TextField
                      fullWidth
                      label="Kullanıcı Adı"
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                      variant="outlined"
                      error={!!formState.errors?.userName}
                      helperText={errors?.userName?.message}
                    />
                  )}
                />
              </Box>
              <Box mb={2}>
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
              <Box mb={2}>
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
              <Box mb={2}>
                <Controller
                  name="passwordConfirm"
                  control={control}
                  render={({ field: { ref, ...field }, formState }) => (
                    <TextField
                      fullWidth
                      type={showPasswordConfirm ? "text" : "password"}
                      label="Şifre"
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                      variant="outlined"
                      error={!!formState.errors?.passwordConfirm}
                      helperText={errors?.passwordConfirm?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordConfirm}
                              edge="end"
                            >
                              {showPasswordConfirm ? (
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
              <Box mb={2}>
                <Controller
                  name="terms"
                  control={control}
                  render={({ field: { ref, ...field }, formState }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="terms"
                          onChange={(val) => field.onChange(val)}
                          value={field.value}
                          error={!!formState.errors?.terms}
                          helperText={errors?.terms?.message}
                        />
                      }
                      label="Kullanım şartlarını kabul ediyorum"
                    />
                  )}
                />
              </Box>
              <Box mb={2}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  className="bg-secondary hover:bg-secondary-dark"
                >
                  Kaydol
                </Button>
              </Box>
              <p className="text-sm">
                Zaten hesabınız var mı?{" "}
                <Link
                  className="text-blue-500 cursor-pointer"
                  href="/giris-yap"
                  passHref
                >
                  Giriş Yap
                </Link>
              </p>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

Signup.acl = {
  action: actions.read,
  subject: pages.signUp,
};

export default Signup;
