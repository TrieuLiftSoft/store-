import * as yup from "yup";

const productSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().required("did you forget about me? "),
  description: yup.string().required("did you forget about me?  "),
  price: yup
    .number()
    .min(1, "Must be min than 1")
    .typeError("you must specify a number")
    .required("Required only number"),
  discountPercentage: yup
    .number()
    .min(1, "Must be min than 1")
    .typeError("you must specify a number"),
  rating: yup.number(),
  stock: yup
    .number()
    .min(1, "Must be min than 1")
    .typeError("you must specify a number")
    .required("Required only number"),
  brand: yup.string(),
  category: yup.string(),
  thumbnail: yup.string().url(),
});

export default productSchema;
