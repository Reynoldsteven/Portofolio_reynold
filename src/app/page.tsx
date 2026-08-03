import { Hero }         from "@/components/sections/Hero";
import { About }        from "@/components/sections/About";
import { Skills }       from "@/components/sections/Skills";
import { Projects }     from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { TechStack }    from "@/components/sections/TechStack";
import { GitHubStats }  from "@/components/sections/GitHubStats";
import { Footer }       from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      {/*
        Aurora section — wraps About → Footer.
        .aurora-bg applies the animated purple/blue blob aurora via CSS.
        .aurora-blob-mid is the middle third blob (can't use :nth pseudo for 3 blobs).
      */}
      <div className="aurora-bg relative overflow-hidden">
        {/* Middle aurora blob (CSS ::before and ::after handle the other two) */}
        <div className="aurora-blob-mid" aria-hidden="true" />

        <About />
        <Skills />
        <Projects />
        <Certificates />
        <TechStack />
        <GitHubStats />
        <Footer />
      </div>
    </>
  );
}
