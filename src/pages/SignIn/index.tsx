"use client";

import { SignInContainer } from "./styles";

import { Text } from "@/components/Text";
import { SignInForm, InputsContainer } from "./styles";

import { useState } from "react";

import { useAuth } from "@/hooks/Auth";

import { TextField, Button, Link, Select, MenuItem } from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import regex from "@/regex";
import { getInputsValidation } from "@/utils/getInputsValidation";

const signInFormSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
});

export type signInData = zod.infer<typeof signInFormSchema>;

export const SignInPage = () => {
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const { register, handleSubmit, watch } = useForm();

  const signInForm = useForm<signInData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const { user, login } = useAuth();

  if (user.isAuthenticated) {
    window.location.href = "/";
  }

  const email = watch("email");
  const password = watch("password");

  const { isEmailValid, isPasswordValid } = getInputsValidation(
    email,
    password
  );

  const onSubmitSignInForm = (data: any) => {
    login(email, password, role);
  };

  return (
    <SignInContainer>
      <SignInForm onSubmit={handleSubmit(onSubmitSignInForm)}>
        <Text style={{ fontWeight: "bold", fontSize: "2.2rem" }}>Entrar</Text>
        <InputsContainer>
          <Text style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
            {"Digite seu email:"}
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
            onClick={signInForm.handleSubmit(onSubmitSignInForm)}
            disabled={!isEmailValid || !isPasswordValid}
          >
            Entrar
          </Button>
        </span>

        <Link
          style={{ marginTop: "1.8rem" }}
          href="/auth/signup"
          underline="hover"
          color="primary.contrastText"
          fontStyle="italic"
          fontSize="1.2rem"
        >
          Ainda não possui uma conta? Cadastre-se
        </Link>
      </SignInForm>
    </SignInContainer>
  );
};
