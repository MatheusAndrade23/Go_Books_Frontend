"use client";

import { useState } from "react";
import { Text } from "@/components/Text";
import { SignUpForm, InputsContainer, SignUpContainer } from "./styles";
import { useAuth } from "@/hooks/Auth";

import { TextField, Button, Link, Select, MenuItem } from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import regex from "@/regex";
import { getInputsValidation } from "@/utils/getInputsValidation";

const signUpFormSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
  name: zod.string(),
});

export type signUpData = zod.infer<typeof signUpFormSchema>;

export const SignUpPage = () => {
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const { register, handleSubmit, watch } = useForm();

  const { register: registerUser, user } = useAuth();

  if (user.isAuthenticated) {
    window.location.href = "/";
  }

  const signUpForm = useForm<signUpData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      password: "",
      email: "",
      name: "",
    },
  });

  const email = watch("email");
  const password = watch("password");
  const name = watch("name");

  const { isEmailValid, isPasswordValid } = getInputsValidation(
    email,
    password
  );

  const partialPasswordRegex = {
    minLength: password?.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const onSubmitSignUpForm = () => {
    registerUser(email, password, role, name);
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit(onSubmitSignUpForm)}>
        <Text style={{ fontWeight: "bold", fontSize: "2.2rem" }}>
          Registrar
        </Text>
        <InputsContainer>
          <Text style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
            Digite seu nome:
          </Text>
          <TextField
            style={{
              width: "100%",
              color: "primary",
            }}
            size="medium"
            placeholder="Nome"
            variant="filled"
            focused
            {...register("name")}
            color={name?.length > 0 ? "success" : "warning"}
          />
          <Text style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
            Digite seu email:
          </Text>
          <TextField
            style={{
              width: "100%",
              color: "primary",
            }}
            size="medium"
            placeholder="Email"
            variant="filled"
            focused
            {...register("email")}
            color={isEmailValid ? "success" : "warning"}
          />
          <Text
            style={{
              marginBottom: "1rem",
              marginTop: "2rem",
              fontSize: "1.2rem",
            }}
          >
            Digite sua senha:
          </Text>
          <TextField
            style={{ width: "100%", color: "primary" }}
            type="password"
            placeholder="Senha"
            variant="filled"
            size="medium"
            focused
            {...register("password")}
            color={isPasswordValid ? "success" : "warning"}
          />

          <Text
            style={{
              marginBottom: "1rem",
              marginTop: "2rem",
              fontSize: "1.2rem",
            }}
          >
            Comprador ou vendedor?
          </Text>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            onChange={(event) =>
              setRole(event.target.value as "buyer" | "seller")
            }
            style={{
              width: "100%",
            }}
          >
            <MenuItem value={"buyer"}>Comprador</MenuItem>
            <MenuItem value={"seller"}>Vendedor</MenuItem>
          </Select>

          <Text
            style={{
              marginBottom: "1rem",
              marginTop: "2rem",
              fontSize: "1.2rem",
            }}
          >
            A senha deve ter:
          </Text>
          <Text
            style={{
              marginBottom: "0",
              marginTop: "0.5rem",
              fontSize: "1rem",
              color: partialPasswordRegex.minLength ? "green" : "red",
            }}
          >
            - Ao menos 8 caracteres
          </Text>
          <Text
            style={{
              marginBottom: "0",
              marginTop: "0.5rem",
              fontSize: "1rem",
              color: partialPasswordRegex.hasUppercase ? "green" : "red",
            }}
          >
            - Ao menos 1 letra maiúscula
          </Text>
          <Text
            style={{
              marginBottom: "0",
              marginTop: "0.5rem",
              fontSize: "1rem",
              color:
                partialPasswordRegex.hasLowercase && password?.length >= 1
                  ? "green"
                  : "red",
            }}
          >
            - Ao menos 1 letra minúscula
          </Text>
          <Text
            style={{
              marginBottom: "0",
              marginTop: "0.5rem",
              fontSize: "1rem",
              color: partialPasswordRegex.hasSpecialCharacter ? "green" : "red",
            }}
          >
            - Ao menos 1 caractere especial
          </Text>
        </InputsContainer>

        <span
          style={{
            cursor:
              !isEmailValid || !isPasswordValid ? "not-allowed" : "pointer",
            width: "100%",
          }}
        >
          <Button
            style={{ width: "100%", marginTop: "2rem" }}
            variant="contained"
            color="primary"
            onClick={signUpForm.handleSubmit(onSubmitSignUpForm)}
            disabled={!isEmailValid || !isPasswordValid}
          >
            Registrar
          </Button>
        </span>

        <Link
          style={{ marginTop: "1.8rem" }}
          href="/auth/signin"
          underline="hover"
          color="primary.contrastText"
          fontStyle="italic"
          fontSize="1.2rem"
        >
          Já possui uma conta? Entre
        </Link>
      </SignUpForm>
    </SignUpContainer>
  );
};
