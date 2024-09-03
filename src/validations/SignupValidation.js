import * as yup from "yup";

const SignUpValidation = yup.object().shape({
  userName: yup
    .string()
    .required("Kullanıcı adı zorunludur")
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
  email: yup
    .string()
    .email("Geçersiz email adresi")
    .required("Email zorunludur"),
  password: yup
    .string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı zorunludur"),
  terms: yup.boolean().oneOf([true], "Kullanım şartlarını kabul etmelisiniz"),
});

export default SignUpValidation;
