import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.aboutWrapper}>
      <aside className={styles.textAside}>
        <h1>ABOUT</h1>
        <p>I'm Ashley Perl, a freelance journalist based in Stockholm.</p>
        <p>
          I love a good story – and the challenge of taking a concept and
          crafting it into something that connects to people.
        </p>
        <p>
          I mostly cover stories about energy, climate and science. But I also
          write about other topics that spark my interest.
        </p>
        <p>
          If you would like to talk about working together, please write me. I
          would be <Link href="/contact">happy to chat</Link>.
        </p>
        <p>
          A little bit more about me: I was a fellow in the Dalla Lana
          Fellowship in Journalism and Health Impact at the University of
          Toronto (2023-2024).
        </p>
        <p className={styles.listHeading}>I also have a:</p>
        <ul>
          <li>
            Master of science in sustainability, Stockholm University
            (2012-2015)
          </li>
          <li>
            Hounors bachelor of arts in psychology, Western University in
            London, Ont. (2007-2012)
          </li>
        </ul>
      </aside>
      <figure className={styles.figureSection}>
        <Image
          src="/Scenic.jpg"
          alt="a scenic austian village and lake"
          width={800}
          height={600}
          priority
        />
      </figure>
    </div>
  );
}
