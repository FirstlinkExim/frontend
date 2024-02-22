import * as z from "zod";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email().trim(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
  rememberMe: z.boolean(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email().trim(),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message:
          "Password must be at least eight characters, at least one letter, one number and one special character",
      })
      .trim(),
      acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export const OtpSchema = z.object({
  otp: z.string().min(1, { message: "Otp is required" }).trim(),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Full name is required" }).trim(),
    email: z.string().min(1, { message: "Email is required" }).email().trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 6 characters" })
      .regex(passwordRegex, {
        message:
          "Password must be at least eight characters, at least one letter, one number and one special character",
      })
      .trim(),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export const AddProductSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Product title is required",
      required_error: "Product title is required",
    })
    .min(5, { message: "Must be 5 or more characters long" })
    .trim(),
  category: z
    .string()
    .min(1, { message: "Product category is required" })
    .trim(),
  description: z
    .string()
    .min(1, { message: "Product description is required" })
    .trim(),
  price: z.string().min(1, { message: "Product price is required" }).trim(),
  // currency: z.string(),
  discountPrice: z.string().trim(),
  descountType: z.string().trim(),
  stock: z.string().min(1, { message: "Product stock is required" }).trim(),
  color: z.string().trim()
});

export const ShippingInformationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }).trim(),
  lastName: z.string().min(1, { message: "Last name is required" }).trim(),
  address: z.string().min(1, { message: "Address is required" }).trim(),
  city: z.string().min(1, { message: "City is required" }).trim(),
  state: z.string().min(1, { message: "State is required" }).trim(),
  zipCode: z.string().min(1, { message: "Zip is required" }).trim(),
  country: z.string().min(1, { message: "Country is required" }).trim(),
  phone: z.string().min(1, { message: "Phone is required" }).trim(),
  email: z.string().min(1, { message: "Email is required" }).trim(),
});

export const PaymentCardInformationSchema = z.object({
  cardHolder: z
    .string()
    .min(1, { message: "Card holder name is required" })
    .trim(),
  cardNumber: z
    .string()
    .min(1, { message: "Card holder name is required" })
    .max(12, { message: "Maximum length reached" })
    .trim(),
  expiry: z
    .string()
    .min(1, { message: "Expiry date is required" })
    .max(12, { message: "Maximum length reached" })
    .trim(),
  cvv: z
    .string()
    .min(1, { message: "Card cvv is required" })
    .max(12, { message: "Maximum length reached" })
    .trim(),
});

export const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  email: z.string().min(1, { message: "Email is required" }).trim(),
  message: z.string().min(1, { message: "Message is required" }).trim(),
  phone: z.string().trim(),
});
