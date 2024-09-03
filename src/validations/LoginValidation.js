import * as yup from "yup";

const LoginValidation = yup.object().shape({
  email: yup
    .string()
    .email("Geçersiz email adresi")
    .required("Email zorunludur"),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre zorunludur"),
});

export default LoginValidation;
