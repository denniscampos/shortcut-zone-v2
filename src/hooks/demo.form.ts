import { createFormHook } from '@tanstack/react-form';

import {
  Select,
  SubmitButton,
  TextArea,
  TextField,
} from '../components/form-components';
import { fieldContext, formContext } from './demo.form-context';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Select,
    TextArea,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
