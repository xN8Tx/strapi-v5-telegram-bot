import { useState } from 'react';
import styled from 'styled-components';

import { Page, Layouts } from '@strapi/strapi/admin';
import { Textarea, Button, Typography } from '@strapi/design-system';

import { useFetchClient, useNotification } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../pluginId';

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  min-height: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputContainer = styled.div`
  width: 100%
  display: flex;
  gap: 5px;
`;

const HomePage = () => {
  const [errors, setError] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toggleNotification } = useNotification();

  const { post } = useFetchClient();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = formData.get('message')?.toString().trim();

    if (!message) {
      setError({ message: 'This is required field' });
      return;
    }

    setError({});

    try {
      setIsLoading(true);

      await post(`/${PLUGIN_ID}`, {
        message: message,
      });

      toggleNotification({
        title: 'Success send telegram message!',
        type: 'success',
      });
    } catch (error) {
      toggleNotification({
        title: 'Error!',
        message: (error as string)?.toString() ?? 'Internal server error',

        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page.Main>
      <Layouts.Header title="Send telegram message" />
      <Layouts.Content>
        <Form onSubmit={submitHandler}>
          <InputContainer>
            <Textarea name="message" placeholder="Input your message" />
            {errors?.message && (
              <Typography variant="pi" textColor="red">
                {errors.message}
              </Typography>
            )}
          </InputContainer>

          {errors?.global && (
            <Typography variant="pi" textColor="red">
              {errors.global}
            </Typography>
          )}

          <Button loading={isLoading}>Send</Button>
        </Form>
      </Layouts.Content>
    </Page.Main>
  );
};

export { HomePage };
