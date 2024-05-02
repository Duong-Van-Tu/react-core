import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { cloneDeep } from 'lodash';
import { Messages } from '../constants/message';
import { isNumberAble } from '../utils/number';

export function trueNumber(y: Yup, { label = 'Field', required = false } = {}) {
  let yup = y.mixed().test('Type', Messages.mustBeNumber(label), (value: any, e) => {
    if (value === '' || value == null) {
      return true;
    }
    return isNumberAble(value);
  });
  if (required) {
    yup = yup.test('Requiredable', Messages.requireInput(label), (value: any) => {
      if (value === '' || value == null) {
        return false;
      }
      return true;
    });
  }
  return yup;
}

// default 1MB
export function file(y: Yup, { size = 1, acceptTypes = ['jpg', 'jpeg', 'png'] }: FileOptions = {}) {
  return y
    .mixed()
    .test('Size', `File size too large, max file size is ${size}`, (file: any) => {
      return typeof file === 'string' || !file || file.size / 1024 / 1024 <= size;
    })
    .test('Type', Messages.INVALID_FILE_TYPE, (file: any) => {
      return (
        typeof file === 'string' || !file || acceptTypes.some((type) => file.type.includes(type))
      );
    })
    .label('File');
}

export const MyYup = yup as Yup;

MyYup.trueNumber = function (opts: any) {
  return trueNumber(this, opts);
};
MyYup.file = function (options?: FileOptions) {
  return file(this, options);
};

export function useForm<S extends Record<string, any> = Record<string, any>>(
  schema: S,
  onSubmit: (values: Record<keyof S, any>) => void,
  initialValues: Partial<Record<keyof S, any>> = {},
) {
  const _schema = useMemo(() => {
    return MyYup.object().shape(schema as any);
    // eslint-disable-next-line
  }, []);

  const validationSchema = _schema;
  const { values, errors, setValues, setErrors, setFieldValue, setFieldError, ...props } =
    useFormik<any>({
      validationSchema,
      initialValues,
      onSubmit,
      // should not re-intital value
      enableReinitialize: false,
      validateOnBlur: false,
      validateOnChange: false,
    });
  const clear = useCallback(() => {
    setValues(cloneDeep(initialValues));
    setTimeout(() => {
      setErrors({});
    }, 0);
    // eslint-disable-next-line
  }, [setErrors, setValues]);

  useEffect(() => {
    setTimeout(() => {
      setErrors({});
    }, 0);
  }, [setErrors]);

  const setControlValue = useCallback(
    async (
      name: keyof S,
      e:
        | { target: { value: number | string; files?: File[] } }
        | number
        | string
        | number[]
        | string[],
    ) => {
      const fieldName = name as string;
      let value;
      if (e && typeof e !== 'string' && typeof e !== 'number' && 'target' in e) {
        if (e.target.files) {
          value = e.target.files[0];
        } else {
          value = e.target.value;
        }
      } else {
        value = e;
      }
      setFieldValue(fieldName, value);

      // validate
      const context = { ...values, [fieldName]: value };
      const error = await validationSchema
        .validateAt(fieldName, context, {
          context,
        })
        .then(() => '')
        .catch((err) => err.message);
      setFieldError(fieldName, error);

      return value;
    },
    // for pass validationSchema
    // eslint-disable-next-line
    [values, setFieldError, setFieldValue],
  );

  const withControl = useCallback(
    (name: keyof S, { returnValue = true }: { returnValue?: boolean } = {}) => {
      const result: Record<string, any> = {
        error: (errors as Record<keyof S, string>)[name],
        onChange: (e: any) => setControlValue(name, e),
        onBlur: (e: any) => setControlValue(name, e),
      };
      if (returnValue) {
        result.value = (values as Record<keyof S, any>)[name] ?? '';
      }

      return result as {
        error?: string;
        onChange: (e: any) => void;
        onBlur: (e: any) => void;
        value: any;
      };
    },
    // for pass validationSchema
    // eslint-disable-next-line
    [setControlValue, errors],
  );

  return {
    ...props,
    setControlValue,
    setFieldError,
    validationSchema: _schema,
    values: values as Record<keyof S, any>,
    setFieldValue,
    withControl,
    clear,
    errors: errors as Record<keyof S, any>,
  };
}
