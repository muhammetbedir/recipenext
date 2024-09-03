import Link from "next/link";
import { Box, Button, Typography, Container } from "@mui/material";
import { pages } from "@/constants/pages";
import { actions } from "@/constants/aclConstants";

const NotFound = () => {
  return (
    <Container
      maxWidth="md"
      className="flex flex-col items-center justify-center min-h-screen text-center"
    >
      <Box>
        <img
          src="/image/notfound.gif"
          alt="Yemek Resmi"
          className="object-contain max-h-72 mix-blend-darken h-full w-full rounded-l"
        />
        <Typography variant="h4" className="text-2xl mb-4">
          Sayfa Bulunamadı
        </Typography>
        <Typography variant="body1" className="mb-8">
          Üzgünüz, aradığınız sayfa bulunamadı. Ana sayfaya dönmek için
          aşağıdaki butona tıklayabilirsiniz.
        </Typography>
        <Link href="/" passHref>
          <Button
            variant="contained"
            className="mt-4 bg-buttonBg hover:bg-buttonHoverBg"
          >
            Ana Sayfaya Dön
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

NotFound.getLayout = (page) => <>{page}</>;
NotFound.acl = {
  action: actions.read,
  subject: pages.homePage,
};
export default NotFound;
