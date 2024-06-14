import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { Container } from './styles';

import { Input } from '@common';
import { Image } from 'react-native';
import { User } from '../../assets/svg/linear';

export const schema = yup.object({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required').min(6, 'The password must be at least 6 characters long.'),
  // password_confirm: yup
  //   .string()
  //   .required('password is required')
  //   .min(6, 'The password must be at least 6 characters long.')
  //   .oneOf([yup.ref('password')], 'passwords must match')
})

type FormDataProps = {
  username: string;
  password: string;
};

export default function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  });

  const handleSingIn = (form: FormDataEvent) => {
    console.log(form);
  };

  return (
    <Container>
      <Image
        style={{
          position: 'absolute',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
        resizeMode='cover'
        source={{ uri: 'https://res.cloudinary.com/dfayz3rrm/image/upload/v1713280859/community/suwp45zcpt3yybtrbeqq.jpg' }}
      />
      <Controller
        control={control}
        name='username'
        render={({ field: { onChange } }) => (
          <Input icon={User} placeholder='username' onChangeText={onChange} />
        )}
      />
      <Controller
        control={control}
        name='password'
        render={({ field: { onChange } }) => (
          <Input icon={User} placeholder='password' onChangeText={onChange} />
        )}
      />

      {/* <Button title="Signin" onPress={handleSubmit(handleSingIn)} /> */}
    </Container>
  );
};
