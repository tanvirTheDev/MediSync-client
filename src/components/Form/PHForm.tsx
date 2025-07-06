import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  resolver?: any; // Adjust the type as needed
  defaultValues?: Record<string, any>;
};

type TPHFormProps = {
  onSubmit: SubmitHandler<FieldValues>; // Define the onSubmit prop type
  children: React.ReactNode; // Define children prop type
} & TFormConfig;

const PHForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: TPHFormProps) => {
  const methods = useForm({ resolver, defaultValues }); // Apply resolver and defaultValues here
  const { handleSubmit, reset } = methods;
  // Update form values dynamically when defaultValues change
  // useEffect(() => {
  //   if (defaultValues) {
  //     reset(defaultValues);
  //   }
  // }, [defaultValues, reset]);
  // const formConfig: TFormConfig = {};
  // if (resolver) {
  //   formConfig["resolver"] = resolver;
  // }
  // if (defaultValues) {
  //   formConfig["defaultValues"] = defaultValues;
  // }
  // const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    onSubmit(data);
    reset();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
