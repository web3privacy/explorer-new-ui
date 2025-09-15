import { NextPage } from "next";
import Image from "next/image";

const AboutPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <Image src="/about_title.png" alt="About" width={300} height={100} />
    </div>
  );
};

export default AboutPage;
