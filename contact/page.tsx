"use client";

import React from "react";
import { Chatbox } from "@/components/Chatbox";
import ProfileButton from "@/components/ProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faTwitter,
  faGoogle,
  faLinkedin,
  faYoutube,
  faInstagram,
  faPinterest,
  faSnapchatGhost,
  faSkype,
  faDribbble,
  faVimeo,
  faTumblr,
  faVine,
  faFoursquare,
  faStumbleupon,
  faFlickr,
  faYahoo,
  faReddit,
  faTelegram,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";

library.add(
  faFacebook,
  faTwitter,
  faGoogle,
  faLinkedin,
  faYoutube,
  faInstagram,
  faPinterest,
  faSnapchatGhost,
  faSkype,
  faDribbble,
  faVimeo,
  faTumblr,
  faVine,
  faFoursquare,
  faStumbleupon,
  faFlickr,
  faYahoo,
  faReddit,
  faTelegram,
  faDiscord,
  faGithub,
  faRss
);

const contactIcons: { icon: IconProp; link: string }[] = [
  { icon: ["fab", "facebook"], link: "https://facebook.com/yourprofile" },
  { icon: ["fab", "twitter"], link: "https://twitter.com/yourprofile" },
  { icon: ["fab", "google"], link: "mailto:jamesrolan1116@gmail.com" },
  { icon: ["fab", "linkedin"], link: "https://linkedin.com/in/yourprofile" },
  { icon: ["fab", "instagram"], link: "https://instagram.com/yourprofile" },
  { icon: ["fab", "skype"], link: "https://join.skype.com/invite/yourprofile" },
  { icon: ["fab", "telegram"], link: "https://t.me/yourprofile" },
  { icon: ["fab", "discord"], link: "https://discordapp.com/users/yourprofile" },
  { icon: ["fab", "reddit"], link: "https://reddit.com/u/yourprofile" },
  { icon: ["fab", "github"], link: "https://github.com/yourprofile" },
];

const footerIcons: { icon: IconProp; link: string }[] = [
  { icon: ["fab", "youtube"], link: "https://www.youtube.com" },
  { icon: ["fab", "pinterest"], link: "https://www.pinterest.com" },
  { icon: ["fab", "snapchat-ghost"], link: "https://www.snapchat.com" },
  { icon: ["fab", "dribbble"], link: "https://dribbble.com" },
  { icon: ["fab", "vimeo"], link: "https://vimeo.com" },
  { icon: ["fab", "tumblr"], link: "https://www.tumblr.com" },
  { icon: ["fab", "vine"], link: "https://vine.co" },
  { icon: ["fab", "foursquare"], link: "https://foursquare.com" },
  { icon: ["fab", "stumbleupon"], link: "https://mix.com" },
  { icon: ["fab", "flickr"], link: "https://www.flickr.com" },
  { icon: ["fab", "yahoo"], link: "https://www.yahoo.com" },
  { icon: ["fas", "rss"], link: "https://yourdomain.com/rss" },
];

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <ProfileButton />
      <Chatbox />

      {/* Neon Connect Box */}
      <div className="mt-12 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900 neon text-center">
        <h3 className="text-3xl font-bold mb-4 text-lime-400">Lets Connect</h3>
        <p className="text-gray-300 mb-6">
          Reach out to me on any of these platforms.
        </p>
        <div className="flex justify-center flex-wrap gap-6 text-3xl text-lime-400">
          {contactIcons.map(({ icon, link }, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110 hover:text-lime-300"
            >
              <FontAwesomeIcon icon={icon} />
            </a>
          ))}
        </div>
      </div>

      {/* Follow Me Section */}
      <section className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900 neon">
        <h2 className="text-2xl font-semibold text-lime-400 mb-4 text-center">Follow Me</h2>
        <div className="flex flex-wrap gap-4 justify-center items-center text-3xl text-lime-400">
          {contactIcons.map(({ icon, link }, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-300 hover:scale-110 transition"
            >
              <FontAwesomeIcon icon={icon} />
            </a>
          ))}
        </div>
      </section>

      {/* Other Networks Section */}
      <section className="pt-10 border-t border-gray-300">
        <h2 className="text-lg font-medium text-center mb-4 text-lime-300">Other Networks</h2>
        <div className="flex flex-wrap gap-4 justify-center items-center text-2xl text-gray-400">
          {footerIcons.map(({ icon, link }, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-300 hover:scale-110 transition"
            >
              <FontAwesomeIcon icon={icon} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
