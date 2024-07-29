"use client";

import { HeaderContainer, LinksContainer } from "./styles";
import { Text } from "@/components/Text";
import { Link } from "@/components/Link";

import { useAuth } from "@/hooks/Auth";

import { Container, TextField } from "@mui/material";

export const Header = () => {
  const { user } = useAuth();

  return (
    <>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <HeaderContainer>
          <Link
            href="/"
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Go Books
          </Link>

          {/* <TextField
            id="search"
            type="search"
            placeholder="Pesquise pelo nome do livro"
            variant="outlined"
            style={{
              width: "30%",
              alignSelf: "center",
            }}
          /> */}
          {user.role === "buyer" && (
            <Link
              href="/buyer/bids"
              style={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Meus Lances
            </Link>
          )}
          {user.role === "seller" && (
            <div>
              <Link
                href="/"
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginRight: "1rem",
                }}
              >
                Meus Leilões
              </Link>
              <Link
                href="/create/auction"
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Criar novo Leilão
              </Link>
            </div>
          )}
        </HeaderContainer>
        {user.role === "buyer" && (
          <LinksContainer>
            <Link href="/genre/ficção">Ficção</Link>
            <Link href="/genre/fantasia">Fantasia</Link>
            <Link href="/genre/mistério">Mistério</Link>
            <Link href="/genre/terror">Terror</Link>
            <Link href="/genre/aventura">Aventura</Link>
            <Link href="/genre/biografia">Biografia</Link>
            <Link href="/genre/historia">História</Link>
          </LinksContainer>
        )}
      </Container>
    </>
  );
};
