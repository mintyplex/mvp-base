import { FaFacebookF } from "react-icons/fa6";
import logoBlue from "~/public/lgo-blue.png";
import { Button } from "~/components/ui/button";
import { TypographyH4 } from "~/utils/typography";
import Image from "next/image";
import TwitterIcon from "~/components/ui/TwitterIcon";
import TelegramIcon from "~/components/ui/TelegramIcon";

export function Footer() {
  return (
    <div className="container p-3 mx-auto mt-auto">
      <footer className="relative bg-[#2C2D2E] rounded-lg overflow-hidden px-4 py-8">
        <div className="relative z-10 flex flex-col items-center space-y-12">
          <TypographyH4 className="text-center">
            Do you have a feedback or feature request? Feel free to share or
            connect with us on social media!
          </TypographyH4>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 border rounded-full transition-all duration-300 hover:bg-mintyplex-primary border-mintyplex-border/50">
                <TwitterIcon />
              </div>
              <div className="p-2 border rounded-full border-mintyplex-border/50 transition-all duration-300 hover:bg-mintyplex-primary">
                <FaFacebookF />
              </div>
              <div className="p-2 border rounded-full border-mintyplex-border/50 transition-all duration-300 hover:bg-mintyplex-primary">
                <TelegramIcon />
              </div>
            </div>
            <Button
              asChild
              className="py-4 text-white rounded-full duration-300 transition-all bg-mintyplex-primary"
            >
              <button className="py-5 bg-mintyplex-primary">
                Request A Feature
              </button>
            </Button>
            <div className="mt-5">
              Built With <span>💙</span> By{" "}
              <span className="text-mintyplex-primary">Mintyplex Inc.</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-6">
          <Image
            alt="Mintyplex logo"
            src={logoBlue}
            width={160}
            className="mx-auto"
          />
        </div>
        <div className="absolute top-0 rounded-full bg-[#2063F2]/40  [filter:blur(1500px)] w-full h-full" />
      </footer>
    </div>
  );
}
