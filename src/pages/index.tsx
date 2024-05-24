import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Bot Application", value: "3" },
  { label: "HoYoLAB Posts", value: "52" },
  { label: "Edits on Wiki Fandom", value: "17" },
];

const projects = [
  {
    title: "Genshin Impact SEA",
    iconSrc: "/assets/icon/sea.png",
    imageSrc: "/assets/skills/SEA.jpeg",
    link: "https://discord.gg/genshinimpactsea",
    description: "Step into vast magical world for adventure, Welcome to the Official Gesnhin Impact SEA (Southeast Asia) Community Server."
  },
  {
    title: "HoYoLAB",
    iconSrc: "/assets/icon/hyl.png",
    description: "HoYoLAB is a community forum, featuring official information on our popular games, a variety of fan art, useful tools, exclusive perks, player anecdotes, and more.",
    imageSrc: "/assets/skills/hoyolab.jpeg",
    link: "https://www.hoyolab.com/accountCenter/postList?id=107593323"
  },
  {
    title: "Lab ID Corner",
    iconSrc: "/assets/icon/labidc.png",
    description: "This server is a Community (Unofficial) server developed by HoYoLAB Indonesia users.",
    imageSrc: "/assets/skills/LAB ID Corner.png",
    link: "https://discord.gg/e9GBZhad3Z"
  },
  {
    title: "GI Wiki Fandom",
    iconSrc: "/assets/icon/wfndm.png",
    description: "Step into vast magical world for adventure, Welcome to the Genshin Impact Wiki Fandom!",
    imageSrc: "/assets/skills/Wiki.png",
    link: "https://genshin-impact.fandom.com/wiki/User:SunaOwO"
  }
];

const services = [
  {
    service: "Hoyoverse Account Recovery Documentation",
    image: "/assets/info/gidoc.jpg",
    link: "https://docs.google.com/spreadsheets/d/14gZnmbMqXD3PFzL9z_4utJoyhgkCpTyx7Nd4p1m2Rn4/edit?usp=sharing",
    description:
      "This documentation is used to guide users who has lost access to their HoYoverse Account that connects to the HoYoverse game service.",
    icon: Code2,
  },
  {
    service: "Genshin Impact · Cloud",
    image: "/assets/info/cloud.jpg",
    link: "https://cloudgenshin.hoyoverse.com/en-us",
    description:
      "Genshin Impact · Cloud is a cloud version of HoYoverse's Genshin Impact.",
    icon: Frame,
  },
  {
    service: "Device Performance Requirements",
    image: "/assets/info/notice.png",
    link: "https://genshin.hoyoverse.com/en/news/detail/123614",
    description:
      "In the future Version 5.0 of Genshin Impact, the developers will be upgrading the overall visuals and functions of the game.",
    icon: SearchCheck,
  },
  {
    service: "Regarding Account Security",
    image: "/assets/info/account.png",
    link: "https://genshin.hoyoverse.com/en/news/detail/103770",
    description:
      "Regarding issues of account security, including account theft.",
    icon: MonitorSmartphone,
  },
  {
    service: "Version 4.6 Update Details",
    image: "/assets/info/version.png",
    link: "https://www.hoyolab.com/article/27598031",
    description:
      "Below are the details of the Version 4.6 update Two Worlds Aflame, the Crimson Night Fades and the update compensation.",
    icon: Eye,
  },
];

const contact = [
  {
    title: "Mimo",
    images: "assets/projects/banner.gif",
    badges: [
      {"image": "assets/projects/badge3.png", "tooltip": "Support Commands"},
      {"image": "assets/projects/badges.png", "tooltip": "Uses AutoMod"}  
    ],    
    logo: "assets/projects/logo.png",
    description: "Mimo#1234",
    aboutMe: "Playing with LAB ID Server!",
    memberSince: "Sep 10, 2023",
    roles: [
      {"name": "BOTS", "color": "lightyellow"},
      {"name": "Mimo", "color": "darkred"}
    ]
  }
];





export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };
  const handleMessageSend = async () => {
    try {
      if (!message.trim()) {
        // Jika message kosong atau hanya terdiri dari spasi
        const emptyMessageStatus = document.getElementById("empty-message-status");
        if (emptyMessageStatus) {
          emptyMessageStatus.style.display = "block";
          setTimeout(() => {
            emptyMessageStatus.style.display = "none";
          }, 3000);
        }
        return; // Menghentikan fungsi handleMessageSend
      }
  
      const response = await axios.post('/api/send-message', { name, message });
  
      // Show message status
      const messageStatus = document.getElementById("message-status");
      if (messageStatus) {
        messageStatus.style.display = "block";
  
        // Hide message status after 3 seconds
        setTimeout(() => {
          messageStatus.style.display = "none";
        }, 3000);
      }
  
      setName("");
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const handleInfoClose = (e: React.MouseEvent<HTMLElement>) => {
    // Cek apakah kotak info sedang ditampilkan dan klik dilakukan di luar kotak info
    if (showInfo && !(e.target as HTMLElement).closest(`.${styles["info-box"]}`)) {
      setShowInfo(false); // Tutup kotak info
    }
  };
  
  
  
  

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>Bot Assistant</span>
              <span className={styles.pill}>HoYoLAB CC</span>
              <span className={styles.pill}>Wiki Fandom</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Zetsuna.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                Bot App Developer for Discord and Guide Content Creator for Genshin Impact.
              </p>
            </div>
            <span
            data-scroll
            data-scroll-enable-touch-speed
            data-scroll-speed=".06"
            className="flex flex-row items-center space-x-1.5 pt-6"
          >
            <a href="https://discordapp.com/users/948093919835590666" target="_blank" rel="noopener noreferrer">
              <Button className="flex items-center">
                <img src="/assets/discord.png" alt="Discord" className="h-4 w-4 mr-1" />
                <span>Contact Me</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
                styles["icon-scroll"] // Tambahkan class icon-scroll
              )}
            >
              
              <div className={styles["icon-scroll-inner"]} /> {/* Tambahkan inner div */}
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <video
                src="/assets/raiden.mp4"
                autoPlay
                loop
                muted
              />
            </Suspense>
            
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              I&apos;m a Content Creator for Genshin Impact and other Hoyoverse Games. 
              
              I am most active on HoYoLAB, and I also often develop bot applications on Discord and do not forget to editing data on Genshin Impact Fandom Wiki platform. 
              If you want to contact me personally, you can do so on Discord.
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* projects */}
        <section id="projects" data-scroll-section>
        <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className={styles.container}
          >
            
          <div className={styles.titleWrapper}>
            <h2 className={styles.title }>Find me at.</h2>
            <p className={"mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg"}>
              Find me on various platforms such as, HoYoLAB, Discord, and the Genshin Impact Wiki Fandom Website or as below:
            </p>
          </div>
          <div className={styles.content}>
            {projects.map((project, id) => (
              <div key={id} className={styles.skill}>
                <a
                  href={project.link}
                  className={styles.skillLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.skillItem}>
                    <div className={styles.skillImageContainer}>
                      <Image
                        src={project.imageSrc}
                        alt={project.title}
                        className={styles.skillImage}
                        width={3000}
                        height={3000}
                      />
                    </div>
                    <div className={styles.footer}>
                      <Image
                        src={project.iconSrc}
                        alt={project.title}
                        className={styles.icon}
                        width={3000}
                        height={3000}
                      />
                      <div className={styles.info}>
                        <div className={styles.name}>{project.title}</div>
                        <div className={styles.desc}>{project.description}</div>
                      </div>
                      <div className={styles.more}>
                        <div className={styles.button}>More</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
            </div>
          </div>
        </section>
        
        {/* Services */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className={styles.containers} // Gunakan class dari file CSS terpisah
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className={styles.grid} // Gunakan class dari file CSS terpisah
            >
              <div>
                <h2 className={styles.title}>
                  Recommended Information Board.
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    On Genshin Impact
                  </span>
                </h2>
                <p className={styles.description}>
                  Here are some selected posts or documentation relevant to Genshin Impact.
                </p>
              </div>
              {services.map((service) => (
                <a href={service.link} target="_blank" rel="noopener noreferrer" key={service.service} className={styles.serviceLink}>
                  <div
                    className={styles.serviceItem}
                    style={{ backgroundImage: `url(${service.image})` }} // Tambahkan style untuk gambar latar belakang
                  >
                    <span className={styles.serviceTitle}>{service.service}</span>
                    <span className={styles.serviceDescription}>{service.description}</span>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <div>
              <h2 className={styles.title}>
                Send me a message
                <br />
                <span className="text-gradient clash-grotesk tracking-normal">
                  Mimo Bot
                </span>
              </h2>
              <p className={styles.description}>
                Write your interesting message for me as Mimo.
              </p>
            </div>

            {contact.map((contact, index) => (
              <div key={index} className={`${styles.containera} ${styles.card} nitro-card`}>
                <div className={styles["card-header"]}>
                  <div
                    className={`${styles["banner-img"]} banner`}
                    style={{ backgroundImage: `url(${contact.images})` }}
                  ></div>
                </div>
                <div className={styles["card-body"]}>
                  <div className={styles["profile-header"]}>
                    <div className={styles["profil-logo"]}>
                      <img src={contact.logo} alt={`Image of ${contact.title}`} />
                    </div>
                    <div className={styles["badges-container"]}>
                      {contact.badges.map((badge, index) => (
                        <div key={index} className={styles["badge-item"]}>
                          <img src={badge.image} alt={badge.tooltip} />
                          <div className={`${styles.tooltip} tooltip tooltip-up`}>{badge.tooltip}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles["profile-body"]}>
                    <div className={styles.username}>
                      <a>{contact.title}</a>
                    </div>
                    <p className={styles["small-text"]} style={{ color: "white" }}>
                      {contact.description} <span className={styles["bot-badge"]}>APP</span>
                    </p>
                    <br />
                    <hr />
                    <div className={`${styles["basic-infos"]} ${styles["about-me"]}`}>
                      <div className={styles["category-title"]}>ABOUT ME</div>
                      <p className={styles["about-text"]}
                      dangerouslySetInnerHTML={{ __html: contact.aboutMe }}>
                      </p>
                    </div>
                    <div className={styles["basic-infos"]}>
                      <div className={styles["category-title"]}>Member Since</div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                      <img src="https://i.ibb.co/HpbSK8B/icons8-discord-16.png" style={{ marginRight: "10px" }} alt="Discord Icon" />
                        <p style={{ margin: "0" }}>{contact.memberSince}</p>
                      </div>
                    </div>
                    <div className={styles.roles}>
                      <div className={styles["category-title"]}>Roles</div>
                      <div className={styles["roles-list"]}>
                        {contact.roles.map((role, index) => (
                          <div key={index} className={styles.role}>
                            <div className={styles["role-color"]} style={{ background: role.color }}></div>
                            <p>{role.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles["show-info"]} onClick={handleShowInfo}>
                      <div className="flex h-6 w-6 items-center justify-center text-xs">?</div>
                    </div>
                    {showInfo && (
                      <div className={styles["info-container"]} onClick={handleInfoClose}>
                        <div className={styles["info-box"]}>
                          <p>Please enter your name and message you want to send, then Mimo bot on Discord will send the message to me.</p>
                        </div>
                      </div>
                    )}

                    <div className="message">
                      <input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        className={styles["input-message"]}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <input
                        id="content"
                        type="text"
                        placeholder="Send me a message as Mimo"
                        className={styles["input-message"]}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button className={styles["send-button"]} onClick={handleMessageSend}>
                        Send
                      </button>
                    </div>
                    <div id="message-status" className={styles["message-status"]} style={{ display: "none" }}>
                      <b>Delivered</b>
                    </div>
                    <div id="empty-message-status" className={styles["message-status"]} style={{ display: "none", backgroundColor: "red" }}>
                      <b>Message cannot be empty</b>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
