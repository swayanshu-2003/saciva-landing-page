"use client";

import DynamicCounter from "@/components/Dynamiccounter";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FooterTwo } from "./../components/footer";
import axiosInstance from "@/utils/axios";

const Sacivap5js = dynamic(() => import("@/components/p5js/saciva"), {
  ssr: false,
});

const Page: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [userCount, setUserCount] = useState<number>(0);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // Prevent the mini-infobar from appearing
      setDeferredPrompt(e); // Save the event to trigger it later
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log("No install prompt available");
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("PWA installation accepted");
    } else {
      console.log("PWA installation declined");
    }

    setDeferredPrompt(null); // Clear the prompt after usage
  };

  const getUserCount = async () => {
    try {
      const c: any = await axiosInstance.get("/user-count");
      console.log(c);
      if (c?.status === 200) {
        setUserCount(c?.data?.count);
      }
    } catch (error: any) {}
  };
  useEffect(() => {
    getUserCount();
  }, []);

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center bg-[#f6f6f6] ${
          open ? "blur-md" : ""
        }`}
      >
        <div className="shadow-xl w-full">
          <header className="text-center mb-8">
            <div className="flex flex-col overflow-y-hidden items-center justify-center  overflow-x-hidden">
              <Sacivap5js />
            </div>
            <br></br>
            <p
              className="text-gray-700 sm:text-[18px] pb-10"
              style={{
                fontSize: "36px",
                fontWeight: 400,
                lineHeight: "43.2px",
                textAlign: "center",
              }}
            >
              For Students By Students
            </p>
            <DynamicCounter userCount={userCount} />
            <p
              className="pb-12"
              style={{
                fontSize: "36px",
                fontWeight: 400,
                lineHeight: "43.2px",
                textAlign: "center",
                color: "#4B5563",
              }}
            >
              The Only{" "}
              <span className="font-extralight text-purple-600">
                &lt;Package&gt;
              </span>{" "}
              you ever need till you graduate and beyond!
            </p>
            {/* <Link href="/auth/signup"> */}
            <button
              // onClick={onOpenModal}
              className="bg-purple-600 text-white rounded-full transition duration-300 hover:bg-purple-700"
              style={{
                fontSize: "24px",
                fontWeight: 600,
                lineHeight: "28.8px",
                textAlign: "center",
                padding: "10px 24px",
              }}
              onClick={() => {
                window.open("https://app.saciva.in");
              }}
              // disabled={!deferredPrompt}
            >
              Join the Network for Free
            </button>
            {/* <Modal
            open={open}
            onClose={onCloseModal}
            center
            styles={{
              overlay: {
                backgroundColor: "transparent",
              },
              modal: {
                backgroundColor: "transparent",
                boxShadow: "none",
                padding: "0",
              },
            }}
          >
            <SignUp />
          </Modal> */}
          </header>

          <p
            className="mb-0"
            style={{
              fontSize: "36px",
              fontWeight: 400,
              lineHeight: "43.2px",
              textAlign: "center",
              color: "#4B5563",
            }}
          >
            One platform to find roommates, housing, network and more
          </p>
          <p
            className="mb-10"
            style={{
              fontSize: "36px",
              fontWeight: 400,
              lineHeight: "43.2px",
              textAlign: "center",
              color: "#4B5563",
            }}
          >
            as an International Student in the USA.
          </p>
          <div className="px-8 flex flex-col items-center justify-center overflow-x-hidden ">
            {/* Feature cards */}
            <div
              id="features"
              className="flex flex-col md:flex-row justify-between gap-0 p-0 m-0 w-[1027px]"
            ></div>
          </div>

          <br></br>
          <p
            className="mb-8 px-10"
            style={{
              fontSize: "24px",
              fontWeight: 400,
              lineHeight: "28.8px",
              textAlign: "center",
              color: "#4B5563", // Gray color similar to text-gray-600 in Tailwind CSS
            }}
          >
            We are You. As international students, we know the exact challenges
            you face and we are building a personalized one-stop solution.
            Saciva has everything you need to succeed. Join us today and start
            your journey to success.
          </p>

          <div className="flex justify-center">
            <button
              className="text-blue-600 py-3 px-6 rounded-full font-semibold transition duration-300 mb-6 cursor-pointer"
              style={{
                fontSize: "18px", // Reduced font size
                fontWeight: 600,
                lineHeight: "22px", // Adjusted line height to match the new font size
                textAlign: "center",
              }}
              onClick={() => {
                window.open("https://app.saciva.in");
              }}
            >
              Join the Network for Free
            </button>
          </div>
          <div className="w-full p-3">
            <h1 className="text-4xl font-bold text-[#0C41CA] text-center my-2">
              Productivity, made a play! 2xl bold center aligned{" "}
            </h1>
            <p className="text-lg font-semibold text-[#8A59AE]">
              We&apos;ve done the hard work for you so that you can focus on the
              most important things you crossed the oceans for, “Academics and
              Career” Lg bold
            </p>
            <ul className="list-disc max-w-full mx-3">
              <li className="my-2">
                Designed to make you productive and reduce your screen time of
                the app.
              </li>
              <li className="my-2">
                Minimalistic and Progressive! Add our progressive web app to
                your home screen and you're all set to strike success as a
                student! base, medium
              </li>
              <li className="my-2">
                Avoid Wasting as much as 3 months or more of your precious time
                in finding a place to stay during your graduate degree or more
                for undergraduate degree.
              </li>
              <li className="list-disc max-w-full mx-3">
                <li className="my-2">
                  Our survey of hundreds of international students in the USA
                  shows that the average time taken to find off campus housing
                  was 19 days and the students stayed in a house for only 6.8
                  months on average. Wasting about 34 days a year, making it
                  more than 3 months of anxiety-inducing house hunting for a
                  student in a two year graduate degree with one year OPT. It’s
                  more for undergrad students. small, italic, normal
                </li>
              </li>
              <li className="my-2">
                Avoid paying hundreds of dollars in temporary accommodation by
                not finding a long term place to stay before landing in the
                USA. 
              </li>
              <li className="my-2">
                <li className="my-2">
                  According to our survey, a jaw dropping 65% of the
                  international students who were about to arrive shortly in the
                  USA didn’t have a long term accommodation to stay once they
                  landed and about 80% of the students already living here moved
                  out at least twice a year.
                </li>
              </li>
            </ul>
            <h1 className="text-[#4B0082] text-4xl font-bold mt-10 mb-3 text-center">
              Privacy, Prioritized!
            </h1>
            <p className="text-lg font-semibold text-[#8A59AE]">
              Complete control over your profile visibility status right from
              your dashboard.
            </p>
            <ul className="list-disc mx-3 max-w-full">
              <li className="my-2">No personal email or phone number. </li>
              <li className="my-2">In-app messaging and chat rooms. </li>
              <li className="my-2">
                Getting ghosted on WhatsApp and Facebook groups? No more. No
                inactive profiles or the ads posted by them in your feed.
              </li>
            </ul>
            <h1 className="text-[#FF2929] text-4xl font-bold mt-10 mb-4 text-center">
              Foreign, Friends & family!
            </h1>
            <p className="text-lg font-semibold text-[#8A59AE]">
              Find roommates with similar preferences that are like family, even
              if you go out of state or out of country!
            </p>
            <ul className="list-disc mx-3 max-w-full">
              <li className="my-2">
                No more homesickness, missing family friends and festivals.
              </li>
              <li className="my-2">
                Find students from your community to organize or join existing
                organizations to celebrate events and festivals.
              </li>
            </ul>
            <p className="text-lg font-semibold text-[#8A59AE] mt-10">
              It’s not you. It’s not them. 
            </p>
            <p className="text-lg font-semibold text-[#8A59AE]">
              It’s just the preferences!
            </p>
            <p className="text-lg font-semibold text-black">
              Know the people well before signing a long term lease and moving
              in to avoid traumatizing experiences out of unmatched food,
              smoking and drinking habits or socializing preferences.  
            </p>
            <ul className="list-disc max-w-full mx-3">
              <li className="my-2">
                No more fear or stress of overwhelming uncertainty of not
                knowing the person before becoming roommates with them and no
                more conflicts later, due to unmatched preferences.
              </li>
              <li className="my-2">
                With Saciva, Avoid the mental stress of having to deal with
                roommates with clashing preferences, moving out of the house in
                the middle of your busy semester and finding a replacement for
                you. 
              </li>
              <li className="my-2">
                <li className="my-2">
                  Our survey shows that About 64% of them felt finding roommates
                  difficult as a majority of the students wanted to share their
                  room exclusively with those who shared similar preferences
                  such as food, country, smoking, drinking and more.
                </li>
              </li>
              <li className="my-2">Find your foreign friends on Saciva.</li>
            </ul>
            <p className="font-bold mt-10">Innovation of features</p>
            <p className="font-bold mb-5">Experience magic, engineered!</p>
            <p className="font-bold ">Design : </p>
            <p>
              A complete new design yet absolutely Intuitive interface with
              convenient student tailored features that are like easter eggs,
              such as one tap filters, matching score for profiles, distances
              from the houses to your university and more.
            </p>
            <p className="font-bold mt-5">Development :</p>
            <p>
              Progressive web app, for the progressive you. iOS or android,
              Saciva is there. Client side rendering with a local database to
              give an offline app experience without having to download an app
              consuming tons of storage on your phone. 
            </p>
            <p className="font-bold mt-10">
              Machine Learning:  ML model to Cluster universities based on
              geographic location to suggest only relevant profiles 
            </p>
            <p className="font-bold mt-2">The Problem with Regular Filters</p>
            <p className="font-bold mt-2">1.University-Based Filtering:</p>
            <ul className="list-disc mx-6 max-w-full">
              <li className="my-2">
                Limits networking to the same university.
              </li>
              <li className="my-2">
                Expanding to other universities requires tedious manual research
                and filter selection.
              </li>
            </ul>
            <p className="font-bold ">2.City-Based Filtering:</p>
            <ul className="list-disc mx-6 max-w-full">
              <li className="my-2">
                Overlooks students commuting between cities, suburbs, and nearby
                areas.
              </li>
              <li className="my-2">
                Restricts the scope of networking based on rigid city
                boundaries.
              </li>
            </ul>
            <p className="font-bold mt-10 mb-4">Our Solution</p>
            <p className="font-bold ">
              We created clusters of relevant universities for students using
              Machine Learning (ML), eliminating the need for manual filtering.
              This simplifies networking, finding roommates, or housing by
              showcasing profiles from the most relevant institutions
              automatically without toggling through a ton of permutations and
              combinations of filters.
            </p>
            <h1 className="text-2xl font-bold mt-10 mb-3">AI AI AI</h1>
            <p>
              AI is coming to Saciva soon. Ask Saciva anything related to your
              student journey ranging from visa process to university details to
              places to visit in the city to the weather. 
            </p>
          </div>
          <div
            id="testimonials"
            style={{ background: "#0A0A0A" }}
            className="text-white p-8 w-full text-center mt-10 relative"
          >
            <p
              className="mb-6"
              style={{
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "28.8px",
                textAlign: "center",
              }}
            >
              We are You. We are international students. Visit our blog to know
              more about how our journey with Saciva started. At Saciva, we
              believe in the power of community, we appreciate your Feedback and
              Suggestions
            </p>
            <div
              className="text-[#FF2929] font-semibold"
              style={{
                fontSize: "16px", // Smaller font size
                fontWeight: 600,
                lineHeight: "19.2px", // Adjusted line height to match the smaller font size
                textAlign: "center",
              }}
            >
              Our Story
            </div>
            <br></br>
            <br></br>

            <p
              className="mb-6"
              style={{
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "28.8px",
                textAlign: "center",
              }}
            >
              While we are offering the platform for free for now, it costs us
              our money, time, and effort to keep this running. We highly
              appreciate your generous support to make this platform more robust
              and featuresome!
            </p>
            <button className="bg-[#FF2929] text-white py-3 px-6 rounded-full font-semibold transition duration-300">
              support us
            </button>
            <br></br>
            <br></br>
            <br></br>
            <p
              className="mb-6"
              style={{
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "28.8px",
                textAlign: "center",
              }}
            >
              You can also support us through spreading a word about Saciva,
              amongst your friends, neighbors, colleagues,  classmates and
              roommates or anyone who is a student, especially international
              students. Thanks :)
            </p>
            <div
              className="text-[#FF2929] font-semibold"
              style={{
                fontSize: "16px", // Smaller font size
                fontWeight: 600,
                lineHeight: "19.2px", // Adjusted line height to match the smaller font size
                textAlign: "center",
              }}
            >
              ^ Share With Friends ^
            </div>
          </div>
          <FooterTwo />
        </div>
      </div>
    </>
  );
};

export default Page;
