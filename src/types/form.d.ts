type FileOptions = {
  size?: number;
  label?: string;
  acceptTypes?: string[];
};

type Yup = typeof import('yup') & {
  trueNumber: (options?: {
    label?: string;
    required?: boolean;
  }) => import('yup/lib/mixed').MixedSchema<any, Record<string, any>, any>;
  file: (
    options?: FileOptions,
  ) => import('yup/lib/mixed').MixedSchema<any, Record<string, any>, any>;
};
