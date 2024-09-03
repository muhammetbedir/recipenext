import { useAuth } from "@/contexts/authContext";
import { SetCookie } from "@/helpers/cookieHelper";
import { Toast } from "@/helpers/responseHandler";
import {
  changeEmail,
  changePassword,
  changeUserInfo,
  changeUserName,
} from "@/services/userService";
import ProfileEditValidation from "@/validations/ProfileEditValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const ProfileEditModal = ({ showModal, setShowModal, refetch, data = {} }) => {
  //context
  const { user, setUser } = useAuth();
  const router = useRouter();
  //state
  const [activeTab, setActiveTab] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
    resolver: yupResolver(ProfileEditValidation(activeTab)),
  });

  //React Query
  const submitMutation = useMutation({
    mutationFn: (data) => {
      switch (activeTab) {
        case "email":
          return changeEmail({
            email: data?.email,
            password: data?.password,
            userId: user?.id,
          });
        case "password":
          return changePassword({
            newPassword: data?.newPassword,
            password: data?.password,
            userId: user?.id,
          });
        case "username":
          return changeUserName({
            userName: data?.userName,
            userId: user?.id,
          });
        case "account":
          return changeUserInfo({
            firstName: data?.firstName,
            lastName: data?.lastName,
            about: data?.about,
            phoneNumber: data?.phoneNumber,
            userId: user?.id,
          });
        default:
          return;
      }
    },
    onSuccess: () => {
      switch (activeTab) {
        case "email":
          Toast.successToast("Mail adresi değişti.");
          refetch();
          break;
        case "password":
          Toast.successToast("Şifre değişti.");
          refetch();
          setShowModal(false);
          setActiveTab("email");
          break;
        case "username":
          const userName = getValues("userName");
          setUser({ ...user, userName: userName });
          SetCookie(process.env.NEXT_PUBLIC_AUTH, {
            ...user,
            userName: userName,
          });
          router.push("/profil/" + userName);
          Toast.successToast("Kullanıcı adı değişti.");
          break;
        case "account":
          Toast.successToast("Kullanıcı bilgileri kaydedildi.");
          refetch();
          break;
        default:
          break;
      }
    },
  });

  useEffect(() => {
    reset({
      ...data,
      password: "",
      newPassword: "",
      firstName: data?.firstName ?? "",
    });
    setShowPassword(false);
    setShowNewPassword(false);
  }, [data, activeTab]);

  //function
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const renderFormContent = () => {
    switch (activeTab) {
      case "email":
        return (
          <Grid container spacing={2} className="w-full mb-4">
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field: { ref, ...field }, formState }) => (
                  <TextField
                    fullWidth
                    label="Mail"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    variant="outlined"
                    error={!!formState.errors?.email}
                    helperText={errors?.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field: { ref, ...field }, formState }) => (
                  <TextField
                    fullWidth
                    label="Şifre"
                    type={showPassword ? "text" : "password"}
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case "password":
        return (
          <Grid container spacing={2} className="w-full mb-4">
            <Controller
              name="email"
              control={control}
              render={({ field: { ref, ...field }, formState }) => (
                <TextField
                  hidden
                  fullWidth
                  label="Mail"
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  variant="outlined"
                  error={!!formState.errors?.email}
                  helperText={errors?.email?.message}
                />
              )}
            />
            <Grid item xs={12}>
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="newPassword"
                control={control}
                render={({ field: { ref, ...field }, formState }) => (
                  <TextField
                    fullWidth
                    type={showNewPassword ? "text" : "password"}
                    label="Yeni Şifre"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    variant="outlined"
                    error={!!formState.errors?.newPassword}
                    helperText={errors?.newPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            edge="end"
                          >
                            {showNewPassword ? (
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
            </Grid>
          </Grid>
        );
      case "username":
        return (
          <Grid container spacing={2} className="w-full mb-4">
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        );
      case "account":
        return (
          <Grid container spacing={2} className="w-full mb-4">
            <Grid item xs={12} md={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field: { ref, ...field }, formState }) => (
                  <TextField
                    fullWidth
                    label="Ad"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    variant="outlined"
                    error={!!formState.errors?.firstName}
                    helperText={errors?.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field: { ref, ...field }, formState }) => (
                  <TextField
                    fullWidth
                    label="Soyad"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    variant="outlined"
                    error={!!formState.errors?.lastName}
                    helperText={errors?.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { ref, ...field }, formState }) => (
                  <TextField
                    fullWidth
                    label="Telefon Numarası"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    variant="outlined"
                    error={!!formState.errors?.phoneNumber}
                    helperText={errors?.phoneNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="about"
                control={control}
                render={({ field: { ref, ...field }, formState }) => (
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={3}
                    label="Hakkında"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    variant="outlined"
                    error={!!formState.errors?.about}
                    helperText={errors?.about?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={showModal}
      onClose={() => {
        setShowModal(false);
        reset({});
        setActiveTab("email");
      }}
      closeAfterTransition
      className="h-full flex"
    >
      <Fade timeout={700} in={showModal}>
        <Box className="flex flex-col p-4 bg-white rounded shadow-lg md:w-2/3 w-3/4 mx-auto my-auto">
          <Typography variant="h6" className="mb-4">
            Profili Düzenle
          </Typography>
          <Box className="flex flex-col md:flex-row ">
            <List className="w-full md:w-1/4 md:border-r pr-4 mb-10 md:mb-0">
              <ListItem
                button
                onClick={() => setActiveTab("email")}
                selected={activeTab === "email"}
              >
                <ListItemText primary="E-posta Değiştir" />
              </ListItem>
              <ListItem
                button
                onClick={() => setActiveTab("password")}
                selected={activeTab === "password"}
              >
                <ListItemText primary="Şifre Değiştir" />
              </ListItem>
              <ListItem
                button
                onClick={() => setActiveTab("username")}
                selected={activeTab === "username"}
              >
                <ListItemText primary="Kullanıcı Adı Değiştir" />
              </ListItem>
              <ListItem
                button
                onClick={() => setActiveTab("account")}
                selected={activeTab === "account"}
              >
                <ListItemText primary="Hesap Bilgileri" />
              </ListItem>
            </List>
            <Box className="flex-1 pl-4">
              <form
                className="flex flex-col justify-between h-full"
                onSubmit={handleSubmit(submitMutation.mutate)}
              >
                {renderFormContent()}
                <Box className="flex justify-end space-x-4">
                  <Button
                    className="text-black"
                    onClick={() => setShowModal(false)}
                  >
                    Vazgeç
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className="bg-secondary text-white hover:bg-secondary-dark"
                    type="submit"
                    disabled={submitMutation.isPending}
                  >
                    Kaydet
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProfileEditModal;
