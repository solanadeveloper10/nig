import React from "react";
import {
  Box,
  Container,
  Typography,
  styled,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import { useInView } from "react-intersection-observer";

interface SectionProps {
  title: string;
  icon?: string;
  index: number;
  href?: string;
}

const FullSection = styled(Box)({
  height: "50vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#ffffff",
  justifyContent: "start",
  overflow: "hidden",
});

const ContentWrapper = styled("a")<{ inview: number; index: number }>(
  ({ inview, index }) => ({
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: inview
      ? "translate(0, 0)"
      : index === 5
      ? `translate(0, 200%)`
      : `translate(${index % 2 === 0 ? "-50%" : "50%"}, 50%) `,
    opacity: inview ? 1 : 0,
    willChange: "transform, opacity",
    "&:hover": {
      "& img": {
        transform: "scale(1.1)",
      },
      "& h4": {
        color: "#000000",
      },
    },
  })
);

const Section: React.FC<SectionProps> = ({ title, icon, index, href }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
    rootMargin: "50px",
  });

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Container sx={{ backgroundColor: "#fff", overflow: "hidden" }}>
      <FullSection
        sx={{
          justifyContent:
            index >= 4 ? "center" : index % 2 === 0 ? "start" : "end",
        }}
      >
        <ContentWrapper
          ref={ref}
          inview={inView ? 1 : 0}
          href={href}
          target='_blank'
          index={index}
          onClick={(e) => {
            if (index === 5) {
              window.navigator.clipboard.writeText("contract address");
              const target = e.currentTarget;
              target.style.transform = "scale(0.6)";
              target.style.transition = "transform 0.3s ease-in";

              setTimeout(() => {
                target.style.transform = "scale(1.25)";
                target.style.transition = "transform 0.3s ease-out";

                setTimeout(() => {
                  target.style.transform = "scale(1)";
                  target.style.transition = "transform 0.3s ease-out";
                }, 300);
              }, 300);
            }
          }}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            gap={3}
            flexDirection={index % 2 === 1 ? "row-reverse" : "initial"}
          >
            {icon && (
              <img
                src={icon}
                alt={title}
                style={{
                  height: isMobile ? "200px" : "300px",
                  objectFit: "contain",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            )}
            <Typography
              variant='h1'
              sx={{
                fontWeight: 900,
                "-webkit-text-stroke": "3px #473732",
                color: "#473732",
                transition: "color 0.3s ease-in-out",
                fontSize: isMobile ? "1.8rem" : "3rem",
              }}
            >
              {title}
            </Typography>
          </Box>
        </ContentWrapper>
      </FullSection>
    </Container>
  );
};

const sections = [
  {
    title: "Dexscreener",
    icon: "/3.png",
    href: "https://dexscreener.com/solana/0x0000000000000000000000000000000000000000",
  },
  {
    title: "Dextools",
    icon: "/1.png",
    href: "https://www.dextools.io/app/solana/pair-explorer/0x0000000000000000000000000000000000000000",
  },
  { title: "Telegram", icon: "/2.png", href: "https://t.me/justanig" },
  { title: "Twitter", icon: "/5.png", href: "https://x.com/justanig" },
  { title: "Buy Now", icon: "/4.png", href: "https://x.com/justanig" },
  { title: "CA: Contract" },
];

const Banner: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Box>
      <Box
        height='100vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{ backgroundColor: "#fff" }}
      >
        <video
          src='/v1.mp4'
          height={isMobile ? 350 : 500}
          autoPlay
          loop
          muted
        />
      </Box>
      {sections.map((section, index) => (
        <Section
          key={section.title}
          title={section.title}
          icon={section.icon}
          index={index}
          href={section.href}
        />
      ))}
    </Box>
  );
};

export default Banner;
