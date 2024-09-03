import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { Toast } from "@/helpers/responseHandler";
import {
  addRecipe,
  updateRecipe,
  getRecipeById,
  addRecipeTutorialPictures,
} from "@/services/recipeService";
import { getCategories } from "@/services/categoryService";
import { yupResolver } from "@hookform/resolvers/yup";
import ProfileEditValidation from "@/validations/ProfileEditValidation"; // validate the form
import { useRouter } from "next/router";
import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";
import { MeasurementUnits, Servings } from "@/helpers/enums";
import { fileToBase64 } from "@/helpers/commonHelper";
import { useAuth } from "@/contexts/authContext";
import { GetCookie } from "@/helpers/cookieHelper";
import Head from "next/head";

const AmendRecipe = ({ isUpdate }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { recordid } = router.query;
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  // const [isUpdate, setIsUpdate] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewTutorial, setPreviewTutorial] = useState(null);
  const [selectedImages, setSelectedImages] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [dbImages, setDbImages] = useState({});

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(ProfileEditValidation("recipe")),
  });

  // Fetch categories
  useEffect(() => {
    getCategories().then((res) => setCategories(res?.data));
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setDbImages((item) => {
      return {
        recipeTutorialPictures: item?.recipeTutorialPictures,
      };
    });
    const file = acceptedFiles[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const onDropMulti = useCallback((acceptedFiles) => {
    setDbImages((item) => {
      return {
        image: item?.image,
      };
    });
    const files = acceptedFiles;
    setSelectedImages(files);
    setPreviewTutorial(files.map((item) => URL.createObjectURL(item)));
  }, []);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const imageBase64 = selectedImage
        ? await fileToBase64(selectedImage)
        : null;
      const payload = {
        ...data,
        imageData: imageBase64,
        id: data?.id,
        userId: user?.id,
        imageUrl: data.imageUrl,
      };
      const fnc = isUpdate ? updateRecipe : addRecipe;
      return await fnc(payload).then((res) => res.data);
    },
    onSuccess: async (res) => {
      if (selectedImages) {
        const payload = await Promise.all(
          selectedImages.map(async (file, index) => {
            return {
              imageData: await fileToBase64(file),
              recipeId: res?.id ?? getValues("id"),
              order: index + 1,
            };
          })
        );

        addRecipeTutorialPictures({
          pictures: payload,
        });
      }
      Toast.successToast(
        `Tarif başarıyla ${isUpdate ? "güncellendi" : "oluşturuldu"}.`
      );
      handleNext();
    },
  });

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["recipe" + recordid],
    queryFn: () =>
      getRecipeById(user?.id, recordid?.at(0)).then((res) => {
        return res.data;
      }),
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!recordid,
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data });
    reset();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //useEffect

  useEffect(() => {
    if (data && isSuccess) {
      reset({
        ...data,
      });
      setDbImages({
        image: process.env.NEXT_PUBLIC_BASEIMAGEURL + data?.imageUrl,
        recipeTutorialPictures: data?.recipeTutorialPictures?.map((item) => {
          return {
            image: process.env.NEXT_PUBLIC_BASEIMAGEURL + item?.imageUrl,
          };
        }),
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (!recordid) {
      reset({ id: Math.random() * 1000 });
      setDbImages({});
    }
  }, [recordid]);

  return (
    <Box>
      <Head>
        <title>
          {isUpdate
            ? "Tarifi Güncelle" + " " + watch("title")
            : "Tarif Oluştur"}{" "}
          - Yemeğiniz
        </title>
      </Head>
      <Box className="p-4 bg-background rounded shadow-lg flex flex-col justify-center items-center py-6">
        <Typography variant="h6" className="mb-4">
          {isUpdate ? "Tarifi Güncelle" : "Tarif Oluştur"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className="flex flex-col justify-center items-center"
          >
            <Step className="w-3/4 shadow-md p-6 background-secondary-background">
              <StepLabel>Tarif Detayları</StepLabel>
              <StepContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="title"
                      key={watch("id") + 1}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Tarif Başlığı"
                          variant="outlined"
                          error={!!errors.title}
                          helperText={errors.title?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      key={watch("id") + 3}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          minRows={3}
                          label="Açıklama"
                          variant="outlined"
                          error={!!errors.description}
                          helperText={errors.description?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="preparationTime"
                      key={watch("id") + 6}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="number"
                          label="Hazırlık Süresi (dakika)"
                          variant="outlined"
                          error={!!errors.preparationTime}
                          helperText={errors.preparationTime?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="cookingTime"
                      key={watch("id") + 4}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          type="number"
                          label="Pişirme Süresi (dakika)"
                          variant="outlined"
                          error={!!errors.cookingTime}
                          helperText={errors.cookingTime?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="servings"
                      control={control}
                      key={watch("id")}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Porsiyon"
                          variant="outlined"
                          error={!!errors.servings}
                          helperText={errors.servings?.message}
                          SelectProps={{
                            MenuProps: {
                              PaperProps: {
                                style: {
                                  maxHeight: 150,
                                  marginTop: 5,
                                },
                              },
                            },
                          }}
                        >
                          {Servings.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="categoryId"
                      control={control}
                      key={watch("id") + 2}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Kategori"
                          variant="outlined"
                          error={!!errors.categoryId}
                          defaultValue={getValues("categoryId")}
                          helperText={errors.categoryId?.message}
                          SelectProps={{
                            MenuProps: {
                              PaperProps: {
                                style: {
                                  maxHeight: 150,
                                  marginTop: 5,
                                },
                              },
                            },
                          }}
                        >
                          {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="ingredients"
                      control={control}
                      key={watch("id") + 5}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          minRows={3}
                          label="Malzemeler"
                          variant="outlined"
                          error={!!errors.ingredients}
                          helperText={errors.ingredients?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="instructions"
                      control={control}
                      key={watch("id") + 8}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          minRows={3}
                          label="Talimatlar"
                          variant="outlined"
                          error={!!errors.instructions}
                          helperText={errors.instructions?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Box className="flex justify-end space-x-4 mt-4">
                  <Button className="text-black" onClick={handleBack}>
                    Geri
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    İleri
                  </Button>
                </Box>
              </StepContent>
            </Step>
            <Step className="w-3/4 shadow-md p-6 background-secondary-background">
              <StepLabel>Fotoğraf Yükleme</StepLabel>
              <StepContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Dropzone
                      onDrop={onDrop}
                      accept={{
                        "image/jpeg": [],
                        "image/png": [],
                        "image/jpg": [],
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          className="border-dashed border-2 border-gray-400 p-4 text-center flex items-center justify-center flex-col"
                          style={{ minHeight: "150px" }}
                        >
                          <input {...getInputProps()} />
                          {selectedImage || dbImages?.image ? (
                            <>
                              {preview && (
                                <img
                                  src={preview}
                                  alt="Preview"
                                  style={{
                                    marginTop: "10px",
                                    maxHeight: "200px",
                                  }}
                                />
                              )}
                              {dbImages?.image && (
                                <img
                                  src={dbImages?.image}
                                  alt="Preview"
                                  style={{
                                    marginTop: "10px",
                                    maxHeight: "200px",
                                  }}
                                />
                              )}
                              <Typography>{selectedImage?.name}</Typography>
                            </>
                          ) : (
                            <Typography>
                              Kapak resmi yüklemek için tıklayın veya sürükleyip
                              bırakın
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Grid>
                  <Grid item xs={12}>
                    <Dropzone
                      onDrop={onDropMulti}
                      accept={{
                        "image/jpeg": [],
                        "image/png": [],
                        "image/jpg": [],
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          className="border-dashed border-2 border-gray-400 p-4 text-center flex items-center justify-center gap-5 flex-wrap mt-4"
                          style={{ minHeight: "150px" }}
                        >
                          <input {...getInputProps()} />
                          {selectedImages ||
                          dbImages?.recipeTutorialPictures ? (
                            <>
                              {previewTutorial?.map((item, index) => (
                                <img
                                  key={index}
                                  src={item?.image ?? item}
                                  alt={`Preview ${index}`}
                                  style={{
                                    marginTop: "10px",
                                    maxHeight: "200px",
                                    maxWidth: "100%",
                                  }}
                                />
                              ))}
                              {dbImages?.recipeTutorialPictures?.map(
                                (item, index) => (
                                  <img
                                    key={index}
                                    src={item?.image ?? item}
                                    alt={`Preview ${index}`}
                                    style={{
                                      marginTop: "10px",
                                      maxHeight: "200px",
                                      maxWidth: "100%",
                                    }}
                                  />
                                )
                              )}
                            </>
                          ) : (
                            <Typography>
                              Yapım aşamalarının resimlerini yüklemek için
                              tıklayın veya sürükleyip bırakın
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Grid>
                </Grid>
                <Box className="flex justify-end space-x-4 mt-4">
                  <Button className="text-black" onClick={handleBack}>
                    Geri
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                  >
                    {isUpdate ? "Güncelle" : "Kaydet"}
                  </Button>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </form>
        {activeStep === 2 && (
          <Box>
            <Typography>Tarif başarıyla kaydedildi.</Typography>
            <Button onClick={handleReset}>Başka bir tarif ekle</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const user = GetCookie(process.env.NEXT_PUBLIC_AUTH, context);
  const queryClient = new QueryClient();
  const recordId = context.params?.recordid?.at(0);
  let isUpdate = false;
  if (recordId) {
    const recipe = await queryClient.fetchQuery({
      queryKey: ["recipe" + recordId],
      queryFn: async () =>
        getRecipeById(user?.id, recordId ?? null, context).then(
          (res) => res.data
        ),
    });
    if (!!recipe) isUpdate = true;
    if (recipe.user?.id !== user?.id) {
      context.res.writeHead(302, { Location: "/" });
      context.res.end();
      return { props: {} };
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      isUpdate,
    },
  };
}

AmendRecipe.acl = {
  action: actions.read,
  subject: pages.amendRecipe,
};
export default AmendRecipe;
