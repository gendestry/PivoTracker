import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCircleKey } from "@tabler/icons-react";
import { supabaseClient } from "../../supabase/supabaseClient";
import { useUser } from "../../supabase/loader";
import { Navigate } from "react-router-dom";

export function Authentication() {
  const { user, loading } = useUser();

  const form = useForm({
    initialValues: {
      email: "zan@zan.com",
      password: "zanzan",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Box h="100vh" w="100vw">
      <Center h="100vh" w="100%">
        <Container size={620} miw={440}>
          <Group align="baseline">
            <Text color="dimmed">
              <IconCircleKey></IconCircleKey>
            </Text>
            <Title>Login</Title>
          </Group>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form
              onSubmit={form.onSubmit(async (values) => {
                await supabaseClient.auth.signInWithPassword({
                  email: values.email,
                  password: values.password,
                });
              })}
            >
              <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                {...form.getInputProps("password")}
              />

              <Button fullWidth mt="xl" type="submit">
                Sign in
              </Button>
            </form>
          </Paper>
        </Container>
      </Center>
    </Box>
  );
}
