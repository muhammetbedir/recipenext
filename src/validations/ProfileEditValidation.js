import * as Yup from "yup";

const ProfileEditValidation = (activeTab) => {
  switch (activeTab) {
    case "email":
      return Yup.object().shape({
        email: Yup.string()
          .email("Geçerli bir mail adresi girin")
          .required("Mail zorunlu"),
        password: Yup.string().required("Şifre zorunlu"),
      });
    case "password":
      return Yup.object().shape({
        password: Yup.string().required("Mevcut şifre zorunlu"),
        newPassword: Yup.string().required("Yeni şifre zorunlu"),
      });
    case "username":
      return Yup.object().shape({
        userName: Yup.string().required("Kullanıcı adı zorunlu"),
      });
    case "account":
      return Yup.object().shape({
        firstName: Yup.string().required("Ad zorunlu"),
        lastName: Yup.string().required("Soyad zorunlu"),
        phoneNumber: Yup.string().nullable(), // Telefon numarası isteğe bağlı
        about: Yup.string().nullable(), // Hakkında kısmı isteğe bağlı
      });
    default:
      return Yup.object().shape({});
  }
};

export default ProfileEditValidation;
