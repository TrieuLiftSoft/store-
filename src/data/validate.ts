import * as yup from "yup";

const productSchema = yup.object().shape({
  id: yup.number(),
  title: yup.string().required("did you forget about me? "),
  description: yup.string().required("did you forget about me?  "),
  price: yup.number().required("Required only number"),
  discountPercentage: yup.number(),
  rating: yup
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  stock: yup.number().required("Required only number"),
  brand: yup.string(),
  category: yup.string(),
  thumbnail: yup.string().url(),
});

export default productSchema;
