import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import { SxProps } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};

export default function PHFileUploader({ name, label, sx }: TProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ ...sx }}
            >
              {value?.name || label || "Upload file"}
              <Input
                {...field}
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file); // Store the file object
                  }
                }}
                style={{ display: "none" }}
              />
            </Button>
          </>
        );
      }}
    />
  );
}
