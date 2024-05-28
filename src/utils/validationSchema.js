import * as yup from "yup";

const addPostValidationSchema = yup.object().shape({
  title: yup.string("عنوان مقاله را به درستی وارد نمایید").min(7, "عنوان مقاله حداقل باید 7 حرف باشد").required("وارد کردن عنوان مقاله الزامیست"),
  description: yup.string("توضیح خلاصه مقاله را به درستی وارد نمایید").min(20, "عنوان مقاله حداقل باید 20 حرف باشد").required("وارد کردن توضیح خلاصه مقاله الزامیست"),
  body: yup.string("متن مقاله را به درستی وارد نمایید").min(4, "متن مقاله حداقل باید 4 حرف باشد").required("وارد کردن متن مقاله الزامیست"),
});
const editPostValidationSchema = yup.object().shape({
  title: yup.string("عنوان مقاله را به درستی وارد نمایید").min(7, "عنوان مقاله حداقل باید 7 حرف باشد").required("وارد کردن عنوان مقاله الزامیست"),
  description: yup.string("توضیح خلاصه مقاله را به درستی وارد نمایید").min(20, "توضیح خلاصه مقاله حداقل باید 20 حرف باشد").required("وارد کردن توضیح خلاصه مقاله الزامیست"),
  body: yup.string("متن مقاله را به درستی وارد نمایید").min(4, "متن مقاله حداقل باید 4 حرف باشد").required("وارد کردن متن مقاله الزامیست"),
  publish: yup.string().required("انتخاب وضعیت مقاله الزامیست"),
});

export {addPostValidationSchema, editPostValidationSchema};
