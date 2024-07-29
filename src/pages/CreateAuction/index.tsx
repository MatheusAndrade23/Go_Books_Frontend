/* eslint-disable @next/next/no-img-element */
import { CreateAuctionContainer, ImageContainer, Form } from "./styles";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Text } from "@/components/Text";

import { useState } from "react";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { Container, TextField, Select, MenuItem, Button } from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const createAuctionFormSchema = zod.object({
  bookName: zod.string(),
  bookDescription: zod.string(),
});

export type createAuctionData = zod.infer<typeof createAuctionFormSchema>;

export const CreateAuctionPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bookGenre, setBookGenre] = useState<string>("mistério");
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>(
    "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
  );

  const signUpForm = useForm<createAuctionData>({
    resolver: zodResolver(createAuctionFormSchema),
    defaultValues: {
      bookName: "",
      bookDescription: "",
    },
  });

  const { register, handleSubmit, watch } = useForm();

  const bookName = watch("bookName");
  const bookDescription = watch("bookDescription");

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img);
      setFile(img);
      setImage(URL.createObjectURL(img));
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (!file) {
        return toast.error("Selecione uma imagem para o livro");
      }
      formData.append("file", file);

      const response = await api.post("/attachments", formData);

      await api.post("/auctions", {
        bookName,
        description: bookDescription,
        bookGenre,
        bookImageUrl:
          "https://pub-832677944b1a42dbb7ba6927d2fcc74a.r2.dev/" +
          response.data.attachmentUrl,
      });
      window.location.href = "/";
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoading(false);
        return toast.error(error.response?.data.message);
      }
      setLoading(false);
      toast.error("Erro ao fazer login!");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <CreateAuctionContainer>
          <Form>
            <h3>Criar Leilão</h3>

            <Text style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
              Nome do livro:
            </Text>
            <TextField
              style={{
                color: "primary",
                width: "300px",
                marginBottom: "2rem",
              }}
              size="medium"
              placeholder="Nome do livro"
              variant="filled"
              focused
              color={bookName?.length > 0 ? "success" : "warning"}
              {...register("bookName")}
            />
            <Text
              style={{
                marginBottom: "1rem",
                fontSize: "1.2rem",
              }}
            >
              Gênero do livro:
            </Text>
            <Select
              style={{ width: "300px", marginBottom: "2rem" }}
              value={bookGenre}
              onChange={(e) => setBookGenre(e.target.value)}
            >
              <MenuItem value="ficção">Ficção</MenuItem>
              <MenuItem value="fantasia">Fantasia</MenuItem>
              <MenuItem value="mistério">Mistério</MenuItem>
              <MenuItem value="terror">Aventura</MenuItem>
              <MenuItem value="biografia">Biografia</MenuItem>
              <MenuItem value="história">História</MenuItem>
            </Select>
            <Text style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
              Descrição do livro:
            </Text>
            <TextField
              style={{
                color: "primary",
                width: "300px",
                marginBottom: "2rem",
              }}
              size="medium"
              placeholder="Descrição do livro"
              variant="filled"
              focused
              {...register("bookDescription")}
              color={bookDescription?.length > 10 ? "success" : "warning"}
            />
            <Text style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
              Selecione a imagem do livro:
            </Text>
            <input type="file" name="myImage" onChange={onImageChange} />
            <span
              style={{
                cursor:
                  bookName?.length < 1 || bookDescription?.length <= 10
                    ? "not-allowed"
                    : "pointer",
                width: "100%",
              }}
            >
              <Button
                onClick={onSubmit}
                style={{
                  marginTop: "2rem",
                  width: "300px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
                disabled={bookName?.length < 1 || bookDescription?.length <= 10}
              >
                Criar Leilão
              </Button>
            </span>
          </Form>

          <ImageContainer>
            <img src={image} alt="book" style={{ width: "300px" }} />
          </ImageContainer>
        </CreateAuctionContainer>
      </Container>
      <Footer />
    </>
  );
};
